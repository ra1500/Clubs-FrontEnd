import React from "react";
import axios from 'axios';
import ClubInvite from "./ClubInvite";
import ClubQuit from "./ClubQuit";


class ClubManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        clubId: this.props.clubId,
        showClubInvite: true,
        showQuitClub: true,
        };
    };

  componentDidMount() {
  }


   render() {
    return (
        <React.Fragment>

        { this.state.showClubInvite &&
        <div>
            <ClubInvite clubId={this.state.clubId}/>
        </div> }

        { this.state.showQuitClub &&
        <div>
            <ClubQuit clubId={this.state.clubId}/>
        </div> }


        </React.Fragment>
    ); // end return
   }
}

export default ClubManage;