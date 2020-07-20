import React from "react";
import AlertsNewContactsList from "./AlertsNewContactsList";
import AlertsNewAuditInviteList from "./AlertsNewAuditInviteList";
import AlertsNewAuditPostedList from "./AlertsNewAuditPostedList";
import { Link } from 'react-router-dom';
import AlertsNewClubInvitations from "./AlertsNewClubInvitations";
import AlertsNewMessagesContacts from "./AlertsNewMessagesContacts";
import AlertsNewMessagesClubs from "./AlertsNewMessagesClubs";
import AlertsNewMessagesGuilds from "./AlertsNewMessagesGuilds";
import AlertsNewContactDetails from "./AlertsNewContactDetails";
import AlertsClubDetails from "./AlertsClubDetails";
import TitleBar2 from "./TitleBar2";

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.goToNewMessages = this.goToNewMessages.bind(this);
    this.goToNewInvitations = this.goToNewInvitations.bind(this);
    this.goToContactDetails = this.goToContactDetails.bind(this);
    this.goToClubDetails = this.goToClubDetails.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          showNewInvitations: false,
          showNewMessages: true,
          showAlertsNewContactDetails: false,
          friendId: null,
          showAlertsClubDetails: false,
        };
  }

    componentDidMount() {
    }

    goToNewMessages() {
    this.setState({showNewMessages: true, showNewInvitations: false, showAlertsNewContactDetails: false, showAlertsClubDetails: false });
    }
    goToNewInvitations() {
    this.setState({showNewMessages: false, showNewInvitations: true, showAlertsNewContactDetails: false, showAlertsClubDetails: false});
    }
    goToContactDetails(e) {
        this.setState({showNewMessages: false, showNewInvitations: false, showAlertsNewContactDetails: true, friendId: e.target.value, showAlertsClubDetails: false});
    }
    goToClubDetails(e) {
        this.setState({showNewMessages: false, showNewInvitations: false, showAlertsNewContactDetails: false, clubInvitationId: e.target.value, showAlertsClubDetails: true});
    }

  render() {
    return (
    <React.Fragment>

      <TitleBar2 />

      { this.state.showNewMessages &&
      <div class="settings2ButtonsDiv">
        <button id="newMessagesButtonRed" onClick={this.goToNewMessages}> New Messages </button>
        <button id="newInvitationsButtonBlack" onClick={this.goToNewInvitations}> Invitations </button>
      </div> }

      { !this.state.showNewMessages &&
      <div class="settings2ButtonsDiv">
        <button id="newMessagesButtonBlack" onClick={this.goToNewMessages}> New Messages </button>
        <button id="newInvitationsButtonRed" onClick={this.goToNewInvitations}> Invitations </button>
      </div> }


      <div class="topParentDiv">
        <div class="secondParentDiv">

            { this.state.showNewMessages &&
            <div>
            <p class="headerP"> Network - You have unread messages from </p>
            <AlertsNewMessagesContacts /><br></br>
            <p class="headerP"> Clubs - You have unread messages from </p>
            <AlertsNewMessagesClubs /><br></br>
            </div> }

            { this.state.showNewInvitations &&
            <div>
            <p class="headerP"> Network Invitations </p>
            <AlertsNewContactsList goToContactDetails={this.goToContactDetails}/><br></br>
            <p class="headerP"> Club Invitations </p>
            <AlertsNewClubInvitations goToClubDetails={this.goToClubDetails}/>
            </div> }

            { this.state.showAlertsNewContactDetails &&
            <div>
            <AlertsNewContactDetails friendId={this.state.friendId}/>
            </div> }

            { this.state.showAlertsClubDetails &&
            <div>
            <AlertsClubDetails clubInvitationId={this.state.clubInvitationId}/>
            </div> }

        </div>
      </div>

    </React.Fragment>
    );
  }
}

export default Start;