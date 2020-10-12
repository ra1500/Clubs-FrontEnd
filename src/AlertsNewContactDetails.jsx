import React from "react";
import axios from 'axios';

class AlertsNewContactDetails extends React.Component {
  constructor(props) {
    super(props);
    this.accept = this.accept.bind(this);
    this.decline = this.decline.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          connectionStatus: null,
          connectionType: null,
          inviter: null,
          visibilityPermission: null,
          showUpdateButton: true,
        };
  }

    componentDidMount() {
        this.getSingleFriendship();
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
            title: response.data.title,
            connectionStatus: response.data.connectionStatus,
            connectionType: response.data.connectionType,
            visibilityPermission: response.data.visibilityPermission,
            friend: response.data.friend,
            friendId: response.data.id,
            userName: u,
          });
        this.getFriendProfileText();  // TODO
        this.getProfilePicture();  // TODO
               }).catch(error => {this.setState({ isLoaded: true, error,});
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
           }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
           });
    }

    // accept friendship invitation
    accept() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: this.state.friendId, };
        axios.post("http://localhost:8080/api/f/c", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, showUpdateButton: false,
                  });
         if (response.data.connectionStatus == "Connected") { this.setState({invitationStatusMessage: "You are now connected to " + this.state.friend}) }
         if (response.data.connectionStatus == "OVER LIMIT") { this.setState({invitationStatusMessage: "Sorry, you have reached the maximum number of connections."}) }
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

    // decline friendship invitation
    decline() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: this.state.friendId, };
        axios.post("http://localhost:8080/api/f/d", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, showUpdateButton: false,
                  });
         if (response.data.connectionStatus == "Connected") { this.setState({invitationStatusMessage: "You are now connected to " + this.state.friend}) }
         if (response.data.connectionStatus == "Removed") { this.setState({invitationStatusMessage: "You have declined " + this.state.friend}) }
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }


  render() {
    return (
    <React.Fragment>
      <div class="topParentDiv">

                    <p class="headerP"> Network Invitation Details </p>
                    <img id="profilePic2" src={this.state.profilePicture}></img>
                    <p class="noLineSpaceP"> {this.state.inviter} </p>
                    <p class="noLineSpaceP"> {this.state.connectionType} </p>
                    <p class="noLineSpaceP"> {this.state.title} </p>
                    <p class="noLineSpaceP"> {this.state.blurb} </p>
                    <p class="noLineSpaceP"> {this.state.location} </p>


                    { this.state.showUpdateButton &&
                    <div>
                    <button class="acceptButton" onClick={() => this.accept()}> Accept </button>
                    <button class="declineButton" onClick={() => this.decline()}> Decline </button>
                    </div> }

                    { !this.state.showUpdateButton &&
                    <div>
                    <span id="deletedAnswersMessage"> {this.state.invitationStatusMessage} </span>
                    </div> }

      </div>
    </React.Fragment>
    );
  }
}

export default AlertsNewContactDetails;