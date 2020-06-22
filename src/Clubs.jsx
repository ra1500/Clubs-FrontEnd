import React from "react";
import TitleBar from "./TitleBar";
import axios from 'axios';
import ClubText from "./ClubText";
import ClubsList from "./ClubsList";
import ClubMembers from "./ClubMembers";
import MessageBoard from "./MessageBoard";
import ClubVoting from "./ClubVoting";
import ClubManage from "./ClubManage";

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
        showClubMessageBoard: false,
        showClubVoting: false,
        showClubManage: false,
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

  goToClubsList() {
          this.setState({showCreateClubs: false, showSingleClub: false, showMembersList: false, showClubMessageBoard: false, showClubManage: false, showClubVoting: false});
          this.getClubsList();
    }
  goToCreateClub() {
          this.setState({showCreateClubs: true, showClubsList: false, showSingleClub: false, showMembersList: false, showClubManage: false, showClubVoting: false});
    }
    showMembers() {
           this.setState({showMembersList: !this.state.showMembersList, showClubMessageBoard: false, showClubManage: false, showClubVoting: false});
    }
    showClubMessageBoard() {
           this.setState({showMembersList: false, showClubMessageBoard: !this.state.showClubMessageBoard, showClubManage: false, showClubVoting: false});
    }
    showClubVoting() {
           this.setState({showMembersList: false, showClubMessageBoard: false, showClubManage: false, showClubVoting: !this.state.showClubVoting});
    }
    showClubManage() {
           this.setState({showMembersList: false, showClubMessageBoard: false, showClubManage: !this.state.showClubManage, showClubVoting: false});
    }

   render() {
    return (
        <React.Fragment>
              <TitleBar />

              <div class="settings2ButtonsDiv">
                <button class="settingsButton" onClick={this.goToClubsList}> My Clubs </button>
                <button class="settingsButton" onClick={this.goToCreateClub}> Start a Club </button>
              </div>

              <div class="topParentDiv">

      <div class="topParentDiv">


        { this.state.showClubsList &&
        <div>
        <p> My Clubs </p>
        <ClubsList list={this.state.list} showClubsList2={this.state.showClubsList2} renderSingleClub={this.renderSingleClub} />
        </div> }

        { this.state.showCreateClubs &&
        <div>
        <p> Start a New Club </p>
        <ClubText />
        </div> }

        { this.state.showSingleClub &&
        <div>
        <p> {this.state.clubName} </p>
        <p> {this.state.description} </p>
        <p> Alpha: {this.state.clubAlpha} </p>
        <button class="settingsButton" onClick={this.showMembers}> Members </button>
        <button class="settingsButton" onClick={this.showClubMessageBoard}> Message Board </button>
        <button class="settingsButton" onClick={this.showClubVoting}> Voting </button>
        <button class="settingsButton" onClick={this.showClubManage}> Settings </button>
            { this.state.showMembersList &&
            <div>
             <ClubMembers membersList={this.state.membersList} showMembersList2={this.state.showMembersList2} />
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

        </div> }

              </div>
            </div>


        </React.Fragment>
    ); // end return
   }
}

export default Clubs;