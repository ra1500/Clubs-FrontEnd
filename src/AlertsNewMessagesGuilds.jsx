import React from 'react';
import axios from 'axios';

class AlertsNewMessagesGuilds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list1: null,
            showNewMessages: false,
        };
    }

    componentDidMount() {
        this.getNewMessages();
    }

    getNewMessages() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/m/h",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        if (response.status === 200 && response.data.length > 0) {
          this.setState({
            isLoaded: true,
            list2: response.data,
            showNewMessages: true,
          });
          } // end if!
          else { this.setState({showNewMessages: false}); }
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

    clearContactMsgsAlert(e) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/m/j?uId=" + e.target.value + "&type=" + "5",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        if (response.status === 200) {
            this.getNewMessages();
          } // end if!
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

   renderTableData() {
      return this.state.list2.map((data, index) => {
         return (
            <tr key={data.index}>
               <td> {data} </td>
               <td> <button class="seeDetailsButton" value={data} onClick={e => this.clearContactMsgsAlert(e)}> Clear Alert </button> </td>
            </tr>
         )
      })
   }



    render() {
        return (
        <React.Fragment>
         <div id="contactsList">

        { !this.state.showNewMessages &&
         <div>
         <p class="alertsSmallP"> &nbsp;(nothing new here)</p>
         </div> }


            { this.state.showNewMessages &&
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

export default AlertsNewMessagesGuilds;