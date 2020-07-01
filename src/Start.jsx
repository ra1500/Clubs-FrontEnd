import React from "react";
import AlertsNewContactsList from "./AlertsNewContactsList";
import AlertsNewAuditInviteList from "./AlertsNewAuditInviteList";
import AlertsNewAuditPostedList from "./AlertsNewAuditPostedList";
import { Link } from 'react-router-dom';
import AlertsNewClubInvitations from "./AlertsNewClubInvitations";
import AlertsNewMessagesContacts from "./AlertsNewMessagesContacts";
import AlertsNewMessagesClubs from "./AlertsNewMessagesClubs";
import AlertsNewMessagesGuilds from "./AlertsNewMessagesGuilds";


class Start extends React.Component {
  constructor(props) {
    super(props);
    this.goToNewMessages = this.goToNewMessages.bind(this);
    this.goToNewInvitations = this.goToNewInvitations.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          showNewInvitations: false,
          showNewMessages: true,
        };
  }

    componentDidMount() {
    }

    goToNewMessages() {
    this.setState({showNewMessages: true, showNewInvitations: false, });
    }
    goToNewInvitations() {
    this.setState({showNewMessages: false, showNewInvitations: true, });
    }


  render() {
    return (
    <React.Fragment>

      { this.state.showNewMessages &&
      <div class="settings2ButtonsDiv">
        <button id="newMessagesButtonRed" onClick={this.goToNewMessages}> New Messages </button>
        <button id="newInvitationsButtonBlack" onClick={this.goToNewInvitations}> New Invitations </button>
      </div> }

      { !this.state.showNewMessages &&
      <div class="settings2ButtonsDiv">
        <button id="newMessagesButtonBlack" onClick={this.goToNewMessages}> New Messages </button>
        <button id="newInvitationsButtonRed" onClick={this.goToNewInvitations}> New Invitations </button>
      </div> }


      <div class="topParentDiv">
        <div class="secondParentDiv">

            { this.state.showNewMessages &&
            <div>
            <p class="noLineSpaceP"> Contact Messages New </p>
            <AlertsNewMessagesContacts /><br></br>
            <p class="noLineSpaceP"> Club user's Messages New </p>
            <AlertsNewMessagesClubs /><br></br>
            <p class="noLineSpaceP"> Guild user's Messages New </p>
            <AlertsNewMessagesGuilds /><br></br>
            </div> }

            { this.state.showNewInvitations &&
            <div>
            <p class="noLineSpaceP"> Contact Invitations </p>
            <AlertsNewContactsList /><br></br>
            <p class="noLineSpaceP"> Club Invitations </p>
            <AlertsNewClubInvitations />
            </div> }

        </div>
      </div>

    </React.Fragment>
    );
  }
}

export default Start;