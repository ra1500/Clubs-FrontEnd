import React from "react";
import Questions from "./Questions";
import axios from 'axios';

class QuestionSetSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.addToProfile = this.addToProfile.bind(this); // Binded since this is called from child!!!
    //this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.state = {
          questionSetSize: 500,
          questionToGoTo: 1, // initialized at first question sequence of the set.
          questionSetVersion: null,
          maxPoints: 10000,
          category: null,
          description: null,
          title: null,
          version: null,
          renderQuestions: false,
          typeNumber: 9, // indicating permission index
          auditee: null,
          scorePostedMessage: null,
        };
    };

  componentDidMount() {
        const auditeeName = (JSON.parse(sessionStorage.getItem('tokens'))).userName;
        this.setState({auditee: auditeeName}); // TODO this needs to come from props.
  }

  handleSubmit1() {
    this.setState({renderQuestions: false});
    this.state = {questionSetVersion: 1}; // must mutate state directly cuz setState is for matching another variable
    this.setState({questionSetVersion: this.state.questionSetVersion}); // setState to the current value of state.
    this.getMaxQtyAndPoints();
    this.getQuestionSetVersionEntity(); // *
  }
  handleSubmit2() {
    this.setState({renderQuestions: false});
    this.state = {questionSetVersion: 2}; // must mutate state directly cuz setState is for matching another variable
    this.setState({questionSetVersion: this.state.questionSetVersion}); // setState to the current value of state.
    console.log(this.state.questionSetVersion);
    this.getMaxQtyAndPoints();
    this.getQuestionSetVersionEntity(); // *
  }

  getMaxQtyAndPoints() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/qs/q?sn=" + this.state.questionSetVersion,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            questionSetSize: response.data.maxQtyQuestions,
            maxPoints: response.data.maxPoints,
          });
          this.renderQuestions(); // ********
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  getQuestionSetVersionEntity() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/qs/g?qsid=" + this.state.questionSetVersion,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            category: response.data.category,
            description: response.data.description,
            title: response.data.title,
            version: response.data.version,
          });
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  renderQuestions() {
    if (this.state.questionSetVersion == null) {
        this.setState({renderQuestions: false});
     } // end if
     else {
        this.setState({renderQuestions: true});
     }
  }

  // since this is called from child, MUST bind it above!!
  addToProfile() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { auditee: this.state.auditee, typeNumber: this.state.typeNumber};
        axios.post("http://localhost:8080/prm/sc/d?qsId=" + this.state.questionSetVersion,
        data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, scorePostedMessage: "Your score has been posted"
          });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
  }

   render() {
    return (
        <React.Fragment>

        <div id="chooseSet">
            <p> Select a quiz. 'Life Score' is where it all begins. Share your score with you friends on your public profile page. Send them a link.</p>

            <table>
            <tr>
                <th> Title &nbsp;&nbsp;  </th><th> Category &nbsp;&nbsp;  </th><th> Description &nbsp; </th>
            </tr>
            <tr>
                <td id="selectQuestionSet" onClick={() => this.handleSubmit1()}> Life Score </td><td> Life </td><td> Who are you? What is your life value score</td>
            </tr>

            <tr>
                <td id="selectQuestionSet" onClick={() => this.handleSubmit2()}> What is your future &nbsp;  </td><td> Life </td><td> Discover your destiny</td>
            </tr>

            <tr>
                <td> (more to come)</td>
            </tr>
            </table>

        </div>
            { this.state.renderQuestions &&
            <div>
            <Questions questionSetVersion={this.state.questionSetVersion} questionSetSize={this.state.questionSetSize} questionToGoTo={this.state.questionToGoTo}
            maxPoints={this.state.maxPoints} title={this.state.title} description={this.state.description}
            addToProfile={this.addToProfile} auditee={this.state.auditee} scorePostedMessage={this.state.scorePostedMessage}/>
            </div> }

        </React.Fragment>
    ); // end return
   }
}

export default QuestionSetSelector;