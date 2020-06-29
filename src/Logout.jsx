import React, { useState } from "react";
import { useAuth } from "./context/auth";
import { Redirect } from "react-router-dom";

function Logout(props) {
   const { setAuthTokens } = useAuth();
   setAuthTokens();

  function logOut() {
    setAuthTokens();
    sessionStorage.clear();
    //props.toggleLogin();
  }

  return (null)

}

export default Logout;