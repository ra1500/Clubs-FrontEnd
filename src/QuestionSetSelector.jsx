import React from "react";
import Questions from "./Questions";
import axios from 'axios';
import ShowAnswers from "./ShowAnswers";

class QuestionSetSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.addToProfile = this.addToProfile.bind(this); // Binded since this is called from child!!!
    this.renderNJSets = this.renderNJSets.bind(this);
    this.renderNetworkSets = this.renderNetworkSets.bind(this);
    this.renderMySets = this.renderMySets.bind(this);
    this.seeAnswers = this.seeAnswers.bind(this);
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
          scorePostedMessage: null,
          showList: false,
          showListNetwork: false,
          showListMySets: false,
          showAnswers: false,
          showAnswersButton: true,
        };
    };

  componentDidMount() {
        this.getNJQsets();
  }

  handleSubmit1(event) {
    this.setState({renderQuestions: false});
    this.state = {questionSetVersion: event.target.value}; // must mutate state directly cuz setState is for matching another variable
    this.setState({questionSetVersion: this.state.questionSetVersion}); // setState to the current value of state.
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

    // TODO is this redundant? just get from useranswersentity via parent.
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
            showScoring: response.data.scoringStyle,
            displayAnswers: response.data.displayAnswers,
            result1: response.data.result1,
            result2: response.data.result2,
            result3: response.data.result3,
            result4: response.data.result4,
            result1start: response.data.result1start,
            result2start: response.data.result2start,
            result3start: response.data.result3start,
          });
          if      (response.data.scoringStyle === 1) {this.setState({showScoring: true,});}
          else                                       {this.setState({showScoring: false,});}
          if      (response.data.displayAnswers === 1) {this.setState({showAnswersButton: true});}
          else                                         {this.setState({showAnswersButton: false});}
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  getNJQsets() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/prm/sc/dw",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            list: response.data,
          });
          this.renderTableData();
          this.setState({renderQuestions: false, showList: true, showListNetwork: false, showListMySets: false,});
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  getNetworkQsets() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/prm/sc/dv",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            list: response.data,
          });
          this.renderTableDataNetwork();
          this.setState({renderQuestions: false, showList: false, showListNetwork: true, showListMySets: false,});
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  getMyQsets() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/prm/sc/du",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            list: response.data,
          });
          this.renderTableData();
          this.setState({renderQuestions: false, showList: false, showListNetwork: false, showListMySets: true,});
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  renderQuestions() {
    if (this.state.questionSetVersion == null) {
        this.setState({renderQuestions: false});
     } // end if
     else {
        this.setState({renderQuestions: true, showList: false, showListNetwork: false, showListMySets: false,});
     }
  }

    renderNJSets() {
        this.setState({showAnswers: false,});
        this.getNJQsets();
    }
    renderNetworkSets() {
        this.setState({showAnswers: false,});
        this.getNetworkQsets();
    }
    renderMySets() {
        this.setState({showAnswers: false,});
        this.getMyQsets();
    }

    seeAnswers() {
        this.setState({showAnswers: true,});
    }

  // called from child, 'Questions'
  addToProfile(value) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { auditee: u,  result: value};  // sending over auditee since this method also in 'AuditQuestions' where it is set to friend.
        axios.post("http://localhost:8080/prm/sc/d?qsId=" + this.state.questionSetVersion,
        data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, scorePostedMessage: "Your score has been posted"
          });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
  }

   renderTableDataNetwork() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index}>
                <td> <button className="titleButton" value={data.questionSetVersionEntity.id} onClick={e => this.handleSubmit1(e)}> {data.questionSetVersionEntity.title} </button> </td>
                <td> {data.questionSetVersionEntity.creativeSource} &nbsp;&nbsp;  </td>
                <td> {data.questionSetVersionEntity.description} &nbsp;&nbsp;  </td>
            </tr>
         )
      })
   }
   renderTableHeaderNetwork() {
      let header = ["Title","Creator", "Description"]
      return header.map((key, index) => {
         return <th key={index}>{key}  </th>
      })
   }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index}>
                <td> <button className="titleButton" value={data.questionSetVersionEntity.id} onClick={e => this.handleSubmit1(e)}> {data.questionSetVersionEntity.title} </button> </td>
                <td> {data.questionSetVersionEntity.description} &nbsp;&nbsp;  </td>
            </tr>
         )
      })
   }
   renderTableHeader() {
      let header = [ "Title", "Description"]
      return header.map((key, index) => {
         return <th key={index}>{key} </th>
      })
   }


   render() {
    return (
        <React.Fragment>

          <div class="settings3ButtonsDiv">
            <button class="settingsButton" onClick={this.renderNJSets}> NJ Sets  </button>
            <button class="settingsButton" onClick={this.renderNetworkSets}> Network Sets </button>
            <button class="settingsButton" onClick={this.renderMySets}> My Created Sets </button>
          </div>

        { this.state.showListNetwork &&
         <div class="topParentDiv">
        <p> Answer - Network Sets </p>
        <p></p>
        <div class="secondParentDiv">
            <table>
               <tbody>
               <tr>{this.renderTableHeaderNetwork()}</tr>
                {this.renderTableDataNetwork()}
               </tbody>
            </table>
         </div>
         </div> }


        { this.state.showList &&
         <div class="topParentDiv">
        <p> Answer - NJ Sets </p>
        <p></p>
        <div class="secondParentDiv">
            <table>
               <tbody>
               <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
               </tbody>
            </table>
         </div>
         </div> }

        { this.state.showListMySets &&
         <div class="topParentDiv">
        <p> Answer - My Created Sets </p>
        <p></p>
        <div class="secondParentDiv">
            <table>
               <tbody>
               <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
               </tbody>
            </table>
         </div>
         </div> }

        { this.state.renderQuestions &&
         <div class="topParentDiv">
        <p> Answer </p>
        <div id="questionsComponent">
        <Questions questionSetVersion={this.state.questionSetVersion} questionSetSize={this.state.questionSetSize} questionToGoTo={this.state.questionToGoTo}
        maxPoints={this.state.maxPoints} title={this.state.title} description={this.state.description} showScoring={this.state.showScoring}
        addToProfile={this.addToProfile} scorePostedMessage={this.state.scorePostedMessage} result1={this.state.result1}
         result2={this.state.result2} result3={this.state.result3} result4={this.state.result4} result1start={this.state.result1start}
         result2start={this.state.result2start} result3start={this.state.result3start} seeAnswers={this.seeAnswers} showAnswersButton={this.state.showAnswersButton}/>
        </div>
        </div> }


         {this.state.showAnswers &&
         <ShowAnswers questionSetVersionEntityId={this.props.questionSetVersion} questionSetVersionEntityId={this.state.questionSetVersion} /> }

        </React.Fragment>
    ); // end return
   }
}

export default QuestionSetSelector;