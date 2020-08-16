import LoginStatus from "./LoginStatus";
import React from "react";
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import Logout from "./Logout";
import Clubs from "./Clubs";
import Start from "./Start";
import Network from "./Network";
import Profile from "./Profile";
import Guilds from "./Guilds";
import Home2 from "./Home2";

class TitleBar4 extends React.Component {
  constructor(props) {
    super(props);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleLogin2 = this.toggleLogin2.bind(this);
    this.redirectClubs = this.redirectClubs.bind(this);
    this.redirectNetwork = this.redirectNetwork.bind(this);
    this.redirectStart = this.redirectStart.bind(this);
    this.redirectMe = this.redirectMe.bind(this);
    this.redirectGuilds = this.redirectGuilds.bind(this);
    this.redirectHome2 = this.redirectHome2.bind(this);
        this.state = {
            loginStatus: false,
            redirect: false,
            onAlerts: true,
            onClubs: false,
            onGuilds: false,
            onNetwork: false,
            onProfile: false,
            onHome2: false,
            clubs: false,
            clubs2: false,
            network: false,
            network2: false,
            me: false,
            me2: false,
            guilds: false,
            guilds2: false,
            start: true,
            start2: false,
            home2: false,
            home22: false,
        };
  }

    componentDidMount() {
        this.toggleLogin();
    }

    toggleLogin() {
        this.setState({loginStatus: !this.state.loginStatus});
        this.setState({onAlerts: true});
    }
     toggleLogin2() {
         this.setState({redirect: !this.state.redirect});
         this.setState({loginStatus: !this.state.loginStatus});
         this.setState({onAlerts: false});
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
        this.setState({clubs: !this.state.clubs, clubs2: this.state.clubs, start: false, start2: false, network: false, network2: false, guilds: false, guilds2: false, me: false, me2: false, home2: false, home22: false });
        this.setState({onAlerts: false, onNetwork: false, onClubs: true, onGuilds: false, onProfile: false, onHome2: false});
        event.preventDefault();
    }
    redirectNetwork() {
        this.setState({network: !this.state.network, network2: this.state.network, clubs: false, clubs2: false, guilds: false, guilds2: false, me: false, me2: false, start: false, start2: false, home2: false, home22: false });
        this.setState({onAlerts: false, onNetwork: true, onClubs: false, onGuilds: false, onProfile: false, onHome2: false});
    }
     redirectStart() {
         this.setState({start: !this.state.start, start2: this.state.start, clubs: false, clubs2: false, network: false, network2: false, guilds: false, guilds2: false, me: false, me2: false, home2: false, home22: false });
         this.setState({onAlerts: true, onNetwork: false, onClubs: false, onGuilds: false, onProfile: false, onHome2: false});
     }
    redirectMe() {
        this.setState({me: !this.state.me, me2: this.state.me, clubs: false, clubs2: false, network: false, network2: false, guilds: false, guilds2: false, start: false, start2: false, home2: false, home22: false });
        this.setState({onAlerts: false, onNetwork: false, onClubs: false, onGuilds: false, onProfile: true, onHome2: false});
    }
    redirectGuilds() {
        this.setState({guilds: !this.state.guilds, guilds2: this.state.guilds, clubs: false, clubs2: false, network: false, network2: false, start: false, start2: false, me: false, me2: false, home2: false, home22: false});
        this.setState({onAlerts: false, onNetwork: false, onClubs: false, onGuilds: true, onProfile: false, onHome2: false});
    }
    redirectHome2() {
        this.setState({home2: !this.state.home2, home22: this.state.home2, guilds: false, guilds2: false, clubs: false, clubs2: false, network: false, network2: false, start: false, start2: false, me: false, me2: false});
        this.setState({onAlerts: false, onNetwork: false, onClubs: false, onGuilds: false, onProfile: false, onHome2: true});
    }


