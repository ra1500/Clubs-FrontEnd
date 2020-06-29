import React from "react";
import AlertsNewContactsList from "./AlertsNewContactsList";
import AlertsNewAuditInviteList from "./AlertsNewAuditInviteList";
import AlertsNewAuditPostedList from "./AlertsNewAuditPostedList";
import { Link } from 'react-router-dom';

class Start extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
          error: null,
          isLoaded: false,
        };
  }

    componentDidMount() {
    }

  render() {
    return (
    <React.Fragment>


          <div class="settings2ButtonsDiv">

          </div>


      <div class="topParentDiv">
        <div class="secondParentDiv">
            <p class="questionsParagraph"> New Network Invitations (&lt; 2 weeks) </p>
            <AlertsNewContactsList /><br></br>
            <p class="questionsParagraph"> New Review Invitations (&lt; 2 weeks) </p>
            <AlertsNewAuditInviteList /><br></br>
            <p class="questionsParagraph"> New Completed Reviews (&lt; 1 week) </p>
            <AlertsNewAuditPostedList /><br></br>
        </div>
        </div>




    </React.Fragment>
    );
  }
}

export default Start;