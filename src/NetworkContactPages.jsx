import React from "react";
import axios from 'axios';
import ScoresNetworkContactPages from "./ScoresNetworkContactPages";
import AuditQuestions from "./AuditQuestions";
import ManageMyContacts from "./ManageMyContacts";
import NetworkContactAudit from "./NetworkContactAudit";

class NetworkContactPages extends React.Component {
  constructor(props) {
    super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.goToAudit = this.goToAudit.bind(this);
        this.goToContactSettings = this.goToContactSettings.bind(this);
        this.goToGoodStuff = this.goToGoodStuff.bind(this);
        this.auditMe = this.auditMe.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          friendId: this.props.friendId,
          friend: null,
          connectionType: null,
          connectionStatus: null,
          visibilityPermission: null,
          inviter: null,
          isAfriend: false,
          hasPendingInvitations: false,
          showQuestionSetAuditing: false,
          showAuditQuestions: false,
          showContactScores: false,
          invitationStatusMessage: null,
          showUpdateButton: false,
          isInvitee: false,
          isInviter: false,
          userName: null, // used in determining who is the 'inviter'
        };
  }

    componentDidMount() {
        this.getSingleFriendship();
    }

    getSingleFriendship() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/f/" + this.props.friendId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            inviter: response.data.inviter,
            connectionStatus: response.data.connectionStatus,
            connectionType: response.data.connectionType,
            visibilityPermission: response.data.visibilityPermission,
            friend: response.data.friend,
            friendId: response.data.id,
            userName: u,
          });
        this.isAFriendOrInvitation();
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  isAFriendOrInvitation() {
    if (this.state.connectionStatus == "pending" && this.state.inviter != this.state.userName) {
        this.setState({isAfriend: false, hasPendingInvitations: true, isInvitee: true, isInviter: false, showUpdateButton: true,});
     }
    else if (this.state.connectionStatus == "pending" && this.state.inviter == this.state.userName) {
        this.setState({isAfriend: false, hasPendingInvitations: true, isInvitee: false, isInviter: true ,showUpdateButton: false,});
     }
    else {
        this.setState({isAfriend: true, hasPendingInvitations: false, showContactScores: true,});
    }
  }

    goToContactSettings() {
        this.setState({showQuestionSetAuditing: false, isAfriend: false, hasPendingInvitations: false, showSettings: true, showAuditQuestions: false,});
    }
    goToAudit() {
        this.setState({ showQuestionSetAuditing: true, isAfriend: true, hasPendingInvitations: false, showSettings: false, showContactScores: false, showAuditQuestions: false,});
    }
    goToGoodStuff() {
        this.setState({showQuestionSetAuditing: false, isAfriend: false, showSettings: false, showAuditQuestions: false,});
        this.isAFriendOrInvitation();
    }
    auditMe(event) {
        this.setState({showQuestionSetAuditing: false, showAuditQuestions: true,});
        this.setState({questionSetVersionEntityId: event.target.value});
    }


   handleChange(event) {
     this.setState({connectionStatus: event.target.value});
   }
  handleSubmit(event) {
    this.patchFriendship();
    event.preventDefault();
  }

    // accept/decline friendship // TODO back-end not vetting inviter! fix.
    patchFriendship() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: this.state.friendId, connectionStatus: this.state.connectionStatus, inviter: this.state.inviter,
         connectionType: this.state.connectionType, visibilityPermission: this.state.visibilityPermission };
        axios.post("http://localhost:8080/f/a", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, showUpdateButton: false,
                  });
         if (response.data.connectionStatus == "Connected") { this.setState({invitationStatusMessage: "You are now connected to " + this.state.friend}) }
         if (response.data.connectionStatus == "Declined") { this.setState({invitationStatusMessage: "You have declined to connect to " + this.state.friend}) }
         if (response.data.connectionStatus == "Removed") { this.setState({invitationStatusMessage: "You have removed " + this.state.friend}) }
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }



  render() {
    return (
    <React.Fragment>

        <div id="NetworkSingleContactDiv">
            <span id="singleNetworkContactButtonP"> {this.state.friend} </span>
            <button id="singleNetworkContactButton1" onClick={this.goToContactSettings}> Settings </button>
            <button id="singleNetworkContactButton2" onClick={this.goToAudit}> Audit Them </button>
            <button id="singleNetworkContactButton2" onClick={this.goToGoodStuff}> Good Stuff </button>
        </div>

           { this.state.showSettings &&
           <div class="profilePage">
            <ManageMyContacts connectionStatus={this.state.connectionStatus} visibilityPermission={this.state.visibilityPermission} inviter={this.state.inviter}
                connectionType={this.state.connectionType} friendId={this.state.friendId} friend={this.state.friend} userName={this.state.userName}/>
           </div> }

          { this.state.isAfriend &&
          <div class="profilePage">

                { this.state.showContactScores &&
                <div>
                <p> Good Stuff </p>
                <ScoresNetworkContactPages friendId={this.props.friendId} />
                </div> }

                {this.state.showQuestionSetAuditing &&
                <div>
                  <p> Audit </p>
                  <p> Audit your contacts answers. You can choose and submit different answers and also add comments.
                  Your contact can then review how you scored them and read your coments.
                  (Note that once you have submited your own answer to a question it will be saved and you will not be able to see
                  your contacts original answer again.)</p>
                  <p> The following were selected by {this.state.friend} for you to audit:</p>
                  <NetworkContactAudit auditMe={this.auditMe} friendId={this.state.friendId}/>
                </div> }

                {this.state.showAuditQuestions &&
                <div>
                <AuditQuestions questionSetVersionEntityId={this.state.questionSetVersionEntityId} friend={this.state.friend} friendId={this.state.friendId} goToAudit={this.goToAudit}/>
                </div> }

          </div> }




          { this.state.hasPendingInvitations &&
            <div class="profilePage">

              { this.state.isInvitee &&
                    <div>
                    <p> Invitation </p>
                    <p></p>
                    <div class="invitationForm">
                    <p>{this.state.inviter} has invited you to connect.</p>

                    <form id="inviteRadio1">
                        <div>
                          <label><input value="Connected" onChange={this.handleChange} type="radio" name="optradio" /> Accept </label>
                        </div>
                        <div>
                          <label><input value="Declined" onChange={this.handleChange} type="radio" name="optradio" /> Decline </label>
                        </div>
                        <div>
                          <label><input value="removed" onChange={this.handleChange} type="radio" name="optradio" /> Remove </label>
                        </div>
                    </form>
                    <p></p>

                    { this.state.showUpdateButton &&
                    <button type="submit" onClick={this.handleSubmit} className="inviteAuditButton"> Update </button> }
                    <span id="userName"> {this.state.invitationStatusMessage} </span>
                    <p>New connections can view your profile. You can change this by selecting them in 'Network' and adjusting 'Settings'.</p>
                     </div>
                     </div> }

              { this.state.isInviter &&
                    <div>
                    <p> Invitation </p>
                    <p></p>
                    <div class="invitationForm">
                       <p> Your invitation to connect with {this.state.friend} is pending. </p>
                        </div>
                     </div> }

           </div> }
    </React.Fragment>
    );
  }
}

export default NetworkContactPages;