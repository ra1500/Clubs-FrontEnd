import React from "react";
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import Signup from './pages/Signup';

class TitleBar3 extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
        };
  }


  render() {
    return (
    <div id="titleBarDiv">
        <div id="titleBarDiv2">
        <Link id="NJ" to="/">&nbsp; NeuralJuice &nbsp; </Link>

        <p id="publicPageUserName"> {this.props.userName} </p>

        </div>
        </div>

    );
  }
}

export default TitleBar3;