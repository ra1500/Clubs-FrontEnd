import React from 'react';
import axios from 'axios';
import ClubTextEdit from "./ClubTextEdit";

class ClubsEdit extends React.Component {
    constructor(props) {
        super(props);
        this.editSingleClub = this.editSingleClub.bind(this);
        this.state = {
            list: null,
            showClubsSome: false,
            showClubsNone: true,
            clubId: null,
            showClubTextEdit: false,
        };
    }

  componentDidMount() {
    this.getClubsEditList();
  }

    getClubsEditList() {
        this.setState({showClubsNone: true});

        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/user/pb",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
         if (response.status === 200) {
          this.setState({
            isLoaded: true,
            list: response.data.clubsList,
            showClubsSome: true,
            showClubsNone: false,
          });
          } // end if
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

    editSingleClub(e) {
        this.setState({clubId: e.target.value});
        this.setState({showClubTextEdit: true, showClubsSome: false, showClubsNone: false,});
    }

   renderTableData() {
      const sortedList = this.state.list.sort((a,b) => (a.created > b.created) ? 1 : ((b.created > a.created) ? -1 : 0));
      return sortedList.map((data, index) => {
         return (
            <tr key={data.id}>
                <td> <button class="seeDetailsButton" value={data.id} onClick={e => this.editSingleClub(e)}> edit </button> </td>
                <td> <p class="noLineSpaceP"> {data.clubName} </p></td>
            </tr>
         )
      })
   }


    render() {
        return (
        <React.Fragment>
        <div class="topParentDiv">
        <div class="secondParentDiv">

        { this.state.showClubsNone &&
         <div>
         <p class="alertsSmallP"> &nbsp;(none)</p>
         </div> }

        { this.state.showClubsSome &&
         <div >
         <p class="questionsParagraph"> Edit and adjust clubs in which you are the alpha member. </p>
         <p class="questionsParagraph">Update your headlines. Remove members. Assign a member to be the new alpha. </p> <br></br>
            <table>
               <tbody >
                  {this.renderTableData()}
               </tbody>
            </table>
         </div> }

         { this.state.showClubTextEdit &&
         <ClubTextEdit clubId={this.state.clubId}/> }

         </div>
         </div>
        </React.Fragment>
        )
    }

}

export default ClubsEdit;