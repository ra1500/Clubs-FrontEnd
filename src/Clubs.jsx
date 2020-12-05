import React from "react";
import axios from 'axios';
import ClubText from "./ClubText";
import ClubsList from "./ClubsList";
import ClubMembers from "./ClubMembers";
import MessageBoard from "./MessageBoard";
import ClubVoting from "./ClubVoting";
import ClubInvite from "./ClubInvite";
import ClubQuit from "./ClubQuit";
//import { Link } from 'react-router-dom';
import MessageBoardSingle from "./MessageBoardSingle";
import ClubsEdit from "./ClubsEdit";
import ProfilePictureClubMember from "./ProfilePictureClubMember";
import ProfilePictureClubMemberIndividual from "./ProfilePictureClubMemberIndividual";
import ClubInvitations from "./ClubInvitations";
import AlertsClubDetails from "./AlertsClubDetails";

class Clubs extends React.Component {
  constructor(props) {
    super(props);
    this.goToClubsList = this.goToClubsList.bind(this);
    this.goToClubInvitations = this.goToClubInvitations.bind(this);
    this.goToClubDetails = this.goToClubDetails.bind(this);
    this.goToCreateClub = this.goToCreateClub.bind(this);
    this.renderSingleClub = this.renderSingleClub.bind(this);
    this.showMembers = this.showMembers.bind(this);
    this.showClubMessageBoard = this.showClubMessageBoard.bind(this);
    this.showClubVoting = this.showClubVoting.bind(this);
    this.showClubInvite = this.showClubInvite.bind(this);
    this.showClubQuit = this.showClubQuit.bind(this);
    this.goToSingleClubMember = this.goToSingleClubMember.bind(this);
    this.goToSingleClubMember2 = this.goToSingleClubMember2.bind(this);
    this.goToEditClubs = this.goToEditClubs.bind(this);
    this.hideClubButtons = this.hideClubButtons.bind(this);
    this.state = {
        isLoaded: null,
        list: null,
        membersList: null,
        showClubsList: false,
        showClubsList2: false, // used in 'ClubsList' component if user indeed has clubs (via props)
        showClubInvitations: false,
        clubInvitationId: null,
        showCreateClubs: false,
        showSingleClub: false,
        showClubQuit: false,
        showClubInvite: false,
        clubId: null,
        clubName: 'none',
        clubDescription: 'none',
        maxSize: null,
        currentSize: null,
        clubBeta: null,
        betaCount: null,
        clubAlpha: 'none',
        showMembersList: false,
        showMembersList2: true,
        showMembersListMenuSelection: false,
        showClubMessageBoard: true,
        showClubVoting: false,
        showClubDetails: false,
        showSingleClubMember: false,
        memberUserName: null,
        singleClubMemberId: null,
        showEditClubs: false,
        showEditClubs2: false,
        onClubs: true,
        onEdit: false,
        onInvitations: false,
        onStart: false,
        onMessageBoard: false,
        showClubQuitButtons: true,
        showTitle: false,
        showBlurb: false,
        showLocation: false,
        showContactDetails: false,
        showRelationshipStatus: false,
        };
    };

  componentDidMount() {
    this.getClubsList();
  }

