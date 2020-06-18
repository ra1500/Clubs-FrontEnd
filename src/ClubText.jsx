import React from "react";
import axios from 'axios';

class ClubText extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange6 = this.handleChange6.bind(this);
    this.handleChange7 = this.handleChange7.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    this.state = {
    userName: u,
    clubName: null,
    description: null,
    maxSize: null,
    alpha: u,
    updatedMessage: null,
    };
  }

  componentDidMount() {
  }

     handleChange2(event) {
       this.setState({clubName: event.target.value});
     }
     handleChange3(event) {
       this.setState({description: event.target.value});
     }
     handleChange6(event) {
       this.setState({maxSize: event.target.value});
     }
     handleChange7(event) {
       this.setState({alpha: event.target.value});
     }

  handleSubmit1(event) {
    event.preventDefault();
    if (this.state.maxSize === null) {
        this.state = {maxSize: "20"};
    }
    this.postClubText();
  }

  postClubText() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u + ':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    let data = {clubName : this.state.clubName, description: this.state.description, maxSize: this.state.maxSize,
     alpha: this.state.alpha,};
    axios.post("http://localhost:8080/api/c/b", data,
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
    this.setState({isLoaded: true,
            //publicProfile: response.data.publicProfile,
            updatedMessage: " Club has been updated.",
              });
           }).catch(error => {this.setState({ isLoaded: true, error});
           });
  }

  render() {
    return (
    <div id="meSettingsDiv">
        <p> New Club </p>

          <div class="askDiv"><span class="askText">Club Name &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
          <input id="newQuestion" maxlength="80" type="text" value={this.state.clubName} onChange={this.handleChange2}  autocomplete="off" placeholder="Club Name"/>
          </div>
          <div class="askDiv"><span class="askText">Description &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
          <input id="newQuestion" maxlength="80" type="text" value={this.state.description} onChange={this.handleChange3}  autocomplete="off" placeholder=""/>
          </div>
          <div class="askDiv"><span class="askText">Maximum Occupancy &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
          <input id="newQuestion" maxlength="80" type="text" value={this.state.maxSize} onChange={this.handleChange6}  autocomplete="off" placeholder=""/>
          </div>
          <div class="askDiv"><span class="askText">The Alpha &nbsp;</span>
          <input id="newQuestion" maxlength="80" type="text" value={this.state.alpha} onChange={this.handleChange7}  autocomplete="off" placeholder=""/>
          </div>
            <button type="submit" onClick={this.handleSubmit1} className="inviteAuditButton"> Update </button>
            <span class="updateParagraph">{this.state.updatedMessage}</span>
    </div>

    );
  }
}

export default ClubText;