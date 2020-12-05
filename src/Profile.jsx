import React from "react";
import axios from 'axios';
import ScoreUrl from "./ScoreUrl";
import UpdateUserInfo from "./UpdateUserInfo";
import Picture from "./Picture";
import ProfileText from "./ProfileText";
//import { Link } from 'react-router-dom';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.goToUserSettings = this.goToUserSettings.bind(this);
    this.goToPrivateProfile = this.goToPrivateProfile.bind(this);
    this.goToProfileSettings = this.goToProfileSettings.bind(this);
    this.deleteProfilePicture = this.deleteProfilePicture.bind(this);
    this.getProfilePicture = this.getProfilePicture.bind(this);
    this.state = {
        isLoaded: null,
        showProfile: true,
        title: null,
        description: null,
        showSettingsSection: false,
        userName: JSON.parse(sessionStorage.getItem('tokens')).userName, // used in header only
        profilePicture: "./profiledefault.jpg",
        profileTitle: null,
        profileBlurb: null,
        profileEducation: null,
        profileOccupation: null,
        profileRelationshipStatus: null,
        profileLocation: null,
        profileContactInfo: null,
        education2: null,
        relationshipStatus2: null,
        showProfileSettings: false,
        onProfile: true,
        onEdit: false,
        onSettings: false,
        showTitle: false,
        showBlurb: false,
        showLocation: false,
        showContactDetails: false,
        showRelationshipStatus: false,
        };
    };

  componentDidMount() {
    this.getProfilePicture();
    this.getProfileText();
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
      url: "http://localhost:8080/api/files/f?fnm=1",
      responseType: 'blob',
      headers : { 'Authorization' : Basic },
    })
    .then((response) => {
        const file = new Blob([response.data], {type:'image/jpg'});
        const imgUrl = window.URL.createObjectURL(file);
      this.setState({
        isLoaded: true,
        profilePicture: imgUrl,
        //showPicture: true,
      });
           }).catch(error => {this.setState({ isLoaded: true, error, });
           });
    }

  deleteProfilePicture() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u +':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    axios({
      method: 'post',
      url: "http://localhost:8080/api/files/h?fnm=1",
      headers : { 'Authorization' : Basic },
    })
    .then((response) => {
      this.setState({
        isLoaded: true,
      });
      this.getProfilePicture();
           }).catch(error => {this.setState({ isLoaded: true, error, });
           });
    }

  getProfileText() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u +':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    axios.get("http://localhost:8080/api/user/pr",
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
      this.setState({
        isLoaded: true,
        profileTitle: response.data.title,
        profileBlurb: response.data.blurb,
        profileEducation: response.data.education,
        profileOccupation: response.data.occupation,
        profileRelationshipStatus: response.data.relationshipStatus,
        profileLocation: response.data.location,
        profileContactInfo: response.data.contactInfo,
      });
      if (response.data.education === 1) {this.setState({education2: "High School"})};
      if (response.data.education === 2) {this.setState({education2: "College"})};
      if (response.data.education === 3) {this.setState({education2: "Masters"})};
      if (response.data.education === 4) {this.setState({education2: "Phd or MD"})};
      if (response.data.education === 5) {this.setState({education2: "Irrelevant"})};
      if (response.data.relationshipStatus === 1) {this.setState({showRelationshipStatus: true, relationshipStatus2: "Available"})};
      if (response.data.relationshipStatus === 2) {this.setState({showRelationshipStatus: true, relationshipStatus2: "Not Available"})};
      if (response.data.relationshipStatus === 3) {this.setState({showRelationshipStatus: true, relationshipStatus2: "whatever"})};
      if (response.data.relationshipStatus === 4) {this.setState({relationshipStatus2: ""  })};
      if (response.data.title != null && response.data.title != "" ) {this.setState({showTitle: true,})};
      if (response.data.blurb != null && response.data.blurb != "" ) {this.setState({showBlurb: true,})};
      if (response.data.location != null && response.data.location != "" ) {this.setState({showLocation: true,})};
      if (response.data.contactInfo != null && response.data.contactInfo != "" ) {this.setState({showContactDetails: true,})};
           }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
           });
    }

    goToUserSettings() {
        this.setState({showSettingsSection: true, showProfile: false, showProfileSettings: false});
        this.setState({onProfile: false, onEdit: true, onSettings: false});
    }
    goToPrivateProfile() {
        this.getProfileText();
        this.setState({showSettingsSection: false, showProfile: true, showProfileSettings: false});
        this.setState({onProfile: true, onEdit: false, onSettings: false});
    }
    goToProfileSettings() {
        this.setState({showSettingsSection: false, showProfile: false, showProfileSettings: true});
        this.setState({onProfile: false, onEdit: false, onSettings: true});
    }



   render() {
    return (
        <React.Fragment>

              { this.state.onProfile &&
              <div class="settings2ButtonsDiv">
                <button id="myProfileButtonOn" onClick={this.goToPrivateProfile}> My Profile </button>
                <button id="myProfileButton" onClick={this.goToUserSettings}> Edit </button>
                <button id="myProfileButton" onClick={this.goToProfileSettings}> Settings </button>
              </div> }

              { this.state.onEdit &&
              <div class="settings2ButtonsDiv">
                <button id="myProfileButton" onClick={this.goToPrivateProfile}> My Profile </button>
                <button id="myProfileButtonOn" onClick={this.goToUserSettings}> Edit </button>
                <button id="myProfileButton" onClick={this.goToProfileSettings}> Settings </button>
              </div> }

              { this.state.onSettings &&
              <div class="settings2ButtonsDiv">
                <button id="myProfileButton" onClick={this.goToPrivateProfile}> My Profile </button>
                <button id="myProfileButton" onClick={this.goToUserSettings}> Edit </button>
                <button id="myProfileButtonOn" onClick={this.goToProfileSettings}> Settings </button>
              </div> }

              { this.state.showProfile &&
              <div>
              <div class="NetworkSingleContactDiv">
              </div>
              <div class="topParentDiv">

                <div>
                <img id="profilePic3" src={this.state.profilePicture}></img>
                <div class="scoresListTD">
                <table>
                { this.state.showTitle &&
                <tr><td> Title: {this.state.profileTitle} </td></tr> }
                { this.state.showBlurb &&
                <tr><td> About Me: {this.state.profileBlurb} </td></tr> }
                { this.state.showLocation &&
                <tr><td> Location: {this.state.profileLocation} </td></tr> }
                { this.state.showContactDetails &&
                <tr><td> Contact Details: {this.state.profileContactInfo} </td></tr> }
                { this.state.showRelationshipStatus &&
                <tr><td> Relationship Status: {this.state.relationshipStatus2} </td></tr> }
                </table>
                </div>
                </div>

              </div>
              </div> }

              { this.state.showSettingsSection &&
              <div class="topParentDiv">
                <Picture profilePicture={this.state.profilePicture} getProfilePicture={this.getProfilePicture} deleteProfilePicture={this.deleteProfilePicture} />
                <ProfileText />
              </div> }

            { this.state.showProfileSettings &&
            <div class="topParentDiv">
              <ScoreUrl />
              <UpdateUserInfo />
            </div> }

        </React.Fragment>
    ); // end return
   }
}

export default Profile;