import LoginStatus from "./LoginStatus";
import React from "react";
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import Logout from "./Logout";

class TitleBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleLogin2 = this.toggleLogin2.bind(this);
    this.redirectClubs = this.redirectClubs.bind(this);
    this.redirectNetwork = this.redirectNetwork.bind(this);
    this.redirectWelcome = this.redirectWelcome.bind(this);
    this.redirectMe = this.redirectMe.bind(this);
    this.redirectGuilds = this.redirectGuilds.bind(this);
        this.state = {
            loginStatus: false,
            redirect: false,
            signup: true,
            clubs: false,
            clubs2: false,
            network: false,
            network2: false,
            me: false,
            me2: false,
            guilds: false,
            guilds2: false,
            welcome: false,
            welcome2: false,
            toggler: 2,
        };
  }

    componentDidMount() {
        this.toggleLogin();
    }

    toggleLogin() {
        this.setState({loginStatus: !this.state.loginStatus});
        this.setState({signup: false});
    }
     toggleLogin2() {
         this.setState({redirect: !this.state.redirect});
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

    redirectClubs(event) {
        this.setState({clubs: !this.state.clubs, clubs2: this.state.clubs, network: false, network2: false, me: false, me2: false,welcome: false, welcome2: false, guilds: false, guilds2: false});
        event.preventDefault();
    }
    redirectNetwork() {
        this.setState({network: !this.state.network, network2: this.state.network, clubs: false, clubs2: false, me: false, me2: false,welcome: false, welcome2: false, guilds: false, guilds2: false});
    }
     redirectWelcome() {
         this.setState({welcome: !this.state.welcome, welcome2: this.state.welcome, clubs: false, clubs2: false, me: false, me2: false, network: false, network2: false, guilds: false, guilds2: false});
     }
    redirectMe() {
        this.setState({me: !this.state.me, me2: this.state.me, clubs: false, clubs: false, network: false, network2: false,welcome: false, welcome2: false, guilds: false, guilds2: false});
    }
    redirectGuilds() {
        this.setState({guilds: !this.state.guilds, guilds2: this.state.guilds, clubs: false, clubs2: false, me: false, me2: false,welcome: false, welcome2: false, network: false, network2: false});
    }



  render() {
    return (
    <div id="titleBarDiv">
        <div id="titleBarDiv2">
        <Link id="NJ" to="/home">&nbsp; NeuralJuice &nbsp; </Link>

        {!this.state.signup &&
        <div id="titleBarDiv3">
        <button class="menuLinks" onClick={this.redirectWelcome}> Alerts </button>
        <button class="menuLinks" onClick={this.redirectNetwork}> Network </button>
        <button class="menuLinks" onClick={this.redirectClubs}> Clubs </button>
        <button class="menuLinks" onClick={this.redirectGuilds}> Guilds </button>
        <button class="menuLinks" onClick={this.redirectMe}> Profile </button>
        </div> }

        {this.state.welcome &&
        <Redirect to="/welcome" />}
        {this.state.welcome2 &&
        <Redirect to="/welcome_" />}

        {this.state.network &&
        <Redirect to="/network" />}
        {this.state.network2 &&
        <Redirect to="/network_" />}

        {this.state.clubs &&
        <Redirect to="/clubs" />}
        {this.state.clubs2 &&
        <Redirect to="/clubs_" />}

        {this.state.guilds &&
        <Redirect to="/guilds" />}
        {this.state.guilds2 &&
        <Redirect to="/guilds_" />}

        {this.state.me &&
        <Redirect to="/me" />}
        {this.state.me2 &&
        <Redirect to="/me_" />}

        {this.state.loginStatus &&
        <LoginStatus toggleLogin2={this.toggleLogin2} /> }

        {this.state.redirect &&
        this.loggingOut() }

        </div>
        </div>

    );
  }
}

export default TitleBar;