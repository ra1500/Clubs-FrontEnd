import React from 'react';

class MessagesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list, //
            messagesEnd: true,
        };
    }

   renderTableData() {
    const sortedList = this.state.list.sort((a,b) => (a.created > b.created) ? 1 : ((b.created > a.created) ? -1 : 0));
      return sortedList.map((data, index) => {
         return (
            <tr class="friendsTR"key={data.message}>
                    <td id="timeStampTD"> <p class="timeStampP">   {new Intl.DateTimeFormat("en-GB", {
                                                month: "short",
                                                day: "numeric",
                                                weekday: "short",
                                                hour: "numeric",
                                                minute: "numeric"
                                              }).format(    Date.parse(   data.created )    )} </p></td>
                <td id="userNameTD"> <p class="userNameMSG">{data.sender.userName} </p></td>
                <td> <div class="messagesDiv2"><p class="messagesP"> {data.message} </p></div></td>
            </tr>
         )
      })
   }



    render() {
        return (
        <React.Fragment>
         <div class="topParentDiv">

        { !this.props.showMessagesList2 &&
         <div>
         <p class="alertsSmallP"> &nbsp;(none)</p>
         </div> }

        { this.props.showMessagesList2 &&
         <div class="messagesDiv">
         <div>
            <table>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
            <div id="end"> </div>
         </div>
         </div> }
         </div>
        </React.Fragment>
        )
    }

}

export default MessagesList;