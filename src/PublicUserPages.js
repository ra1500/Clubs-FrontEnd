import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import ProfilePicturePublic from './ProfilePicturePublic';
import TitleBar3 from "./TitleBar3";

class PublicUserPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            list: null,
            showList: false,
            id: null,
            profileTitle: null,
            profileBlurb: null,
            profileEducation: null,
            profileOccupation: null,
            profileRelationshipStatus: null,
            profileLocation: null,
            profileContactInfo: null,
            education2: null,
            relationshipStatus2: null,
            url: this.props.location.search
        };
    }

  componentDidMount() {
    this.getProfileText();
  }

  getProfileText() {
      let url = this.props.location.search;
      let params = queryString.parse(url);
      let user = params.id;
    axios.get("http://localhost:8080/api/user/pp?id=" + user)
    .then((response) => {
    if (response.status === 200) {
      this.setState({
        isLoaded: true,
        userName: response.data.userName,
        profileTitle: response.data.title,
        profileBlurb: response.data.blurb,
        profileEducation: response.data.education,
        profileOccupation: response.data.occupation,
        profileRelationshipStatus: response.data.relationshipStatus,
        profileLocation: response.data.location,
        profileContactInfo: response.data.contactInfo,
        list: response.data.clubsList,
        showList: true,
      });
      if (response.data.education === 1) {this.setState({education2: "High School"})};
      if (response.data.education === 2) {this.setState({education2: "College"})};
      if (response.data.education === 3) {this.setState({education2: "Masters"})};
      if (response.data.education === 4) {this.setState({education2: "Phd or MD"})};
      if (response.data.education === 5) {this.setState({education2: "Irrelevant"})};
      if (response.data.relationshipStatus === 1) {this.setState({relationshipStatus2: "Available"})};
      if (response.data.relationshipStatus === 2) {this.setState({relationshipStatus2: "Not Available"})};
      if (response.data.relationshipStatus === 3) {this.setState({relationshipStatus2: "whatever"})};
      } // end if
           }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
           });
    }

    // not used. but save for Guilds use later....
  getQsets() {
        let url = this.props.location.search;
        let params = queryString.parse(url);
        let user = params.id;
        this.setState({userName: user});
        axios.get("http://localhost:8080/api/prm/sc/dc?id=" + user)
        .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoaded: true,
            list: response.data,
            showList: true,
          });
          } // end if
          else { this.setState({showList: false}); }
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

   renderTableData() {
      const sortedList = this.state.list.sort((a,b) => (a.created > b.created) ? 1 : ((b.created > a.created) ? -1 : 0));
      return sortedList.map((data, index) => {
         return (
            <tr key={data.index}>
                <td> {data.clubName} &nbsp; &nbsp;</td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = ["Title", "Description","Score", "Result"]
      return header.map((key, index) => {
         return <th key={index}>{key} </th>
      })
   }

    render() {
        return (
        <React.Fragment>

        <TitleBar3 userName={this.state.userName} />

            <div class="topParentDiv">
            <div class="settings2ButtonsDiv">
                <div>
                <p class="secondP"> {this.state.userName} </p><br></br>
                <ProfilePicturePublic url={this.state.url} />
                <p class="secondP"> {this.state.profileTitle} </p><br></br>
                <p class="secondP"> {this.state.profileLocation} </p><br></br><br></br><br></br>
                </div>



        { !this.state.showList &&
         <div class="topParentDiv">
         <div class="secondParentDiv">
         <p class="alertsSmallP"> &nbsp;(nothing to see here)</p>
         </div>
         </div> }

        { this.state.showList &&
         <div class="topParentDiv">
         <div class="secondParentDiv">
            <p> My clubs: </p>
            <table>
               <tbody>
                {this.renderTableData()}
               </tbody>
            </table>
         </div>
         </div> }

        </div>
        </div>
        </React.Fragment>
        )
    }

}

export default PublicUserPages;