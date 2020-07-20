import React from 'react';
import ProfilePictureClubMember from "./ProfilePictureClubMember";

class ClubMembers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.membersList, //
            clubId: this.props.clubId,
        };
    }

   renderTableData() {
      const sortedList = this.state.list.sort((a,b) => (a.userName > b.userName) ? 1 : ((b.userName > a.userName) ? -1 : 0));
      return this.state.list.map((data, index) => {
         return (
            <tr class="friendsTR"key={data.id}>
               <td> <ProfilePictureClubMember memberId={data.id} clubId={this.props.clubId}/> </td>
               <td class="friendsTD2"> {data.userName} </td>
               <td class="friendsTD"> <p class="secondP"> {data.title} </p></td>
               <td class="friendsTD2"> <button class="seeDetailsButton" value={data.id} onClick={e => this.props.goToSingleClubMember(e)}> Go To &#9658; </button> </td>
            </tr>
         )
      })
   }

// <tr><th class=""></th><th class="thContact">Contact</th><th class="">Status</th><th>Type</th><th>View Permission</th></tr>

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

export default ClubMembers;