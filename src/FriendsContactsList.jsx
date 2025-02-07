import React from 'react';
import InvitationFormContact from "./InvitationFormContact";
import ProfilePicture from "./ProfilePicture";

class FriendsContactsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
            contactName: this.props.contactName,
            isAfriend: false,
            hasPendingInvitations: false,
        };
    }

componentDidMount() {
    this.manageUpdate();
}

  manageUpdate() {
    if (this.props.connectionStatus == "pending") {
        this.setState({isAfriend: false, hasPendingInvitations: true});
     }
    else {
        this.setState({isAfriend: true, hasPendingInvitations: false});
    }
  }

   renderTableData() {
      return this.props.list.map((data, index) => {
         return (
            <tr class="friendsTR" key={data.friend}>
               <td> <ProfilePicture friendId={data.id} /> </td>
               <td class="friendsTD2"> {data.friend} </td>
               <td class="friendsTD"> <p class="secondP">Title: {data.userEntity.title} </p> </td>
               <td class="friendsTD3"> <p class="secondP">Location: {data.userEntity.location} </p> </td>
               <td class="friendsTD2"> <button class="updateButton" value={data.friend} onClick={e => this.props.inviteToJoinMyNetwork(e)}> Connect </button> </td>
            </tr>
         )
      })
   }


    render() {
        return (
        <React.Fragment>

        { this.state.isAfriend &&
        <div class="topParentDiv">

        { this.props.showNetworkListNone &&
         <div>
         <p class="alertsSmallP"> &nbsp;(none)</p>
         </div> }

        { this.props.showNetworkListDetails &&
         <div>
            <table>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div> }

      { this.props.showInvite &&
          <div>
            <InvitationFormContact invitedFriend={this.props.invitedFriend} />
          </div> }

        </div> }

        { this.state.hasPendingInvitations &&
         <div class="topParentDiv">
         <p>(contact pending)</p>
         </div> }

      </React.Fragment>
        )
    }

}

export default FriendsContactsList;