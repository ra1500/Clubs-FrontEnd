import React from "react";
import axios from 'axios';
import ClubInvite from "./ClubInvite";
import ClubQuit from "./ClubQuit";


class ClubVoting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        clubId: this.props.clubId,
        showClubVoting: true,
        clubAlpha: this.props.clubAlpha,
        };
    };

  componentDidMount() {
    this.getMyClubVotes();
  }

  getMyClubVotes() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/v/a?cId=" + this.state.clubId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
         if (response.status === 200) {
          this.setState({
            isLoaded: true,

          });
          } // end if
          //this.renderTableData();
          else { this.setState({}); }
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }


   render() {
    return (
        <React.Fragment>

        { this.state.showClubVoting &&
        <div>
            {this.props.clubName}
           Current Club Alpha: {this.state.clubAlpha}
           My current Alpha vote:
           Update alpha vote:
        </div> }




        </React.Fragment>
    ); // end return
   }
}

export default ClubVoting;