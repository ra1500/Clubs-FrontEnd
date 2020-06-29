import React from 'react';

class ClubsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list, //
        };
    }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr class="friendsTR"key={data.id}>
               <td class="friendsTD2"> <button class="titleButton" value={data.id} onClick={e => this.props.renderSingleClub(e)}> {data.id} </button> </td>
               <td class="friendsTD"> <p class="secondP"> Club Name {data.clubName} </p></td>
               <td class="friendsTD"> <p class="secondP"> Desc. {data.description} </p></td>
            </tr>
         )
      })
   }

//                <td> <ProfilePicture friendId={data.id} /> </td>
// <tr><th class=""></th><th class="thContact">Contact</th><th class="">Status</th><th>Type</th><th>View Permission</th></tr>

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

export default ClubsList;