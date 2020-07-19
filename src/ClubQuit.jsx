import React from "react";
import axios from 'axios';

class ClubQuit extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          quitMessage: null,
          showQuitButton: true,
        };
  }

    componentDidMount() {
    }

  handleSubmit(event) {
    event.preventDefault();
    if (window.confirm('Please confirm club quit')) {
    this.postQuitClub();
    }
  }

    postQuitClub() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/c/c?cId=" + this.props.clubId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        if (response.status === 204) {
        this.setState({quitMessage: " error. user and club combination not found." });}
        else {
        this.setState({isLoaded: true, quitMessage: " Club removed.",
                  }); }
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

  render() {
    return (
    <React.Fragment>
      <div class="topParentDiv">
        <p> Quit Club </p>
        <p></p>
        <div class="secondParentDiv">

        { this.state.showQuitButton &&
        <div>
        <button type="submit" onClick={this.handleSubmit} className="seeDetailsButton"> Quit </button>
         </div>}

        <span id="deletedAnswersMessage"> {this.state.quitMessage} </span>
        </div>
      </div>
    </React.Fragment>
    );
  }
}

export default ClubQuit;