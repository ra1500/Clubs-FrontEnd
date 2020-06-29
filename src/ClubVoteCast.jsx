import React from "react";
import axios from 'axios';

class ClubVoteCast extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          invitationSentMessage: null,
          alphaVote: null,
          showInviteButton: true,
        };
  }

    componentDidMount() {
    }

  handleChange(event) {
    this.setState({alphaVote: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (window.confirm('Please confirm vote')) {
    this.postClubVote();
    }
  }

    postClubVote() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { voteCast: this.state.alphaVote, voteType: 1 };
        axios.post("http://localhost:8080/api/v/b?cId=" + this.props.clubId, data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        if (response.status === 204) {
            this.setState({invitationSentMessage: " not found" });}
        else {
            this.setState({isLoaded: true, invitationSentMessage: this.state.alphaVote + " has been nominated to be club alpha",});
            this.props.refreshMyCurrentAlphaVote(response.data.voteCast);
        }
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

  render() {
    return (
    <React.Fragment>
      <div class="topParentDiv">
        <p> Vote for Club Alpha </p>
        <p></p>
        <div class="secondParentDiv">
        <input id="invitationBox" type="text" value={this.state.alphaVote} onChange={this.handleChange} placeholder=" username " />
        <p></p>
        { this.state.showInviteButton &&
        <div>
        <button type="submit" onClick={this.handleSubmit} className="inviteAuditButton"> Invite </button>
         </div>}
        <span id="deletedAnswersMessage"> {this.state.invitationSentMessage} </span>
        </div>
      </div>
    </React.Fragment>
    );
  }
}

export default ClubVoteCast;