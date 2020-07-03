import React from "react";
import { Redirect } from "react-router-dom";
import Logout from "./Logout";


class LoginStatus extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
          error: null,
          isLoaded: false,
          userName: "",
          name: null,
          goHome: "/",
          redirect: false,
          value: null,
          goToLogout: false,
        };
  }

    componentDidMount() {
        if ( sessionStorage.getItem('tokens') === "undefined" || sessionStorage.getItem('tokens') === null ) {
            this.setState({userName: "error"});
        }
        else {
         this.setState({ userName: JSON.parse(sessionStorage.getItem('tokens')).userName });
        }
    }


  render() {

    return (
    <React.Fragment>
           <div id="loginStatusDiv">
           <table>
           <tr>
           <td><p id="userName"> {this.state.userName}  </p> </td>
            <button id="logoutButton" onClick={() => this.props.toggleLogin2()}>Log Out</button>
           </tr>
           </table>
           </div>

    </React.Fragment>
    );
   }

  }

export default LoginStatus;