import React from 'react';

class ContactsListRemoved extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
        };
    }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.friend}>
               <td> {data.friend} </td>
               <td>{data.connectionStatus} &nbsp; &nbsp;</td>
               <td>{data.connectionType} &nbsp; &nbsp;</td>
               <td> <button class="seeDetailsButton" value={data.id} onClick={e => this.props.renderSingleContactRemoved(e)}> Unhide </button> </td>
            </tr>
         )
      })
   }


    render() {
        return (
        <React.Fragment>

        { !this.props.showRemovedListDetails &&
         <div class="topParentDiv">
         <p class="alertsSmallP"> &nbsp;(none)</p>
         </div> }

        { this.props.showRemovedListDetails &&
         <div class="topParentDiv">
            <table>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div> }

        </React.Fragment>
        )
    }

}

export default ContactsListRemoved;