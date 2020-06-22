import LoginStatus from "./LoginStatus";
import React from "react";
import { Link } from 'react-router-dom'

class TitleBar extends React.Component {

//        <Link className="menuLinks" to="/answer"> STATS </Link>
//        <Link className="menuLinks" to="/ask"> CREATE </Link>


  render() {
    return (
    <div id="titleBarDiv">

        <Link onClick={this.props.showIntroStuff} id="NJ" to="/"> NeuralJuice </Link>
        <div id="titleLinksDiv">
        <Link id="menuLinksFirst" to="/welcome"> Messages </Link>
        <Link className="menuLinks" to="/me"> Profile </Link>
        <Link className="menuLinks" to="/network"> Contacts </Link>
        <Link className="menuLinks" to="/clubs"> Clubs </Link>
        <Link className="menuLinks" to="/guilds"> Guilds </Link>
        </div>

        <LoginStatus showSignIn={this.props.showSignIn} signUpCreate={this.props.signUpCreate} />
    </div>

    );
  }
}

export default TitleBar;