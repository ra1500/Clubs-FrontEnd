import React from "react";
import axios from 'axios';
import ClubInvite from "./ClubInvite";
import ClubQuit from "./ClubQuit";
import ClubVoteCast from "./ClubVoteCast";

class ClubVoting extends React.Component {
  constructor(props) {
    super(props);
    this.refreshMyCurrentAlphaVote = this.refreshMyCurrentAlphaVote.bind(this);
    this.state = {
        clubId: this.props.clubId,
        showClubVoting: true,
        clubAlpha: this.props.clubAlpha,
        myAlphaVote: 'tbd',
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
            let i = 0;
            for (i = 0; i < response.data.length; i++) {
                if (response.data[i].voteType == 1)
                    this.setState({myAlphaVote: response.data[i].voteCast});
         }
          this.setState({
            isLoaded: true,
          });
          } // end if
          //this.renderTableData();
          else { this.setState({}); }
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

    refreshMyCurrentAlphaVote(e) {
        this.setState({myAlphaVote: e});
    }


   render() {
    return (
        <React.Fragment>

        { this.state.showClubVoting &&
        <div>
           <p id="noLineSpaceP"> My alpha vote: {this.state.myAlphaVote}</p>
           <ClubVoteCast clubId={this.state.clubId}  refreshMyCurrentAlphaVote={this.refreshMyCurrentAlphaVote}/>
        </div> }


        </React.Fragment>
    ); // end return
   }
}

export default ClubVoting;