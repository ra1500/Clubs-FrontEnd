import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../context/auth";

function Signup(props) {
  const referer = "/welcome";
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [ setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");
  const { setAuthTokens } = useAuth();

  function postSignup() {
    if (password !== verifyPassword) { setVerifyMessage("Password fields did not match.");}
    else if (userName.length < 4) { setVerifyMessage("username should be at least 4 characters long.");}
    else if (password.length < 4) { setVerifyMessage("password should be at least 4 characters long");}
    else {
    axios.post("http://localhost:8080/api/user/signup", {
      userName,
      password
    }).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setLoggedIn(true);
      }
      else if (result.status === 204){
        { setVerifyMessage("Sorry, username already used. Please choose another.");}
      }
      else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
    }
  }

  if (isLoggedIn) {
    props.toggleLogin();
    return <Redirect to={referer} />;
  }

  return (
    <React.Fragment>
      <div id="signupDiv">
            <p id="easyP"> Easy sign up: </p>
            <input class="signupBox" maxlength="100" type="username" value={userName} onChange={e => {setUserName(e.target.value);}}placeholder="username" />
            <input class="signupBox" maxlength="100" type="password" value={password} onChange={e => {setPassword(e.target.value);}}placeholder="password" />
            <input class="signupBox" maxlength="100" type="password" value={verifyPassword} onChange={e => {setVerifyPassword(e.target.value);}}placeholder="password again" />
            <button id="signupButton" onClick={postSignup}>Sign up</button>
      </div>
            <p id="signupMessage">{verifyMessage}</p>
    </React.Fragment>
  );
}

export default Signup;