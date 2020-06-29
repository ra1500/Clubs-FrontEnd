import React from 'react';

class MessagesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list, //
        };
    }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr class="friendsTR"key={data.message}>
                <td class="friendsTD"> <p class="secondP"> Posted By: {data.sender.userName} </p></td>
                <td class="friendsTD"> <p class="secondP"> Time Stamp: {data.created} </p></td>
                <td class="friendsTD"> <p class="secondP"> Message: {data.message} </p></td>
            </tr>
         )
      })
   }


    render() {
        return (
        <React.Fragment>
         <div class="topParentDiv">
         <div class="secondParentDiv">

        { !this.props.showMessagesList2 &&
         <div>
         <p class="alertsSmallP"> &nbsp;(none)</p>
         </div> }

        { this.props.showMessagesList2 &&
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

export default MessagesList;