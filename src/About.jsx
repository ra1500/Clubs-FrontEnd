import React from "react";
import axios from 'axios';


class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoaded: null,
        };
    };

  componentDidMount() {
  }

   render() {
    return (
        <React.Fragment>

              <div class="settings2ButtonsDiv">
              </div>

              <div class="topParentDiv">

      <div class="topParentDiv">
        <p> About NeuralJuice</p>
        <p></p>
        <div class="secondParentDiv">
            <p> NeuralJuice. Social networking made easy. </p>
            <p class="questionsParagraph"> HOME </p>
            <p class="questionsParagraph">  Alerts. See what's new in your network. New network invitations, new invitations to review a contact's stat and recently completed reviews from your contacts. </p><br></br><br></br>
            <p class="questionsParagraph"> MY NETWORK </p>
            <p class="questionsParagraph"> View your list of contacts. Invite new ones based on their username. If your contact has invited you to review their answers to a stat then start your review here (select the contact and then choose 'Review Them'). </p><br></br><br></br><br></br>
            <p class="questionsParagraph"> MY PROFILE </p>
            <p class="questionsParagraph"> View your posted stat results and created stats here. Invite network contacts to review your specific answers within a stat. Read those reviews through here as well. Note that you must post a stat before it will show here and then be available to invite reviewers. Limit of 4 stats can be put out for review per account. </p><br></br><br></br><br></br><br></br>
            <p class="questionsParagraph"> STATS </p>
            <p class="questionsParagraph"> View and answer available stats here. NeuralJuice Stats are those created by NeuralJuice. Network Stats are from contacts in your network who have specifically invited you to answer. My Created Stats are those that you make in 'CREATE' (and of course you can answer them as well). </p><br></br><br></br><br></br>
            <p class="questionsParagraph"> CREATE </p>
            <p class="questionsParagraph">  Create your own descriptive stats on anything you like. Edit or delete existing ones in Manage. Invite your network to answer your new stat. Note that your created stats are only available to those within your network (as well as their posted results). Also, if you delete a question (or a stat), it will also delete any of your contacts' answers. Limit of 40 questions per stat and 10 stats per account. </p><br></br><br></br><br></br><br></br><br></br>
            <p class="questionsParagraph"> Public Profile Page </p>
            <p class="questionsParagraph"> All accounts have a public internet URL available of their profile. You can find the URL in 'MY PROFILE -> Edit & Settings'. Only NeuralJuice Stats can be displayed on a user's public profile page. By default, new user accounts are set to 'Network' view only. Change to 'Public' for the public URL to be activated in 'MY PROFILE -> Edit & Settings'. </p> <br></br><br></br><br></br>
        </div>
        </div>


              </div>

        </React.Fragment>
    ); // end return
   }
}

export default About;