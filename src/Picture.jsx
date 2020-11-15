import React from "react";
import axios from 'axios';

class Picture extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.fileInput = React.createRef();
    this.state = {
    profilePicture: this.props.profilePicture,
    //showPicture: false,
    };
  }

//  componentDidMount() {
//    this.getProfilePicture();
//  }

  handleSubmit1() {
    //this.setState({showPicture: false});
    this.uploadProfilePicture();
  }

  handleSubmit2() {
    if (window.confirm('Are you sure you want to delete\nyour profile pic?')) {
    //this.setState({showPicture: false});
    this.props.deleteProfilePicture();
    }
  }

  uploadProfilePicture() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u +':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;

    const formData = new FormData();
    formData.append("image", this.fileInput.current.files[0]);

    if (this.fileInput.current.files[0] !== undefined) {
    axios({
      method: 'post',
      url: "http://localhost:8080/api/files/g?fnm=1",
      headers : { 'Authorization' : Basic, 'Content-Type': 'multipart/form-data' },
      data: formData,
    })
    .then((response) => {
      this.setState({
        isLoaded: true,
      });
      //this.getProfilePicture();
      this.props.getProfilePicture();
           }).catch(error => {this.setState({ isLoaded: true, error, });
           });
     }
    else { this.setState({showPicture: true}); }
    }



  render() {
    return (
    <div id="meSettingsDiv">
        <img id="profilePic2" src={this.props.profilePicture}></img>
        <p className="noLineSpaceP"> Must be &lt; 250kb in size and in .jpg or .jpeg format. Display is 80px X 80px.</p>
        <p className="noLineSpaceP"> Sorry, not 'auto re-sizing' your pics yet. You'll need to down size them yourself for now.</p>
        <input className="browseButton" type="file" ref={this.fileInput} />
        <p className="noLineSpaceP"> <button type="submit" onClick={this.handleSubmit1} className="updateButton"> Upload </button> </p>
        <p className="noLineSpaceP"> <button type="submit" onClick={this.handleSubmit2} className="updateButton"> Delete </button> </p>

    </div>

    );
  }
}

export default Picture;