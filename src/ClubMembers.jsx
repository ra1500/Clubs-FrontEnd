import React from 'react';
import ProfilePicture from "./ProfilePicture";

class ClubMembers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.membersList, //
        };
    }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr class="friendsTR"key={data.id}>
               <td> <ProfilePicture friendId={data.id} /> </td>
               <td class="friendsTD2"> {data.userName} </td>
               <td class="friendsTD"> <p class="secondP"> Location: {data.location} </p></td>
               <td class="friendsTD2"> <button class="titleButton" value={data.id} onClick={e => this.props.sendMessageClubMember(e)}> Send a Message </button> </td>
            </tr>
         )
      })
   }

// <tr><th class=""></th><th class="thContact">Contact</th><th class="">Status</th><th>Type</th><th>View Permission</th></tr>

    render() {
        return (
        <React.Fragment>
         <div class="topParentDiv">
         <p> Members List </p>
        <p></p>
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