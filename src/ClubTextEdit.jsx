import React from "react";
import axios from 'axios';

class ClubTextEdit extends React.Component {
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
    alpha: u,
    updatedMessage: null,
    showSubmit: true,
    clubName: null,
    description: null,
    maxSize: 20,
    };
  }

  componentDidMount() {
    this.renderSingleClub();
  }

     handleChange2(event) {
        this.state = {clubName2: event.target.value};
        this.setState({clubName: this.state.clubName2});
     }
     handleChange3(event) {
        this.state = {description2: event.target.value};
        this.setState({description: this.state.description2});
     }
     handleChange6(event) {
        this.state = {maxSize2: event.target.value};
        this.setState({maxSize: this.state.maxSize2});

     }
     handleChange7(event) {
       this.state = {alpha2: event.target.value};
       this.setState({alpha: this.state.alpha2});
     }

  handleSubmit1(event) {
    event.preventDefault();
    this.postClubEditText();
  }

  renderSingleClub() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/c/a?cId=" + this.props.clubId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
         if (response.status === 200) {
          this.setState({
            isLoaded: true,
            clubId: response.data.id,
            clubName: response.data.clubName,
            description: response.data.description,
            clubAlpha: response.data.alpha,
            membersList: response.data.members,
            maxSize: response.data.maxSize,
            showClubsList: false,
            showSingleClub: true,
          });
          } // end if
          else { this.setState({showClubsList: false}); }
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  postClubEditText() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u + ':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    let data = {id: this.props.clubId, clubName : this.state.clubName, description: this.state.description, maxSize: this.state.maxSize,
     alpha: this.state.alpha,};
    axios.post("http://localhost:8080/api/c/d", data,
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
    this.setState({isLoaded: true, updatedMessage: " Club has been updated.", showSubmit: false, maxSize: response.data.maxSize,
              });
           }).catch(error => {this.setState({ isLoaded: true, error});
           });
  }

  render() {
    return (
    <div id="meSettingsDiv">

          { this.state.showSubmit &&
          <div>
          <table>
          <tr>
          <td> Club name: </td>
          <td><input className="clubTextBox" maxlength="40" type="text" value={this.state.clubName} onChange={this.handleChange2}  autocomplete="off" placeholder=""/></td>
          </tr>
          <tr>
          <td> Description: </td>
          <td><input className="clubTextBox" maxlength="80" type="text" value={this.state.description} onChange={this.handleChange3}  autocomplete="off" placeholder=""/></td>
          </tr>
          <tr>
          <td> Alpha member: </td>
          <td> {this.state.alpha} </td>
          </tr>
          <tr>
          <td> Max. membership size: </td>
          <td><input id="clubTextBoxSize" maxlength="3" type="text" value={this.state.maxSize} onChange={this.handleChange6}  autocomplete="off" placeholder="#"/></td>
          </tr>
          </table>
          </div> }

          { !this.state.showSubmit &&
          <div>
          <table>
          <tr>
          <td> Club name: </td>
          <td> {this.state.clubName} </td>
          </tr>
          <tr>
          <td> Description: </td>
          <td>{ this.state.description} </td>
          </tr>
          <tr>
          <td> Alpha member: </td>
          <td> {this.state.alpha} </td>
          </tr>
          <tr>
          <td> Max. membership size: </td>
          <td> {this.state.maxSize} </td>
          </tr>
          </table>
          </div> }

           { this.state.showSubmit &&
           <button type="submit" onClick={this.handleSubmit1} className="seeDetailsButton"> Update </button> }
           { !this.state.showSubmit &&
           <span class="updateParagraph">{this.state.updatedMessage}</span> }
    </div>

    );
  }
}

export default ClubTextEdit;