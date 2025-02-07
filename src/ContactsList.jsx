import React from 'react';
import ProfilePicture from "./ProfilePicture";

class ContactsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list, //
        };
    }

   renderTableData() {
      const sortedList = this.state.list.sort((a,b) => (a.created > b.created) ? 1 : ((b.created > a.created) ? -1 : 0));
      return sortedList.map((data, index) => {
         return (
            <tr class="friendsTR"key={data.friend}>
               <td onClick={e => this.props.renderSingleContact(e)}> <ProfilePicture friendId={data.id} /> </td>
               <td class="friendsTD2"> <p class="secondP"> {data.friend} </p></td>
               <td class="friendsTD3"> <p class="secondP"> {data.connectionType} </p></td>
               <td class="friendsTD"> <p class="secondP">  {data.connectionStatus} </p></td>
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

        { !this.props.showNetworkListDetails &&
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
         </div>
         </div>
        </React.Fragment>
        )
    }

}

export default ContactsList;