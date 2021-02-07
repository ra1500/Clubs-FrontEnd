import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../context/auth";

function Signup(props) {
  const referer = "/app";
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [ setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");
  const { setAuthTokens } = useAuth();

  function postSignup() {
    if (password !== verifyPassword) { setVerifyMessage("Password fields did not match.");}
    else if (userName.length < 8) { setVerifyMessage("username should be at least 8 characters long.");}
    else if (password.length < 8) { setVerifyMessage("password should be at least 8 characters long");}
    else {
    axios.post("http://localhost:8080/api/user/signup1", {
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
        ;
      }
    }).catch(e => {
      ;
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
            <input class="signupBox" maxlength="100" type="username" value={userName} onChange={e => {setUserName(e.target.value);}}placeholder="username" />
            <input class="signupBox" maxlength="100" type="password" value={password} onChange={e => {setPassword(e.target.value);}}placeholder="password" />
            <input class="signupBox" maxlength="100" type="password" value={verifyPassword} onChange={e => {setVerifyPassword(e.target.value);}}placeholder="confirm password" />
            <button id="signupButton" onClick={postSignup}>Join</button>
      </div>
            <p id="signupMessage">{verifyMessage}</p>
    </React.Fragment>
  );
}

export default Signup;