import React from "react";
import axios from 'axios';

class AlertsClubDetails extends React.Component {
  constructor(props) {
    super(props);
        this.accept = this.accept.bind(this);
        this.decline = this.decline.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          clubName: null,
          description: null,
          clubAlpha: null,
          showButtons: true,
          message: null,
          clubId: null,
          inviter: null,
        };
  }

    componentDidMount() {
        this.renderSingleClub();
    }

  renderSingleClub(e) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/i/d?cId=" + this.props.clubInvitationId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
         if (response.status === 200) {
          this.setState({
            isLoaded: true,
            clubName: response.data.club.clubName,
            clubDescription: response.data.club.description,
            clubAlpha: response.data.club.alpha,
            clubId: response.data.club.id,
            inviter : response.data.sender.userName,
          });
          } // end if
          else { this.setState({}); }
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

    accept() {
        if (window.confirm('Please confirm acceptance')) {

        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: this.props.clubInvitationId, status: "2"};
        axios.post("http://localhost:8080/api/i/c", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, message: "club added", showButtons: false });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
         }
    }


    decline() {
        if (window.confirm('Please confirm acceptance')) {

        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: this.props.clubInvitationId, status: "3"};
        axios.post("http://localhost:8080/api/i/c", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, message: "club invitation declined", showButtons: false});
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
         }
    }


  render() {
    return (
    <React.Fragment>
      <div>

        <p class="headerP"> Club Invitation Details </p>

        <table>
            <tr><td>Club:</td><td class="clubTD"> {this.state.clubName} </td></tr>
            <tr><td>Description:</td><td class="clubTD"> {this.state.description} </td></tr>
            <tr><td>Club Alpha:</td><td class="clubTD"> {this.state.clubAlpha} </td></tr>
            <tr><td>Inviting Member::</td><td class="clubTD"> {this.state.inviter} </td></tr>
        </table>

       { this.state.showButtons &&
       <div>
       <button class="acceptButton" onClick={e => this.accept()}> Accept </button>
       <button class="declineButton" onClick={e => this.decline()}> Decline </button>
       </div> }

       { !this.state.showButtons &&
       <div>
       <br></br>
       <p class="noLineSpaceP"> {this.state.message} </p>
       </div> }

      </div>
    </React.Fragment>
    );
  }
}

export default AlertsClubDetails;