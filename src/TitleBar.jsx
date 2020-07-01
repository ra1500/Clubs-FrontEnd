import LoginStatus from "./LoginStatus";
import Login from "./pages/Login";
import React from "react";
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import Logout from "./Logout";
import Signup from './pages/Signup';

class TitleBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleLogin2 = this.toggleLogin2.bind(this);
        this.state = {
            login: true,
            loginStatus: false,
            redirect: false,
            signup: true,
        };
  }


    toggleLogin() {
        this.setState({login: !this.state.login});
        this.setState({loginStatus: !this.state.loginStatus});
        this.setState({signup: false});
    }
     toggleLogin2() {
         this.setState({redirect: !this.state.redirect});
         this.setState({login: !this.state.login});
         this.setState({loginStatus: !this.state.loginStatus});
         this.setState({signup: true});
     }


    loggingOut() {
        this.setState({redirect: false});
        return (
        <div>
        <Logout />
        <Redirect to="/" />
        </div>
        )
    }


  render() {
    return (
    <div id="titleBarDiv">
        <div id="titleBarDiv2">
        <Link onClick={this.props.showIntroStuff} id="NJ" to="/">&nbsp; NeuralJuice &nbsp; </Link>
        {!this.state.signup &&
        <Link id="menuLinksFirst" to="/welcome"> New </Link> }
        {!this.state.signup &&
        <Link className="menuLinks" to="/network"> Contacts </Link> }
        {!this.state.signup &&
        <Link className="menuLinks" to="/clubs"> Clubs </Link> }
        {!this.state.signup &&
        <Link className="menuLinks" to="/guilds"> Guilds </Link> }
        {!this.state.signup &&
        <Link className="menuLinks" to="/me"> Profile </Link> }

        {this.state.login &&
        <Login toggleLogin={this.toggleLogin} /> }

        {this.state.loginStatus &&
        <LoginStatus toggleLogin2={this.toggleLogin2} /> }

        {this.state.redirect &&
        this.loggingOut() }

        {this.state.signup &&
        <Signup toggleLogin={this.toggleLogin} /> }

        </div>
        </div>

    );
  }
}

export default TitleBar;