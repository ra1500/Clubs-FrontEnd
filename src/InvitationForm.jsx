import React from "react";
import axios from 'axios';

class InvitationForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange2 = this.handleChange2.bind(this); // select connectionType
    this.handleChange3 = this.handleChange3.bind(this); // select visibilityPermission
        this.state = {
          error: null,
          isLoaded: false,
          connectionType: "Friend",
          connectionStatus: "pending",
          visibilityPermission: "Yes",
          invitationSentMessage: null,
          friendInvited: null,
          showInviteButton: true,
        };
  }

    componentDidMount() {
    }

  handleChange(event) {
    this.setState({friend: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (window.confirm('Please confirm invitation')) {
    this.postNewFriendship();
    }
  }

   // select connectionType
   handleChange2(event) {
     this.setState({connectionType: event.target.value});
   }

   // select visibilityPermission
   handleChange3(event) {
     this.setState({visibilityPermission: event.target.value});
   }

    postNewFriendship() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;

        if ( this.state.friend == u ) { this.setState({invitationSentMessage: " ummm, aren't you already connected to yourself?" }); }
        else {

        let data = { friend: this.state.friend, connectionType: this.state.connectionType, connectionStatus: this.state.connectionStatus,
         visibilityPermission: this.state.visibilityPermission, inviter: u };
        axios.post("http://localhost:8080/api/f", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        if (response.status === 204) {
        this.setState({invitationSentMessage: " user not found" });}
        else {
        this.setState({isLoaded: true, friendInvited: this.state.friend, invitationSentMessage: this.state.friend + " has been invited to join your network.",
                  }); }
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
         }; // end first else
    }

  render() {
    return (
    <React.Fragment>
      <div class="topParentDiv">
        <p> Invite another user to join your network </p>
        <p></p>
        <div class="secondParentDiv">
        <input id="invitationBox" type="text" value={this.state.friend} onChange={this.handleChange} placeholder=" username of contact" />
        <form id="inviteRadio1">
            <div>
              <label><input value="Friend" onChange={this.handleChange2} type="radio" name="optradio" /> Friend </label>
            </div>
            <div>
              <label><input value="Family" onChange={this.handleChange2} type="radio" name="optradio" /> Family </label>
            </div>
            <div>
              <label><input value="Colleague" onChange={this.handleChange2} type="radio" name="optradio" /> Colleague </label>
            </div>
        </form>
        <p></p>
        { this.state.showInviteButton &&
        <div>
        <button type="submit" onClick={this.handleSubmit} className="seeDetailsButton"> Invite </button>
         </div>}
        <span id="deletedAnswersMessage"> {this.state.invitationSentMessage} </span>
        </div>
      </div>
    </React.Fragment>
    );
  }
}

export default InvitationForm;