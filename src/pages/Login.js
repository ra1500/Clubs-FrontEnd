import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../context/auth";


function Login(props) {
  const referer = "/app";
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();


function enterPressed(event) {
    var code = event.keyCode || event.which;
    if(code === 13) {
        postLogin();
    }
}

  function postLogin() {
    axios.post("http://localhost:8080/api/user/userId", {
      userName,
      password
    }).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setLoggedIn(true);
        props.toggleLogin();
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <React.Fragment>
        <div id="loginStatusDiv">
        <input class="loginBox" type="username" value={userName} onChange={e => {setUserName(e.target.value);}} placeholder="username"/>
        <input class="loginBox" type="password" value={password} onChange={e => {setPassword(e.target.value);}} placeholder="password" onKeyPress={enterPressed}/>
        <button id="logoutButton" onClick={postLogin}> Log In </button>

        { isError &&
        <div>
        <p></p>
        <p id="deletedScorePostP">username or password not found</p>
        </div>}

        { !isError &&
        <div>
        <p></p>
        <p id="deletedScorePostP"></p>
        </div>}

    </div>
    </React.Fragment>
  );
}

export default Login;