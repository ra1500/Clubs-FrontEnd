import React from "react";
import Login from './pages/Login';
import SampleQuestions from './SampleQuestions';
import { Redirect } from "react-router-dom";


class Introduction extends React.Component {
  constructor(props) {
    super(props);
    this.goToAbout = this.goToAbout.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          showIntro: true,
          year: null,
        };
  }

  componentDidMount() {
    this.getCurrentYear();
  }

    goToAbout() {
        this.setState({showIntro: false, showAbout: true,});
    }

    getCurrentYear() {
        let year2 = new Date().getFullYear();
        this.setState({year: year2 });
    }

// <li>  Collaborate through guilds. </li>

  render() {

    return (
    <React.Fragment>

    {this.state.showIntro &&
    <div>
    <div id="introDiv">
    <div class="topParentDiv">
         <p id="intro1p">  Simply connected. Friends, family, colleagues. </p>
         <ul class="introUL">
         <li>  Expand your network. </li>
         <li>  Join clubs. Start a new one. </li>
         <li>  Private and secure.  </li>
         </ul>
    </div>

    </div>
    <div id="aboutDiv">
    <p class="aboutP1">© {this.state.year} NeuralJuice   </p>
    <button id="aboutButton" onClick={this.goToAbout} > About </button>
    </div>
    </div>}

    {this.state.showAbout &&
    <Redirect to="/about" />}

    </React.Fragment>
    );
  }
}

export default Introduction;
