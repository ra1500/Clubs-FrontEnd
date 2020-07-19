import React from 'react';
import axios from 'axios';

class ProfilePictureClubMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memberId: this.props.memberId,
            clubId: this.props.clubId,
            defaultPicture: "./profiledefault.jpg",
            showProfilePicture: false,
        };
    }

componentDidMount() {
    this.getProfilePicture();
}

  getProfilePicture() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u +':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    axios({
      method: 'get',
      url: "http://localhost:8080/api/files/k?mId=" + this.props.memberId + "&cId=" + this.props.clubId,
      responseType: 'blob',
      headers : { 'Authorization' : Basic },
    })
    .then((response) => {
        const file = new Blob([response.data], {type:'image/jpg'});
        const imgUrl = window.URL.createObjectURL(file);
      this.setState({
        isLoaded: true,
        profilePicture: imgUrl,
        showProfilePicture: true,
      });
           }).catch(error => {this.setState({ isLoaded: true, error, });
           });
    }

    render() {
        return (
        <React.Fragment>

        { !this.state.showProfilePicture &&
         <div>
         <img id="profilePic" src={this.state.defaultPicture}></img>
         </div> }

      { this.state.showProfilePicture &&
          <div>
            <img id="profilePic" src={this.state.profilePicture}></img>
          </div> }

      </React.Fragment>
        )
    }

}



export default ProfilePictureClubMember;