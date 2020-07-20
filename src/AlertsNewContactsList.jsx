import React from 'react';
import axios from 'axios';

class AlertsNewContactsList extends React.Component {
    constructor(props) {
        super(props);
        this.accept = this.accept.bind(this);
        this.decline = this.decline.bind(this);
        this.state = {
            list1: null,
            showNewContacts: false,
        };
    }

    componentDidMount() {
        this.getFriendships();
    }

    accept(e) {
        if (window.confirm('Please confirm acceptance')) {

        this.setState({showNewContacts: false });

        const friendshipId = e.target.value;

        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: friendshipId, connectionStatus: "Connected", visibilityPermission: "Yes" };
        axios.post("http://localhost:8080/api/f/a", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.getFriendships();
        this.setState({isLoaded: true, showNewContacts: true });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
         }
    }

    decline(e) {
        if (window.confirm('Please confirm decline')) {

        this.setState({showNewContacts: false });

        const friendshipId = e.target.value;

        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: friendshipId, connectionStatus: "removed", visibilityPermission: "Yes" };
        axios.post("http://localhost:8080/api/f/a", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.getFriendships();
        this.setState({isLoaded: true, showNewContacts: true });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
         }
    }

    getFriendships() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/user/al",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        if (response.status === 200 && response.data.friendsList.length > 0) {
          this.setState({
            isLoaded: true,
            list2: response.data.friendsList,
            showNewContacts: true,
          });
          } // end if!
          else { this.setState({showNewContacts: false}); }
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

   renderTableData() {
      return this.state.list2.map((data, index) => {
         return (
            <div class="alertsNewDiv">
            <tr key={data.friend}>
               <td> {data.friend} </td>
            </tr>
            <tr>
               <td>{data.connectionType} </td>
            </tr>
            <tr>
               <td class="alertsButtonsTD" >
               <button class="acceptButton" value={data.id} onClick={e => this.accept(e)}> Accept </button>
               <button class="declineButton" value={data.id} onClick={e => this.decline(e)}> Decline </button>
               <button class="seeDetailsButton" value={data.id} onClick={e => this.props.goToContactDetails(e)}> See Details </button>
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

        { !this.state.showNewContacts &&
         <div>
         <p class="alertsSmallP"> &nbsp;(none)</p>
         </div> }


            { this.state.showNewContacts &&
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

export default AlertsNewContactsList;