    getClubsList() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/user/pa",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
         if (response.status === 200) {
          this.setState({
            isLoaded: true,
            list: response.data.clubsList,
            //showClubsList2: true,
            showClubsList: true,
          });
          if ( response.data.clubsList.length > 0 ) { this.setState({ showClubsList2: true}) };
          if ( response.data.clubsList.length == 0 ) { this.setState({ showClubsList2: false}) };
          } // end if
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  renderSingleClub(e) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/c/a?cId=" + e.target.value,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
         if (response.status === 200) {
          this.setState({
            isLoaded: true,
            clubId: response.data.id,
            clubName: response.data.clubName,
            clubDescription: response.data.description,
            currentSize: response.data.currentSize,
            clubAlpha: response.data.alpha,
            maxSize: response.data.maxSize,
            membersList: response.data.members,
            showClubsList: false,
            showSingleClub: true,
            onMessageBoard: true,
            showClubMessageBoard: true,
            showClubQuitButtons: true,
          });
          this.getBeta();
          } // end if
          else { this.setState({showClubsList: false}); }
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  goToSingleClubMember(e) {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u +':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    axios.get("http://localhost:8080/api/user/pu?mid=" + e.target.value + "&cid=" + this.state.clubId,
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
      this.setState({
        isLoaded: true,
        memberUserName: response.data.userName,
        title: response.data.title,
        blurb: response.data.blurb,
        education: response.data.education,
        occupation: response.data.occupation,
        relationshipStatus: response.data.relationshipStatus,
        location: response.data.location,
        contactInfo: response.data.contactInfo,
        singleClubMemberId: response.data.id,
      });
      if (response.data.education === 1) {this.setState({education2: "High School"})};
      if (response.data.education === 2) {this.setState({education2: "College"})};
      if (response.data.education === 3) {this.setState({education2: "Masters"})};
      if (response.data.education === 4) {this.setState({education2: "Phd or MD"})};
      if (response.data.education === 5) {this.setState({education2: "Irrelevant"})};
      if (response.data.relationshipStatus === 1) {this.setState({relationshipStatus2: "Available"})};
      if (response.data.relationshipStatus === 2) {this.setState({relationshipStatus2: "Not Available"})};
      if (response.data.relationshipStatus === 3) {this.setState({relationshipStatus2: "whatever"})};
      if (response.data.relationshipStatus === 4) {this.setState({relationshipStatus2: ""  })};
      if (response.data.title != null && response.data.title != "" ) {this.setState({showTitle: true,})};
      if (response.data.blurb != null && response.data.blurb != "" ) {this.setState({showBlurb: true,})};
      if (response.data.location != null && response.data.location != "" ) {this.setState({showLocation: true,})};
      if (response.data.contactInfo != null && response.data.contactInfo != "" ) {this.setState({showContactDetails: true,})};
      this.setState({showMembersList: false, showSingleClubMember: true});
           }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
           });
    }

  goToSingleClubMember2(memberIdvalue, clubIdvalue) {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u +':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    axios.get("http://localhost:8080/api/user/pu?mid=" + memberIdvalue + "&cid=" + clubIdvalue,
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
      this.setState({
        isLoaded: true,
        memberUserName: response.data.userName,
        title: response.data.title,
        blurb: response.data.blurb,
        education: response.data.education,
        occupation: response.data.occupation,
        relationshipStatus: response.data.relationshipStatus,
        location: response.data.location,
        contactInfo: response.data.contactInfo,
        singleClubMemberId: response.data.id,
      });
      if (response.data.education === 1) {this.setState({education2: "High School"})};
      if (response.data.education === 2) {this.setState({education2: "College"})};
      if (response.data.education === 3) {this.setState({education2: "Masters"})};
      if (response.data.education === 4) {this.setState({education2: "Phd or MD"})};
      if (response.data.education === 5) {this.setState({education2: "Irrelevant"})};
      if (response.data.relationshipStatus === 1) {this.setState({relationshipStatus2: "Available"})};
      if (response.data.relationshipStatus === 2) {this.setState({relationshipStatus2: "Not Available"})};
      if (response.data.relationshipStatus === 3) {this.setState({relationshipStatus2: "whatever"})};
      if (response.data.relationshipStatus === 4) {this.setState({relationshipStatus2: ""  })};
      if (response.data.title != null && response.data.title != "" ) {this.setState({showTitle: true,})};
      if (response.data.blurb != null && response.data.blurb != "" ) {this.setState({showBlurb: true,})};
      if (response.data.location != null && response.data.location != "" ) {this.setState({showLocation: true,})};
      if (response.data.contactInfo != null && response.data.contactInfo != "" ) {this.setState({showContactDetails: true,})};
      this.setState({showMembersList: false, showSingleClubMember: true});
           }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
           });
    }

    getBeta() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/v/c?cId=" + this.state.clubId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
         if (response.status === 200) {
          this.setState({
            isLoaded: true,
            clubBeta: response.data.voteCast,
            betaCount: response.data.countVotesCast,
          });
          } // end if
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  goToClubsList() {
          this.setState({showCreateClubs: false, showSingleClub: false, showMembersList: false, showMembersListMenuSelection: false, showClubMessageBoard: false, showClubInvite: false, showClubVoting: false, showSingleClubMember: false, showEditClubs: false, showEditClubs2: false, showClubInvitations: false, showClubDetails: false, showClubQuit: false});
          this.setState({ onClubs: true, onInvitations: false, onEdit: false, onStart: false });
          this.getClubsList();
    }
  goToClubInvitations() {
          this.setState({showCreateClubs: false, showSingleClub: false, showMembersList: false, showMembersListMenuSelection: false, showClubMessageBoard: false, showClubInvite: false, showClubVoting: false, showSingleClubMember: false, showEditClubs: false, showEditClubs2: false, showClubInvitations: true, showClubsList: false, showClubDetails: false, showClubQuit: false});
          this.setState({ onClubs: false, onInvitations: true, onEdit: false, onStart: false });
    }
  goToClubDetails(e) {
          this.setState({ clubInvitationId: e.target.value });
          this.setState({showCreateClubs: false, showSingleClub: false, showMembersList: false, showMembersListMenuSelection: false, showClubMessageBoard: false, showClubInvite: false, showClubVoting: false, showSingleClubMember: false, showEditClubs: false, showEditClubs2: false, showClubInvitations: false, showClubsList: false, showClubDetails: true, showClubQuit: false});
    }
  goToCreateClub() {
          this.setState({showCreateClubs: true, showClubsList: false, showSingleClub: false, showMembersList: false, showMembersListMenuSelection: false, showClubInvite: false, showClubVoting: false, showSingleClubMember: false, showEditClubs: false, showEditClubs2: false, showClubInvitations: false, showClubDetails: false, showClubQuit: false});
          this.setState({ onClubs: false, onInvitations: false, onEdit: false, onStart: true });
    }
  goToEditClubs() {
          this.setState({showCreateClubs: false, showClubsList: false, showSingleClub: false, showMembersList: false, showMembersListMenuSelection: false, showClubInvite: false, showClubVoting: false, showSingleClubMember: false, showEditClubs: !this.state.showEditClubs, showEditClubs2: this.state.showEditClubs, showClubInvitations: false, showClubDetails: false, showClubQuit: false});
          this.setState({ onClubs: false, onInvitations: false, onEdit: true, onStart: false });
    }
    showMembers() {
           this.setState({showMembersList: true, showMembersListMenuSelection: true, showClubMessageBoard: false, showClubInvite: false, showClubVoting: false, showSingleClubMember: false, showEditClubs: false, showEditClubs2: false, showClubInvitations: false, showClubDetails: false, showClubQuit: false});
           this.setState({ onMessageBoard: false });
           this.setState({ showTitle: false, showBlurb: false, showLocation: false, showContactDetails: false, showRelationshipStatus: false,  });
    }
    showClubMessageBoard() {
           this.setState({showMembersList: false, showMembersListMenuSelection: false, showClubMessageBoard: !this.state.showClubMessageBoard, showClubInvite: false, showClubVoting: false, showSingleClubMember: false, showEditClubs: false, showEditClubs2: false, showClubInvitations: false, showClubDetails: false, showClubQuit: false});
           this.setState({ onMessageBoard: true });
    }
    showClubVoting() {
           this.setState({showMembersList: false, showMembersListMenuSelection: false, showClubMessageBoard: false, showClubInvite: false, showClubVoting: true, showSingleClubMember: false, showEditClubs: false, showEditClubs2: false, showClubInvitations: false, showClubDetails: false, showClubQuit: false});
           this.setState({ onMessageBoard: false });
    }
    showClubInvite() {
           this.setState({showMembersList: false, showMembersListMenuSelection: false, showClubMessageBoard: false, showClubInvite: true, showClubVoting: false, showSingleClubMember: false, showEditClubs: false, showEditClubs2: false, showClubInvitations: false, showClubDetails: false, showClubQuit: false});
           this.setState({ onMessageBoard: false });
    }
    showClubQuit() {
           this.setState({showMembersList: false, showMembersListMenuSelection: false, showClubMessageBoard: false, showClubInvite: false, showClubVoting: false, showSingleClubMember: false, showEditClubs: false, showEditClubs2: false, showClubInvitations: false, showClubDetails: false, showClubQuit: true});
           this.setState({ onMessageBoard: false });
    }
    hideClubButtons() {
        this.setState({ showClubQuitButtons: false });
    }

   render() {
    return (
        <React.Fragment>

            { this.state.onClubs &&
              <div class="settings2ButtonsDiv">
                <button id="myClubsButtonOn" onClick={this.goToClubsList}> My Clubs </button>
                <button id="myClubsButton" onClick={this.goToClubInvitations}> Club Invitations </button>
                <button id="myClubsButton" onClick={this.goToEditClubs}> Edit Clubs </button>
                <button id="myClubsButton" onClick={this.goToCreateClub}> Start a Club </button>
              </div> }

            { this.state.onInvitations &&
              <div class="settings2ButtonsDiv">
                <button id="myClubsButton" onClick={this.goToClubsList}> My Clubs </button>
                <button id="myClubsButtonOn" onClick={this.goToClubInvitations}> Club Invitations </button>
                <button id="myClubsButton" onClick={this.goToEditClubs}> Edit Clubs </button>
                <button id="myClubsButton" onClick={this.goToCreateClub}> Start a Club </button>
              </div> }

            { this.state.onEdit &&
              <div class="settings2ButtonsDiv">
                <button id="myClubsButton" onClick={this.goToClubsList}> My Clubs </button>
                <button id="myClubsButton" onClick={this.goToClubInvitations}> Club Invitations </button>
                <button id="myClubsButtonOn" onClick={this.goToEditClubs}> Edit Clubs </button>
                <button id="myClubsButton" onClick={this.goToCreateClub}> Start a Club </button>
              </div> }

            { this.state.onStart &&
              <div class="settings2ButtonsDiv">
                <button id="myClubsButton" onClick={this.goToClubsList}> My Clubs </button>
                <button id="myClubsButton" onClick={this.goToClubInvitations}> Club Invitations </button>
                <button id="myClubsButton" onClick={this.goToEditClubs}> Edit Clubs </button>
                <button id="myClubsButtonOn" onClick={this.goToCreateClub}> Start a Club </button>
              </div> }

        <div class="topParentDiv">

        { this.state.showClubsList &&
        <div>
        <ClubsList list={this.state.list} showClubsList2={this.state.showClubsList2} renderSingleClub={this.renderSingleClub} />
        </div> }

        { this.state.showClubInvitations &&
        <div>
        <ClubInvitations goToClubDetails={this.goToClubDetails} />
        </div> }

        { this.state.showClubDetails &&
        <div>
        <AlertsClubDetails clubInvitationId={this.state.clubInvitationId}/>
        </div> }

        { this.state.showEditClubs &&
        <div>
        <ClubsEdit />
        </div> }

        { this.state.showEditClubs2 &&
        <div>
        <ClubsEdit />
        </div> }

        { this.state.showCreateClubs &&
        <div>
        <p> Start a New Club </p>
        <ClubText />
        </div> }

        { this.state.showSingleClub &&
        <div>
        <div class="topParentDiv">
        <table>
            <tr><td>Club:</td><td class="clubTD"> {this.state.clubName} </td></tr>
            <tr><td>Description:</td><td class="clubTD"> {this.state.clubDescription} </td></tr>
            <tr><td>Club alpha:</td><td class="clubTD"> {this.state.clubAlpha} </td></tr>
            <tr><td>Max. size:</td><td class="clubTD"> {this.state.maxSize} </td></tr>
            <tr><td>Current size:</td><td class="clubTD"> {this.state.currentSize} </td></tr>
            <tr><td>Club beta:</td><td class="clubTD"> {this.state.clubBeta} </td></tr>
            <tr><td>Beta vote count:</td><td class="clubTD"> {this.state.betaCount} </td></tr>
        </table>
        </div>
                      { this.state.onMessageBoard &&
                      <div class="secondLevelDiv">
                        <button id="myClubsButtonOn" onClick={this.showClubMessageBoard}> Message Board </button>
                        <button id="myClubsButton" onClick={this.showMembers}> Members </button>
                        <button id="myClubsButton" onClick={this.showClubVoting}> Voting </button>
                        <button id="myClubsButton" onClick={this.showClubInvite}> Invite </button>
                        <button id="myClubsButton" onClick={this.showClubQuit}> Quit </button>
                      </div> }

                      { this.state.showMembersListMenuSelection &&
                      <div class="secondLevelDiv">
                        <button id="myClubsButton" onClick={this.showClubMessageBoard}> Message Board </button>
                        <button id="myClubsButtonOn" onClick={this.showMembers}> Members </button>
                        <button id="myClubsButton" onClick={this.showClubVoting}> Voting </button>
                        <button id="myClubsButton" onClick={this.showClubInvite}> Invite </button>
                        <button id="myClubsButton" onClick={this.showClubQuit}> Quit </button>
                      </div> }

                      { this.state.showClubVoting &&
                      <div class="secondLevelDiv">
                        <button id="myClubsButton" onClick={this.showClubMessageBoard}> Message Board </button>
                        <button id="myClubsButton" onClick={this.showMembers}> Members </button>
                        <button id="myClubsButtonOn" onClick={this.showClubVoting}> Voting </button>
                        <button id="myClubsButton" onClick={this.showClubInvite}> Invite </button>
                        <button id="myClubsButton" onClick={this.showClubQuit}> Quit </button>
                      </div> }

                      { this.state.showClubInvite &&
                      <div class="secondLevelDiv">
                        <button id="myClubsButton" onClick={this.showClubMessageBoard}> Message Board </button>
                        <button id="myClubsButton" onClick={this.showMembers}> Members </button>
                        <button id="myClubsButton" onClick={this.showClubVoting}> Voting </button>
                        <button id="myClubsButtonOn" onClick={this.showClubInvite}> Invite </button>
                        <button id="myClubsButton" onClick={this.showClubQuit}> Quit </button>
                      </div> }

                      { this.state.showClubQuit &&
                      <div class="secondLevelDiv">
                        { this.state.showClubQuitButtons &&
                        <div>
                        <button id="myClubsButton" onClick={this.showClubMessageBoard}> Message Board </button>
                        <button id="myClubsButton" onClick={this.showMembers}> Members </button>
                        <button id="myClubsButton" onClick={this.showClubVoting}> Voting </button>
                        <button id="myClubsButton" onClick={this.showClubInvite}> Invite </button>
                        <button id="myClubsButtonOn" onClick={this.showClubQuit}> Quit </button>
                        </div> }
                      </div> }

            { this.state.showMembersList &&
            <div>
             <ClubMembers membersList={this.state.membersList} showMembersList2={this.state.showMembersList2} goToSingleClubMember={this.goToSingleClubMember} goToSingleClubMember2={this.goToSingleClubMember2} clubId={this.state.clubId} />
            </div> }

            { this.state.showClubMessageBoard &&
            <div>
             <MessageBoard clubId={this.state.clubId} clubName={this.state.clubName} />
            </div> }

            { this.state.showClubVoting &&
            <div>
             <ClubVoting clubId={this.state.clubId} clubAlpha={this.state.clubAlpha} clubName={this.state.clubName} />
            </div> }

            { this.state.showClubInvite &&
            <div>
                <ClubInvite clubId={this.state.clubId}/>
            </div> }

            { this.state.showClubQuit &&
            <div>
                <ClubQuit clubId={this.state.clubId} hideClubButtons={this.hideClubButtons}/>
            </div> }

          { this.state.showSingleClubMember &&
          <div class="topParentDiv">
                <ProfilePictureClubMemberIndividual memberId={this.state.singleClubMemberId} clubId={this.state.clubId}/>
                <div class="scoresListTD">
                <div>
                <p class="secondP"> {this.state.memberUserName} </p><br></br>
                { this.state.showTitle &&
                <p class="secondP"> Title: {this.state.title}</p> }
                { !this.state.showTitle &&
                <p class="secondP"> </p> }
                </div>
                <div>
                { this.state.showBlurb &&
                <p class="secondP"> About me: {this.state.blurb}</p> }
                { !this.state.showBlurb &&
                <p class="secondP"> </p> }
                </div>
                <div>
                { this.state.showLocation &&
                <p class="secondP"> Location: {this.state.location}</p> }
                { !this.state.showLocation &&
                <p class="secondP"> </p> }
                </div>
                <div>
                { this.state.showContactDetails &&
                <p class="secondP"> Contact Info: {this.state.contactInfo}</p> }
                { !this.state.showContactDetails &&
                <p class="secondP"> </p> }
                </div>
                <div>
                { this.state.showRelationshipStatus &&
                <p class="secondP"> Relationship status: {this.state.relationshipStatus2}</p> }
                { !this.state.showRelationshipStatus &&
                <p class="secondP"> </p> }
                </div>
                </div>
                <MessageBoardSingle singleClubMemberId={this.state.singleClubMemberId} clubName={this.state.clubName}/>
                </div> }



        </div> }

        </div>

        </React.Fragment>
    ); // end return
   }
}

export default Clubs;