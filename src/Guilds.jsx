import React from "react";
import axios from 'axios';
import TitleBar2 from "./TitleBar2";
import { Link } from 'react-router-dom';


class Guilds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoaded: null,
        };
    };

  componentDidMount() {
  }

        //<ul>
        //    <li> Project and goal management. </li>
        //    <li> Issue tasks to members and track progress. </li>
        //    <li> Put out short questionnaires for members to approve and vote on decisions. </li>
        //    <li> Project manager has direct control over membership and communications. </li>
        //</ul>
        //<br></br>

   render() {
    return (
        <React.Fragment>

        <TitleBar2 />

              <div class="settings2ButtonsDiv">
              </div>

              <div class="topParentDiv">

      <div class="topParentDiv">

        <p className="noLineSpaceP"> Coming soon... </p>

        <p className="noLineSpaceP">  </p><br></br>


              </div>
            </div>
        </React.Fragment>
    ); // end return
   }
}

export default Guilds;