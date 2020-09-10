import React from "react";
import axios from 'axios';
import ManageMyContacts from "./ManageMyContacts";
import ManageMyContactsRemove from "./ManageMyContactsRemove";
import FriendsContactsList from "./FriendsContactsList";
import MessageBoardFriend from "./MessageBoardFriend";

class NetworkContactPages extends React.Component {
  constructor(props) {
    super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.goToContactSettings = this.goToContactSettings.bind(this);
        this.goToContactRemove = this.goToContactRemove.bind(this);
        this.goToGoodStuff = this.goToGoodStuff.bind(this);
        this.goToContactsList = this.goToContactsList.bind(this);
        this.goToNetworkListDetails = this.goToNetworkListDetails.bind(this);
        this.inviteToJoinMyNetwork = this.inviteToJoinMyNetwork.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          profilePicture: "./profiledefault.jpg",
          friendId: this.props.friendId,
          friend: null,
          connectionType: null,
          connectionStatus: null,
          visibilityPermission: null,
          inviter: null,
          isAfriend: false,
          hasPendingInvitations: false,
          invitationStatusMessage: null,
          showUpdateButton: false,
          isInvitee: false,
          isInviter: false,
          userName: null, // used in determining who is the 'inviter'
          title: null,
          blurb: null,
          education2: null,
          occupation: null,
          relationshipStatus2: null,
          location: null,
          contactInfo: null,
          showFriendsContactsList: false,
          showInvite: false,
          showNetworkListDetails: false,
          showNetworkListNone: true,
          showRemove: false,
          list: null,
          invitedFriend: null,
          onProfile: true,
          showTitle: false,
          showBlurb: false,
          showLocation: false,
          showContactDetails: false,
          showRelationshipStatus: false,
        };
  }

    componentDidMount() {
        //this.setState({friendId: this.props.friendId});
        this.getSingleFriendship();
        this.getProfilePicture();
        this.getFriendProfileText();
    }

    getSingleFriendship() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/f/" + this.props.friendId,
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
        this.setState({showQuestionSetAuditing: false, isAfriend: false, hasPendingInvitations: false, showSettings: true, showRemove: false, showAuditQuestions: false, showFriendsContactsList: false});
        this.setState({onProfile: false});
    }
    goToContactRemove() {
        this.setState({showQuestionSetAuditing: false, isAfriend: false, hasPendingInvitations: false, showSettings: false, showRemove: true, showAuditQuestions: false, showFriendsContactsList: false});
        this.setState({onProfile: false});
    }
    goToContactsList() {
        this.getFriendships();
        this.setState({showQuestionSetAuditing: false, isAfriend: false, hasPendingInvitations: false, showSettings: false, showRemove: false, showContactScores: false, showAuditQuestions: false, showFriendsContactsList: true,});
        this.setState({onProfile: false});
    }
    goToGoodStuff() {
        this.setState({showQuestionSetAuditing: false, isAfriend: false, showSettings: false, showRemove: false, showAuditQuestions: false, showFriendsContactsList: false});
        this.setState({onProfile: true});
        this.isAFriendOrInvitation();
    }

   handleChange(event) {
     this.setState({connectionStatus: event.target.value});
   }
  handleSubmit(event) {
    this.patchFriendship();
    event.preventDefault();
  }

    goToNetworkListDetails() {
        this.setState({showInvite: false, showNetworkListDetails: true, showNetworkListNone: false,});
    }
    inviteToJoinMyNetwork(event) {
        this.setState({showInvite: true, showNetworkListDetails: false, showNetworkListNone: false,});
        const data = {friend: event.target.value};
        this.state = {invitedFriend: data.friend};
        this.setState({invitedFriend: this.state.invitedFriend}); // sillyness.
        //this.setState({invitedFriend: e});
    }

    // accept/decline friendship
    patchFriendship() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: this.state.friendId, connectionStatus: this.state.connectionStatus, inviter: this.state.inviter,
         connectionType: this.state.connectionType, visibilityPermission: this.state.visibilityPermission };
        axios.post("http://localhost:8080/api/f/a", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, showUpdateButton: false,
                  });
         if (response.data.connectionStatus == "Connected") { this.setState({invitationStatusMessage: "You are now connected to " + this.state.friend}) }
         if (response.data.connectionStatus == "OVER LIMIT") { this.setState({invitationStatusMessage: "Sorry, you have reached the maximum number of connections."}) }
         if (response.data.connectionStatus == "Removed") { this.setState({invitationStatusMessage: "You have removed " + this.state.friend}) }
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

  getProfilePicture() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u +':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    axios({
      method: 'get',
      url: "http://localhost:8080/api/files/i?fid=" + this.props.friendId,
      responseType: 'blob',
      headers : { 'Authorization' : Basic },
    })
    .then((response) => {
        const file = new Blob([response.data], {type:'image/jpg'});
        const imgUrl = window.URL.createObjectURL(file);
      this.setState({
        isLoaded: true,
        profilePicture: imgUrl,
      });
           }).catch(error => {this.setState({ isLoaded: true, error, });
           });
    }

  getFriendProfileText() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u +':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    axios.get("http://localhost:8080/api/user/ps?fid=" + this.props.friendId,
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
      this.setState({
        isLoaded: true,
        title: response.data.title,
        blurb: response.data.blurb,
        education: response.data.education,
        occupation: response.data.occupation,
        relationshipStatus: response.data.relationshipStatus,
        location: response.data.location,
        contactInfo: response.data.contactInfo,
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
           }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
           });
    }

    getFriendships() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/user/t?fid=" + this.props.friendId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
         if (response.status === 200) {
          this.setState({
            isLoaded: true,
            list: response.data.friendsList,
          });
          this.goToNetworkListDetails();
          } // end if
               }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
               });
    }

  render() {
    return (
    <React.Fragment>

        <div class="topParentDiv">

            { this.state.onProfile &&
            <div>
            <button id="myNetworkButtonOn" onClick={this.goToGoodStuff}> Profile </button>
            <button id="myNetworkButton" onClick={this.goToContactsList}> Contacts </button>
            <button id="myNetworkButton" onClick={this.goToContactSettings}> Settings </button>
            <button id="myNetworkButton" onClick={this.goToContactRemove}> Remove </button>
            </div> }

            { this.state.showFriendsContactsList &&
            <div>
            <button id="myNetworkButton" onClick={this.goToGoodStuff}> Profile </button>
            <button id="myNetworkButtonOn" onClick={this.goToContactsList}> Contacts </button>
            <button id="myNetworkButton" onClick={this.goToContactSettings}> Settings </button>
            <button id="myNetworkButton" onClick={this.goToContactRemove}> Remove </button>
            </div> }

            { this.state.showSettings &&
            <div>
            <button id="myNetworkButton" onClick={this.goToGoodStuff}> Profile </button>
            <button id="myNetworkButton" onClick={this.goToContactsList}> Contacts </button>
            <button id="myNetworkButtonOn" onClick={this.goToContactSettings}> Settings </button>
            <button id="myNetworkButton" onClick={this.goToContactRemove}> Remove </button>
            </div> }

            { this.state.showRemove &&
            <div>
            <button id="myNetworkButton" onClick={this.goToGoodStuff}> Profile </button>
            <button id="myNetworkButton" onClick={this.goToContactsList}> Contacts </button>
            <button id="myNetworkButton" onClick={this.goToContactSettings}> Settings </button>
            <button id="myNetworkButtonOn" onClick={this.goToContactRemove}> Remove </button>
            </div> }

            <table>
                <tr >
                    <td class="alertsUserNameTD"> {this.state.friend} </td>
                    <td> {this.state.connectionType} </td>
                 </tr>
            </table>
        </div>

           { this.state.showSettings &&
           <div class="topParentDiv">
            <ManageMyContacts connectionStatus={this.state.connectionStatus} visibilityPermission={this.state.visibilityPermission} inviter={this.state.inviter}
                connectionType={this.state.connectionType} friendId={this.state.friendId} friend={this.state.friend} userName={this.state.userName}/>
           </div> }
           { this.state.showRemove &&
           <div class="topParentDiv">
            <ManageMyContactsRemove connectionStatus={this.state.connectionStatus} visibilityPermission={this.state.visibilityPermission} inviter={this.state.inviter}
                connectionType={this.state.connectionType} friendId={this.state.friendId} friend={this.state.friend} userName={this.state.userName}/>
           </div> }
           { this.state.showFriendsContactsList &&
           <div>
            <FriendsContactsList connectionStatus={this.state.connectionStatus} showInvite={this.state.showInvite} inviteToJoinMyNetwork={this.inviteToJoinMyNetwork} showNetworkListDetails={this.state.showNetworkListDetails} goToNetworkListDetails={this.goToNetworkListDetails}showNetworkListNone={this.state.showNetworkListNone} list={this.state.list} invitedFriend={this.state.invitedFriend}/>
           </div> }


          { this.state.isAfriend &&
          <div class="topParentDiv">
                { this.state.showContactScores &&
                <img id="profilePic" src={this.state.profilePicture}></img> }
                <div class="scoresListTD">
                <div>
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

                <MessageBoardFriend friendshipsEntityId={this.state.friendId}/>

          </div> }


          { this.state.hasPendingInvitations &&
            <div class="topParentDiv">

              { this.state.isInvitee &&
                    <div class="secondParentDiv">
                    <p>{this.state.inviter} {this.state.connectionType} has invited you to their network.</p>

                    <form id="inviteRadio1">
                        <div>
                          <label><input value="Connected" onChange={this.handleChange} type="radio" name="optradio" /> Accept </label>
                        </div>
                        <div>
                          <label><input value="removed" onChange={this.handleChange} type="radio" name="optradio" /> Decline </label>
                        </div>
                    </form>
                    <p></p>

                    { this.state.showUpdateButton &&
                    <button type="submit" onClick={this.handleSubmit} className="seeDetailsButton"> Update </button> }
                    <span id="deletedAnswersMessage"> {this.state.invitationStatusMessage} </span>
                    <p>  </p>
                     </div> }

              { this.state.isInviter &&
                    <div class="secondParentDiv">
                       <p> Your invitation to connect with {this.state.friend} is pending. </p>
                    </div> }

           </div> }
    </React.Fragment>
    );
  }
}

export default NetworkContactPages;