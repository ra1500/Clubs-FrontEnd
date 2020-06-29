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
         <p id="intro1p">  Stay connected with your friends, family and associates. </p>
         <ul class="introUL">
         <li>   Create and join clubs. </li>
         <li>  Expand your network through your connections. </li>
         <li>  Form guilds to get answers, solve problems and collaborate. </li>
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
