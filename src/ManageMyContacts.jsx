import React from "react";
import axios from 'axios';

class ManageMyContacts extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          friendId: this.props.friendId,
          connectionType: this.props.connectionType,
          connectionStatus: null,
          visibilityPermission: this.props.visibilityPermission,
          inviter: null,
          hasPendingInvitations: false,
          isAfriend: true,
          friendBeingManaged: null,
          showUpdatedMessage: false,
          showUpdateButton: true,
          deletedMessage: "(contact has been removed)",
          updatedMessage: "(contact has been updated)",
          currentType: this.props.connectionType,
          currentVisibility: this.props.visibilityPermission,
        };
  }

    componentDidMount() {
        this.manageUpdate();
    }

    patchFriendship() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: this.props.friendId, connectionStatus: this.props.connectionStatus, inviter: this.props.inviter,
         connectionType: this.state.connectionType, visibilityPermission: this.state.visibilityPermission };
        axios.post("http://localhost:8080/api/f/a", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, showUpdatedMessage: true, showUpdateButton: false,
                  });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

    updateFriendshipConnectionType() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: this.props.friendId,
         connectionType: this.state.connectionType, visibilityPermission: this.state.visibilityPermission };
        axios.post("http://localhost:8080/api/f/b", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, showUpdatedMessage: true, showUpdateButton: false,
                  });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

  handleSubmit1(event) {
    event.preventDefault();
    this.patchFriendship();
  }
  handleSubmit2(event) {
    event.preventDefault();
    this.updateFriendshipConnectionType();
  }
  handleChange3(event) {
    this.setState({connectionType: event.target.value});
  }

  manageUpdate() {
    if (this.props.connectionStatus == "pending") {
        this.setState({isAfriend: false, hasPendingInvitations: true});
     }
    else {
        this.setState({isAfriend: true, hasPendingInvitations: false});
    }
  }

  render() {
    return (
    <React.Fragment>
    <div >

      { this.state.isAfriend &&
      <div>
            <div class="invitationForm">
            <p class="alertsSmallP"> Currently set to: {this.state.currentType}  </p>
            <form id="inviteRadio1">
                <div>
                  <label><input value="Friend" onChange={this.handleChange3} type="radio" name="optradio" /> Friend </label>
                </div>
                <div>
                  <label><input value="Family" onChange={this.handleChange3} type="radio" name="optradio" /> Family </label>
                </div>
                <div>
                  <label><input value="Colleague" onChange={this.handleChange3} type="radio" name="optradio" /> Colleague </label>
                </div>
            </form>
            <p></p>

                { this.state.showUpdatedMessage &&
                <p id="deletedAnswersMessage"> {this.state.updatedMessage} </p> }
                { this.state.showUpdateButton &&
                <button type="submit" onClick={this.handleSubmit2} className="seeDetailsButton"> Update </button> }
            </div>
      </div> }

      { this.state.hasPendingInvitations &&
      <div>
            <div>
                <p> (contact pending)</p>
            </div>
      </div> }

    </div>
    </React.Fragment>
    );
  }
}

export default ManageMyContacts;