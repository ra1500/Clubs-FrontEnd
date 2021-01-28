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

        if ( this.state.receiver == u ) { this.setState({ invitationSentMessage: "but you're already in the forum!" }); }
        else {

        let data = { receiver: this.state.receiver };
        axios.post("http://localhost:8080/api/i/b?cId=" + this.props.clubId, data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        if (response.status === 204) {
        this.setState({invitationSentMessage: " user not found" });}
        else if ( response.data.status == 5 ) { this.setState({isLoaded: true, invitationSentMessage: " Sorry, forum is full",}); }
        else if ( response.data.receiver == this.state.receiver ) { this.setState({ invitationSentMessage: response.data.receiver + " has been invited to join the forum." }); }
        else {this.setState({isLoaded: true, invitationSentMessage: response.data.receiver,}); }
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
        }; // end of first if/else
    }

  render() {
    return (
    <React.Fragment>
      <div class="topParentDiv">
        <p> Forum Invitation </p>
        <p></p>
        <div class="secondParentDiv">
        <input id="invitationBox" type="text" value={this.state.receiver} onChange={this.handleChange} placeholder=" username " />
        <p></p>
        { this.state.showInviteButton &&
        <div>
        <button type="submit" onClick={this.handleSubmit} className="updateButton"> Invite </button>
         </div>}
        <span id="deletedAnswersMessage"> {this.state.invitationSentMessage} </span>
        </div>
      </div>
    </React.Fragment>
    );
  }
}

export default ClubInvite;