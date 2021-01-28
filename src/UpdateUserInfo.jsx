import React, { useState } from "react";
import axios from 'axios';
import { Form } from "./components/AuthForms";
import { useAuth } from "./context/auth";

function UpdateUserInfo(props) {
  //const referer = "/welcome";
  //const [isLoggedIn, setLoggedIn] = useState(false);
  //const [ setIsError] = useState(false);
  //const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setoldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [UpdateMessage, setUpdateMessage] = useState("");
  const { setAuthTokens } = useAuth();

    function updateSignup() {

        if ( password.length < 8 ) { setUpdateMessage("Passwords must be at least 8 characters. Please modify."); }
        else if ( password != confirmPassword ) { setUpdateMessage("Confirmed password does not match."); }
        else {

        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { password: password, userName: oldPassword }; // lame security check... TODO modify
        axios.post("http://localhost:8080/api/user/update", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
            if (response.data.password !== "error" ) {
            setAuthTokens(response.data);
            setUpdateMessage("Password has been updated"); }
            else {
            setUpdateMessage("Error updating password. Please check your input");
            };
               }).catch(error => {
               });
         };
    }

  return (
    <React.Fragment>
      <div id="meSettingsDiv">
      <p></p>
      <p> Password change. </p>
      <Form>
        <input class="loginInput" type="password" value={oldPassword} onChange={e => {setoldPassword(e.target.value);}} placeholder=" current password" /><br></br>
        <input class="loginInput" type="password" value={password} onChange={e => {setPassword(e.target.value);}} placeholder=" new password" /><br></br>
        <input class="loginInput" type="password" value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value);}} placeholder=" confirm new password" /><br></br>
        <button class="updateButton" onClick={updateSignup}>Update</button>
        <p class="updateParagraph"> {UpdateMessage} </p>
      </Form>
      </div>
    </React.Fragment>
  );
}

export default UpdateUserInfo;