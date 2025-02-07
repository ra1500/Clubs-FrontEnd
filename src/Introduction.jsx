import React from "react";
import axios from 'axios';
import Login from './pages/Login';
//import SampleQuestions from './SampleQuestions';
import GameSample from './GameSample';
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
    //this.loadSampleGame();
  }

    goToAbout() {
        this.setState({showIntro: false, showAbout: true,});
    }

    getCurrentYear() {
        let year2 = new Date().getFullYear();
        this.setState({year: year2 });
    }

    loadSampleGame() {
        axios.get("http://localhost:8080/api/g/a?g=" + "18", {headers : { 'Authorization' : "" }})
        .then((response) => {
         if (response.status === 200) {
          this.setState({
            isLoaded: true,
            game: response.data,
          });
          //      if ( response.data.clubsList.length > 0 ) { this.setState({ showClubsList2: true}) };
          } // end if
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }


// <button id="aboutButton" onClick={this.goToAbout} > About </button>

  render() {

    return (
    <React.Fragment>

    {this.state.showIntro &&
    <div>
    <div id="introDiv">
    <div class="topParentDiv">
         <p id="intro1p"> Clubs and Networking </p>
         <ul class="introUL">
            <li> A nice and simple way to stay connected. </li>
         </ul>
    </div>

    </div>
    <div id="aboutDiv">
    <p class="aboutP1">© {this.state.year} NeuralJuice   </p>

    </div>
    </div>}

    {this.state.showAbout &&
    <Redirect to="/about" />}

    </React.Fragment>
    );
  }
}

export default Introduction;
