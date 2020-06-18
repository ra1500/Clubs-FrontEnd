import React from "react";
import Login from './pages/Login';
import TitleBar from './TitleBar';
import SampleQuestions from './SampleQuestions';
import Signup from './pages/Signup';

class Introduction extends React.Component {
  constructor(props) {
    super(props);
    this.showSignIn = this.showSignIn.bind(this);
    this.signUpCreate = this.signUpCreate.bind(this);
    this.viewSample = this.viewSample.bind(this);
    this.showIntroStuff = this.showIntroStuff.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          showSignIn: false,
          showIntro: true,
          showSignUpForm: false,
          //showSample: false,
        };
  }

    componentDidMount() {
    }

    showIntroStuff() {
        this.setState({showSignIn: false, showSignUpForm: false, showIntro: true, showSample: false});
    }

    showSignIn() {
        this.setState({showSignIn: true, showSignUpForm: false, showIntro: false, showSample: false});
    }

    signUpCreate() {
        this.setState({showSignIn: false, showIntro: false, showSignUpForm: true, showSample: false});
    }

    viewSample() {
        if (!this.state.showSample) {
            this.setState({showSignIn: false, showIntro: true, showSignUpForm: false, showSample: true});
        }
        else {
            this.setState({showSignIn: false, showIntro: true, showSignUpForm: false, showSample: false});
        }
    }


   // {this.state.showSample &&
   // <div id="questionsComponent">
   //     <SampleQuestions />
   // </div> }

   //<button id="sampleButton" onClick={() => this.viewSample()}>Sample Stat: Animal Trivia Intelligence</button>


  render() {

    return (
    <React.Fragment>

    <TitleBar showSignIn={this.showSignIn} signUpCreate={this.signUpCreate} showIntroStuff={this.showIntroStuff}/>

    {this.state.showSignIn &&
    <Login signUpCreate={this.signUpCreate} /> }

    {this.state.showSignUpForm &&
    <Signup /> }

    {this.state.showIntro &&
    <div class="topParentDiv">
    <p> NeuralJuice </p>
    <p></p>
    <div class="secondParentDiv">
         <p>  Privately connect with your friends, family and associates. </p>
         <p>  See who they are connected with and make new friends. </p>
         <p>  Setup a club with your friends to share your ideas and news. </p>
         <p>  Create guilds to get answers, solve problems and collaborate. </p>
         <p>  No cookies. No outsider trolls.  </p>

    </div>

    </div> }

    <div class="introPadding"></div>
    </React.Fragment>
    );
  }
}

export default Introduction;
