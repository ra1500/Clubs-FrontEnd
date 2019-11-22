import React from 'react';
import InvitationForm from "./InvitationForm";

class ContactsList extends React.Component {
    constructor(props) {
        super(props);
        this.toggleShowNetworkList = this.toggleShowNetworkList.bind(this);
        this.state = {
            list1: props.allData.data.friendsList, //
        };
    }

   renderTableData() {
     let list = this.state.list1.filter(data => data.connectionStatus != 'removed');
     this.state = {list2: list};

      return this.state.list2.map((data, index) => {
         return (
            <tr key={data.friend}>
               <td> <button class="titleButton" value={data.id} onClick={e => this.props.renderSingleContact(e)}> {data.friend} </button> </td>
               <td>{data.connectionStatus} &nbsp; &nbsp;</td>
               <td>{data.connectionType} &nbsp; &nbsp;</td>
               <td>{data.visibilityPermission}</td>
            </tr>
         )
      })
   }

    // insert this below 'this.renderTableData()'  <tr>{this.renderTableHeader()}</tr>
   renderTableHeader() {
      let header = ["Contact", "Status", "Type", "Privacy"]
      return header.map((key, index) => {
         return <th key={index}>{key}</th>
      })
   }

    toggleShowNetworkList() {
        this.props.toggleShowNetworkList();
    }

    render() {
        return (
        <React.Fragment>
         <div id="contactsList">
            <table>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
         <InvitationForm toggleShowNetworkList={this.toggleShowNetworkList}/>
         <button onClick={this.props.toggleShowRemovedList}> view and edit removed contacts</button>
        </React.Fragment>
        )
    }

}

export default ContactsList;