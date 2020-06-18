import React from "react";
import TitleBar from "./TitleBar";
import axios from 'axios';
import ClubText from "./ClubText";
import ClubsList from "./ClubsList";


class Clubs extends React.Component {
  constructor(props) {
    super(props);
    this.goToClubsList = this.goToClubsList.bind(this);
    this.goToCreateClub = this.goToCreateClub.bind(this);
    this.state = {
        isLoaded: null,
        list: null,
        showClubsList: false,
        showClubsList2: false, // used in 'ClubsList' component if user indeed has clubs (via props)
        showCreateClubs: false,
        clubId: 1,
        clubName: null,
        clubDescription: null,
        };
    };

  componentDidMount() {
    //this.getClubsList();
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
          //this.setState({showNetworkList: true});
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

// GET a single club
//  getClubsList() {
//        const name = JSON.parse(sessionStorage.getItem('tokens'));
//        const u = name.userName;
//        const p = name.password;
//        const token = u +':' + p;
//        const hash = btoa(token);
//        const Basic = 'Basic ' + hash;
//        axios.get("http://localhost:8080/api/c/a?cId=" + this.state.clubId,
//        {headers : { 'Authorization' : Basic }})
//        .then((response) => {
//          this.setState({
//            isLoaded: true,
//            clubName: response.data.clubName,
//            clubDescription: response.data.description,
//           showClubsList: true,
//         });
//               }).catch(error => {this.setState({ isLoaded: true, error,});
//               });
//    }

  goToClubsList() {
          this.setState({showCreateClubs: false,});
          this.getClubsList();
    }

  goToCreateClub() {
          this.setState({showCreateClubs: true, showClubsList: false});
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
        <ClubsList list={this.state.list} showClubsList2={this.state.showClubsList2} />
        </div> }

        { this.state.showCreateClubs &&
        <div>
        <p> Start a New Club </p>
        <ClubText />
        </div> }

              </div>
            </div>


        </React.Fragment>
    ); // end return
   }
}

export default Clubs;