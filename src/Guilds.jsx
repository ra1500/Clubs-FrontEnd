import React from "react";
import axios from 'axios';
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

              <div class="settings2ButtonsDiv">
              </div>

              <div class="topParentDiv">

      <div class="topParentDiv">

        <p className="noLineSpaceP"> Working on it... </p>

        <p className="noLineSpaceP">  </p><br></br>


              </div>
            </div>
        </React.Fragment>
    ); // end return
   }
}

export default Guilds;