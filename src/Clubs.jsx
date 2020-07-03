import React from "react";
import axios from 'axios';
import ClubText from "./ClubText";
import ClubsList from "./ClubsList";
import ClubMembers from "./ClubMembers";
import MessageBoard from "./MessageBoard";
import ClubVoting from "./ClubVoting";
import ClubManage from "./ClubManage";
import { Link } from 'react-router-dom';
import MessageBoardSingle from "./MessageBoardSingle";

class Clubs extends React.Component {
  constructor(props) {
    super(props);
    this.goToClubsList = this.goToClubsList.bind(this);
    this.goToCreateClub = this.goToCreateClub.bind(this);
    this.renderSingleClub = this.renderSingleClub.bind(this);
    this.showMembers = this.showMembers.bind(this);
    this.showClubMessageBoard = this.showClubMessageBoard.bind(this);
    this.showClubVoting = this.showClubVoting.bind(this);
    this.showClubManage = this.showClubManage.bind(this);
    this.goToSingleClubMember = this.goToSingleClubMember.bind(this);
    this.state = {
        isLoaded: null,
        list: null,
        membersList: null,
        showClubsList: false,
        showClubsList2: false, // used in 'ClubsList' component if user indeed has clubs (via props)
        showCreateClubs: false,
        showSingleClub: false,
        clubId: null,
        clubName: 'none',
        clubDescription: 'none',
        clubAlpha: 'none',
        showMembersList: false,
        showMembersList2: true,
        showClubMessageBoard: true,
        showClubVoting: false,
        showClubManage: false,
        showSingleClubMember: false,
        memberUserName: null,
        singleClubMemberId: null,
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
            showClubsList2: true,
            showClubsList: true,
          });
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
            clubAlpha: response.data.alpha,
            membersList: response.data.members,
            showClubsList: false,
            showSingleClub: true,
          });
          } // end if
          //this.renderTableData();
          else { this.setState({showClubsList: false}); }
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  goToSingleClubMember(e) {

    const dude = e.target.value;

    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u +':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    axios.get("http://localhost:8080/api/user/pu?mid=" + dude + "&cid=" + this.state.clubId,
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
        singleClubMemberId: dude,
      });
      if (response.data.education === 1) {this.setState({education2: "High School"})};
      if (response.data.education === 2) {this.setState({education2: "College"})};
      if (response.data.education === 3) {this.setState({education2: "Masters"})};
      if (response.data.education === 4) {this.setState({education2: "Phd or MD"})};
      if (response.data.education === 5) {this.setState({education2: "Irrelevant"})};
      if (response.data.relationshipStatus === 1) {this.setState({relationshipStatus2: "Available"})};
      if (response.data.relationshipStatus === 2) {this.setState({relationshipStatus2: "Not Available"})};
      if (response.data.relationshipStatus === 3) {this.setState({relationshipStatus2: "Irrelevant"})};
      this.setState({showMembersList: false, showSingleClubMember: true});
           }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
           });
    }

  goToClubsList() {
          this.setState({showCreateClubs: false, showSingleClub: false, showMembersList: false, showClubMessageBoard: false, showClubManage: false, showClubVoting: false, showSingleClubMember: false});
          this.getClubsList();
    }
  goToCreateClub() {
          this.setState({showCreateClubs: true, showClubsList: false, showSingleClub: false, showMembersList: false, showClubManage: false, showClubVoting: false, showSingleClubMember: false});
    }
    showMembers() {
           this.setState({showMembersList: !this.state.showMembersList, showClubMessageBoard: false, showClubManage: false, showClubVoting: false, showSingleClubMember: false});
    }
    showClubMessageBoard() {
           this.setState({showMembersList: false, showClubMessageBoard: !this.state.showClubMessageBoard, showClubManage: false, showClubVoting: false, showSingleClubMember: false});
    }
    showClubVoting() {
           this.setState({showMembersList: false, showClubMessageBoard: false, showClubManage: false, showClubVoting: !this.state.showClubVoting, showSingleClubMember: false});
    }
    showClubManage() {
           this.setState({showMembersList: false, showClubMessageBoard: false, showClubManage: !this.state.showClubManage, showClubVoting: false, showSingleClubMember: false});
    }

   render() {
    return (
        <React.Fragment>
            { !this.state.showSingleClub &&
              <div class="settings2ButtonsDiv">
                <button id="myClubsButton" onClick={this.goToClubsList}> My Clubs </button>
                <button id="removedContactsButton" onClick={this.goToCreateClub}> Start a Club </button>
              </div> }

        <div class="topParentDiv">


        { this.state.showClubsList &&
        <div>
        <ClubsList list={this.state.list} showClubsList2={this.state.showClubsList2} renderSingleClub={this.renderSingleClub} />
        </div> }

        { this.state.showCreateClubs &&
        <div>
        <p> Start a New Club </p>
        <ClubText />
        </div> }

        { this.state.showSingleClub &&
        <div>
        <div class="menuBoxDiv">
        <table>
            <tr><td>Club:</td><td class="clubTD"> {this.state.clubName} </td></tr>
            <tr><td>Description:</td><td class="clubTD"> {this.state.description} </td></tr>
            <tr><td>Club Alpha:</td><td class="clubTD"> {this.state.clubAlpha} </td></tr>
        </table>
        </div>
                      <div class="secondLevelDiv">
                        <button id="removedContactsButton" onClick={this.showClubMessageBoard}> Message Board </button>
                        <button id="myClubsButton" onClick={this.showMembers}> Members </button>
                        <button id="removedContactsButton" onClick={this.showClubVoting}> Voting </button>
                        <button id="removedContactsButton" onClick={this.showClubManage}> Settings </button>
                      </div>
            { this.state.showMembersList &&
            <div>
             <ClubMembers membersList={this.state.membersList} showMembersList2={this.state.showMembersList2} goToSingleClubMember={this.goToSingleClubMember} />
            </div> }

            { this.state.showClubMessageBoard &&
            <div>
             <MessageBoard clubId={this.state.clubId} />
            </div> }

            { this.state.showClubVoting &&
            <div>
             <ClubVoting clubId={this.state.clubId} clubAlpha={this.state.clubAlpha} clubName={this.state.clubName} />
            </div> }

            { this.state.showClubManage &&
            <div>
             <ClubManage clubId={this.state.clubId} />
            </div> }

          { this.state.showSingleClubMember &&
          <div class="topParentDiv">
                <img id="profilePic" src={this.state.profilePicture}></img>
                <div class="scoresListTD">
                <p class="secondP"> Club Member: {this.state.memberUserName}</p><br></br>
                <p class="secondP"> Title: {this.state.title}</p><br></br>
                <p class="secondP"> About me: {this.state.blurb}</p><br></br>
                <p class="secondP"> Location: {this.state.location}</p><br></br>
                <p class="secondP"> Contact Info: {this.state.contactInfo}</p><br></br>
                <p class="secondP"> Relationship status: {this.state.relationshipStatus2}</p>
                </div>
                <MessageBoardSingle singleClubMemberId={this.state.singleClubMemberId}/>
                </div> }

        </div> }

        </div>

        </React.Fragment>
    ); // end return
   }
}

export default Clubs;