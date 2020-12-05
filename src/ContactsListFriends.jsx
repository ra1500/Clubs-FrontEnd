import React from 'react';
import ProfilePictureInList from "./ProfilePictureInList";

class ContactsListFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list, //
            showNoneMessage: true,
            showList: true,
        };
    }

    // create a new props function that simply has the data.id passed up instead of an event handler.
   renderTableData() {
      if ( this.props.list == null ) {  this.setState({showList: false}); }; // this b.s. needed so that during logout no null list error

      const sortedList = this.state.list.sort((a,b) => (a.created > b.created) ? 1 : ((b.created > a.created) ? -1 : 0));
      return sortedList.map((data, index) => {
        if ( data.connectionType == "Friend" && data.connectionStatus == "Connected" ) {
        this.state = { showNoneMessage: false };
         return (
            <tr class="friendsTR"key={data.friend}>
               <td> <ProfilePictureInList renderSingleContactFromPicture={this.props.renderSingleContactFromPicture} friendId={data.id} /> </td>
               <td class="friendsTD2"> <button class="pureTextButton" value={data.id} onClick={e => this.props.renderSingleContact(e)} >  {data.friend} </button> </td>
               <td class="friendsTD2"> <button class="pureTextButton" value={data.id} onClick={e => this.props.renderSingleContact(e)} >  {data.connectionType} </button> </td>
               <td class="friendsTD2"> <button class="pureTextButton" value={data.id} onClick={e => this.props.renderSingleContact(e)} >  {data.connectionStatus} </button> </td>
               <td> <button class="seeDetailsButton" value={data.id} onClick={e => this.props.renderSingleContact(e)} >  &#9658; </button> </td>
            </tr>
         )
         } // end if
      })
   }

// <tr><th class=""></th><th class="thContact">Contact</th><th class="">Status</th><th>Type</th><th>View Permission</th></tr>

    render() {
        return (
        <React.Fragment>

         <div class="topParentDiv">
        <div class="secondParentDiv">

        { this.state.showList &&
        <div>
        { this.props.showNetworkListDetails &&
         <div>
            <table>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div> }
         </div> }
         </div>
         </div>

        { this.state.showNoneMessage &&
         <div class="topParentDiv">
         <p class="alertsSmallP"> &nbsp;(none)</p>
         </div> }

        </React.Fragment>
        )
    }

}

export default ContactsListFriends;