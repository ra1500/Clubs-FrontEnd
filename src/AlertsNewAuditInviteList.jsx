import React from "react";
import axios from 'axios';

class AlertsNewAuditInviteList extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
          error: null,
          isLoaded: false,
          title: null,
          auditInvitesExist: false,
        };
  }

    componentDidMount() {
        this.getUserAnswer();
    }

    getUserAnswer() {
       const name = JSON.parse(sessionStorage.getItem('tokens'));
       const u = name.userName;
       const p = name.password;
       const token = u +':' + p;
       const hash = btoa(token);
       const Basic = 'Basic ' + hash;
       axios.get("http://localhost:8080/api/a/al",
       {headers : { 'Authorization' : Basic }})
       .then((response) => {
         if (response.status === 200) {
         this.setState({
           isLoaded: true,
           list: response.data,
           auditInvitesExist: true,
         });
         } // end if
         else { this.setState({auditInvitesExist: false}); }
              }).catch(error => {this.setState({ isLoaded: true, error,});
              });
    }

   renderTableData() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index}>
                <td> {data.auditee}</td>
                <td> {data.questionSetVersionEntity.title} </td>

            </tr>
         )
      })
   }


  render() {
    return (
    <React.Fragment>

        { !this.state.auditInvitesExist &&
         <div>
         <p class="alertsSmallP"> &nbsp;(nothing blah blahnew here)</p>
         </div> }

        { this.state.auditInvitesExist &&
         <div>
            <table>
               <tbody>
               <tr><th>Contact</th><th>Title</th></tr>
                {this.renderTableData()}
               </tbody>
            </table>
         </div> }


    </React.Fragment>
    );
  }
}

export default AlertsNewAuditInviteList;