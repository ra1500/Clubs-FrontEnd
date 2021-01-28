import React from 'react';
import axios from 'axios';

class AlertsNewClubInvitations extends React.Component {
    constructor(props) {
        super(props);
        this.accept = this.accept.bind(this);
        this.decline = this.decline.bind(this);
        this.state = {
            list1: null,
            showNewClubInvitations: false,
        };
    }

    componentDidMount() {
        this.getNewClubInvitations();
    }

    getNewClubInvitations() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/i/a",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        if (response.status === 200 && response.data.length > 0) {
          this.setState({
            isLoaded: true,
            list2: response.data,
            showNewClubInvitations: true,
          });
          } // end if!
          else { this.setState({showNewClubInvitations: false}); }
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

    accept(e) {
        if (window.confirm('Please confirm acceptance')) {

        this.setState({showNewClubInvitations: false });

        const clubInvitationId = e.target.value;

        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: clubInvitationId, status: "2"};
        axios.post("http://localhost:8080/api/i/c", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.getNewClubInvitations();
        this.setState({isLoaded: true, showNewClubInvitations: true });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
         }
    }


    decline(e) {
        if (window.confirm('Please confirm decline')) {

        this.setState({showNewClubInvitations: false });

        const clubInvitationId = e.target.value;

        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: clubInvitationId, status: "3"};
        axios.post("http://localhost:8080/api/i/c", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.getNewClubInvitations();
        this.setState({isLoaded: true, showNewClubInvitations: true });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
         }
    }



   renderTableData() {
      return this.state.list2.map((data, index) => {
         return (
            <div class="alertsNewDiv">
            <tr>
                <td>{data.club.clubName} </td>
            </tr>
            <tr key={data.id}>
               <td> By member: {data.sender.userName} </td>
             </tr>
             <tr>
               <td class="alertsButtonsTD">
               <button class="acceptButton" value={data.id} onClick={e => this.accept(e)}> Accept </button>
               <button class="declineButton" value={data.id} onClick={e => this.decline(e)}> Decline </button>
               <button class="updateButton" value={data.id} onClick={e => this.props.goToClubDetails(e)}> Details </button>
               </td>
            </tr>
            </div>
         )
      })
   }


    render() {
        return (
        <React.Fragment>
         <div id="contactsList">

        { !this.state.showNewClubInvitations &&
         <div>
         <p class="alertsSmallP"> &nbsp;(none)</p>
         </div> }


            { this.state.showNewClubInvitations &&
            <table>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table> }
         </div>
        </React.Fragment>
        )
    }

}

export default AlertsNewClubInvitations;