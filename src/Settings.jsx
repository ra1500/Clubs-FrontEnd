import React from "react";
import TitleBar from "./TitleBar";
import axios from 'axios';
import ScoreUrl from "./ScoreUrl";
import UpdateUserInfo from "./UpdateUserInfo";
import Picture from "./Picture";
import ProfileText from "./ProfileText";


class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoaded: null,
        showSettingsSection: true,
        userName: JSON.parse(sessionStorage.getItem('tokens')).userName, // used in header only
        };
    };

  componentDidMount() {
  }

   render() {
    return (
        <React.Fragment>
              <TitleBar />

              <div class="settings2ButtonsDiv">
              </div>

              { this.state.showSettingsSection &&
              <div class="topParentDiv">
                <p> Settings </p>
                <ScoreUrl />
                <UpdateUserInfo />
              </div> }

        </React.Fragment>
    ); // end return
   }
}

export default Settings;