  render() {
    return (
    <div id="titleBarDiv">
        <div id="titleBarDiv2">
        <button id="buttonNJ" onClick={this.redirectHome2}> &nbsp; NeuralJuice &nbsp; </button>

        {this.state.onAlerts &&
        <div id="titleBarDiv3">
        <button class="menuLinksOnButton" onClick={this.redirectStart}> Alerts </button>
        <button class="menuLinks" onClick={this.redirectNetwork}> Network </button>
        <button class="menuLinks" onClick={this.redirectClubs}> Clubs </button>
        <button class="menuLinks" onClick={this.redirectGuilds}> Guilds </button>
        <button class="menuLinks" onClick={this.redirectMe}> Profile </button>
        </div> }

        {this.state.onNetwork &&
        <div id="titleBarDiv3">
        <button class="menuLinks" onClick={this.redirectStart}> Alerts </button>
        <button class="menuLinksOnButton" onClick={this.redirectNetwork}> Network </button>
        <button class="menuLinks" onClick={this.redirectClubs}> Clubs </button>
        <button class="menuLinks" onClick={this.redirectGuilds}> Guilds </button>
        <button class="menuLinks" onClick={this.redirectMe}> Profile </button>
        </div> }

        {this.state.onClubs &&
        <div id="titleBarDiv3">
        <button class="menuLinks" onClick={this.redirectStart}> Alerts </button>
        <button class="menuLinks" onClick={this.redirectNetwork}> Network </button>
        <button class="menuLinksOnButton" onClick={this.redirectClubs}> Clubs </button>
        <button class="menuLinks" onClick={this.redirectGuilds}> Guilds </button>
        <button class="menuLinks" onClick={this.redirectMe}> Profile </button>
        </div> }

        {this.state.onGuilds &&
        <div id="titleBarDiv3">
        <button class="menuLinks" onClick={this.redirectStart}> Alerts </button>
        <button class="menuLinks" onClick={this.redirectNetwork}> Network </button>
        <button class="menuLinks" onClick={this.redirectClubs}> Clubs </button>
        <button class="menuLinksOnButton" onClick={this.redirectGuilds}> Guilds </button>
        <button class="menuLinks" onClick={this.redirectMe}> Profile </button>
        </div> }

        {this.state.onProfile &&
        <div id="titleBarDiv3">
        <button class="menuLinks" onClick={this.redirectStart}> Alerts </button>
        <button class="menuLinks" onClick={this.redirectNetwork}> Network </button>
        <button class="menuLinks" onClick={this.redirectClubs}> Clubs </button>
        <button class="menuLinks" onClick={this.redirectGuilds}> Guilds </button>
        <button class="menuLinksOnButton" onClick={this.redirectMe}> Profile </button>
        </div> }

        {this.state.onHome2 &&
        <div id="titleBarDiv3">
        <button class="menuLinks" onClick={this.redirectStart}> Alerts </button>
        <button class="menuLinks" onClick={this.redirectNetwork}> Network </button>
        <button class="menuLinks" onClick={this.redirectClubs}> Clubs </button>
        <button class="menuLinks" onClick={this.redirectGuilds}> Guilds </button>
        <button class="menuLinks" onClick={this.redirectMe}> Profile </button>
        </div> }

        {this.state.loginStatus &&
        <LoginStatus toggleLogin2={this.toggleLogin2} /> }

        {this.state.start &&
        <Start />}
        {this.state.start2 &&
        <Start />}

        {this.state.network &&
        <Network />}
        {this.state.network2 &&
        <Network />}

        {this.state.clubs &&
        <Clubs />}
        {this.state.clubs2 &&
        <Clubs />}

        {this.state.guilds &&
        <Guilds />}
        {this.state.guilds2 &&
        <Guilds />}

        {this.state.me &&
        <Profile />}
        {this.state.me2 &&
        <Profile />}

        </div>

        {this.state.home2 &&
        <Home2 />}
        {this.state.home22 &&
        <Home2 />}

        {this.state.redirect &&
        this.loggingOut() }


        </div>

    );
  }
}

export default TitleBar4;