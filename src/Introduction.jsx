import React from "react";
import Login from './pages/Login';
import SampleQuestions from './SampleQuestions';


class Introduction extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
          error: null,
          isLoaded: false,
          showIntro: true,
        };
  }

    componentDidMount() {
    }


  render() {

    return (
    <React.Fragment>


    {this.state.showIntro &&
    <div>
    <div id="introDiv">
    <div class="topParentDiv">
         <p id="intro1p">  Simply connected. Friends, family, colleagues. </p>
         <ul class="introUL">
         <li>  Join clubs. Start a new one. </li>
         <li>  Expand your network through your connections. </li>
         <li>  Use guilds to collaborate. </li>
         <li>  Private and secure.  </li>
         </ul>
    </div>

    </div>
    <div id="aboutDiv">
    <p class="aboutP1">© 2020 NeuralJuice </p>
    <p class="aboutP2"> About </p>
    </div>
    </div>}

    </React.Fragment>
    );
  }
}

export default Introduction;
