import React from 'react';

// this.state.list.sort((a,b) => (a.sequenceNumber > b.sequenceNumber) ? 1 : ((b.sequenceNumber > a.sequenceNumber) ? -1 : 0));

class ClubsList extends React.Component {
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
            <tr key={data.id}>
                <td> <button class="seeDetailsButton" value={data.id} onClick={e => this.props.renderSingleClub(e)}> Go To &#9658; </button> </td>
                <td> <p class="noLineSpaceP"> {data.clubName} </p></td>
            </tr>
         )
      })
   }


    render() {
        return (
        <React.Fragment>
         <div class="topParentDiv">
        <div class="secondParentDiv">

        { !this.props.showClubsList2 &&
         <div>
         <p class="alertsSmallP"> &nbsp;(none)</p>
         </div> }

        { this.props.showClubsList2 &&
         <div >
            <table>
               <tbody >
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

export default ClubsList;