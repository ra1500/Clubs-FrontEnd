import React from 'react';
import axios from 'axios';

class ClubsListPublic extends React.Component {
    constructor(props) {
        super(props);
        this.joinPublicClub = this.joinPublicClub.bind(this);
        this.state = {
            list: null,
            showClubsSome: false,
            showClubsNone: true,
            //clubId: null,
            showJoinedClubMessage: false,
            joinedClubMessage: null,
        };
    }

  componentDidMount() {
    this.getPublicClubsList();
  }

    getPublicClubsList() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/c/g",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
         if (response.status === 200) {
          this.setState({
            isLoaded: true,
            list: response.data,
            showClubsSome: true,
            showClubsNone: false,
          });
          } // end if
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  joinPublicClub(e) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/i/e?cId=" + e.target.value,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
         if (response.status === 200) {
          this.setState({
            isLoaded: true,
            showJoinedClubMessage: true,
            joinedClubMessage: response.data.clubName,
          });

          } // end if
          else { this.setState({joinedClubMessage: "error"}); }
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

   renderTableData() {
      const sortedList = this.state.list.sort((a,b) => (a.currentSize > b.currentSize) ? -1 : ((b.currentSize > a.currentSize) ? 1 : 0));
      return sortedList.map((data, index) => {
         return (
            <tr key={data.id}>
                <td> <p class="noLineSpaceP"> {data.clubName} </p></td>
                <td> <p class="noLineSpaceP"> Size: {data.currentSize} </p></td>
                <td> <button class="seeDetailsButton" value={data.id} onClick={e => this.joinPublicClub(e)}> Join </button> </td>
            </tr>
         )
      })
   }


    render() {
        return (
        <React.Fragment>
        <div class="topParentDiv">
        <div class="secondParentDiv">

        { this.state.showJoinedClubMessage &&
         <div>
         <p class="alertsSmallP"> &nbsp; {this.state.joinedClubMessage} </p>
         </div> }

        { !this.state.showJoinedClubMessage &&
         <div class="questionsParagraph">
         <p lass="questionsParagraph"> </p>
         </div> }

        { this.state.showClubsNone &&
         <div>
         <p class="alertsSmallP"> &nbsp;(none)</p>
         </div> }

        { this.state.showClubsSome &&
         <div >
            <table>
               <tbody >
                  <tr class="publicClubsTR"> Public Clubs: </tr>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div> }


         </div>
         </div>
        </React.Fragment>
        )
    }

}

export default ClubsListPublic;