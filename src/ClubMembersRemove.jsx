import React from 'react';
import axios from 'axios';
import ProfilePictureClubMember from "./ProfilePictureClubMember";

class ClubMembersRemove extends React.Component {
    constructor(props) {
        super(props);
        this.removeMember = this.removeMember.bind(this);
        this.state = {
            list: this.props.membersList, //
            clubId: this.props.clubId,
        };
    }

    removeMember(e) {
        if (window.confirm('Confirm removal of member and all of members messages')) {

        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/c/e?cId=" + this.props.clubId + "&mId=" + e.target.value,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        if (response.status === 204) {
        this.setState({quitMessage: " error." });}
        else {
        this.setState({isLoaded: true, quitMessage: response.data, showQuitButton: false,});
                   }
               }).catch(error => {this.setState({ isLoaded: true, error});
               });

         } // windows confirm
    }

    changeAlpha(e) {
        if (window.confirm('Are you sure you want assign another member as the alpha?')) {

        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/c/f?cId=" + this.props.clubId + "&mId=" + e.target.value,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        if (response.status === 204) {
        this.setState({quitMessage: " error." });}
        else {
        this.setState({isLoaded: true, quitMessage: response.data, showQuitButton: false,});
                   }
               }).catch(error => {this.setState({ isLoaded: true, error});
               });

         } // windows confirm
    }



   renderTableData() {
      const sortedList = this.state.list.sort((a,b) => (a.userName > b.userName) ? 1 : ((b.userName > a.userName) ? -1 : 0));
      return this.state.list.map((data, index) => {
         return (
            <tr class="friendsTR"key={data.id}>
               <td class="friendsTD2"> {data.userName} </td>
               <td class="friendsTD2"> <button class="updateButton" value={data.id} onClick={e => this.removeMember(e)}>  Remove </button> </td>
               <td class="friendsTD2"> <button class="updateButton" value={data.id} onClick={e => this.changeAlpha(e)}>  Alpha </button> </td>
            </tr>
         )
      })
   }

    render() {
        return (
        <React.Fragment>
         <div class="topParentDiv">
        <div class="secondParentDiv">

        { !this.props.showMembersList2 &&
         <div>
         <p class="alertsSmallP"> &nbsp;(none)</p>
         </div> }

        { this.props.showMembersList2 &&
         <div>
            <table>
               <tbody>
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

export default ClubMembersRemove;