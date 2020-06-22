import React from "react";
import axios from 'axios';

class ClubInvite extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          invitationSentMessage: null,
          receiver: null,
          showInviteButton: true,
        };
  }

    componentDidMount() {
    }

  handleChange(event) {
    this.setState({receiver: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (window.confirm('Please confirm invitation')) {
    this.postClubInvitation();
    }
  }

    postClubInvitation() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { receiver: this.state.receiver };
        axios.post("http://localhost:8080/api/i/b?cId=" + this.props.clubId, data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        if (response.status === 204) {
        this.setState({invitationSentMessage: " user not found" });}
        else {
        this.setState({isLoaded: true, invitationSentMessage: this.state.receiver + " has been invited to join the club.",
                  }); }
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

  render() {
    return (
    <React.Fragment>
      <div class="topParentDiv">
        <p> Club Invitation </p>
        <p></p>
        <div class="secondParentDiv">
        <input id="invitationBox" type="text" value={this.state.receiver} onChange={this.handleChange} placeholder=" username " />
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

export default ClubInvite;