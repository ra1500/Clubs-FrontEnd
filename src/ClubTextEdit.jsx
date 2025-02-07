import React from "react";
import axios from 'axios';
import ClubMembersRemove from './ClubMembersRemove';

class ClubTextEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange6 = this.handleChange6.bind(this);
    this.handleChange7 = this.handleChange7.bind(this);
    this.handleChange8 = this.handleChange8.bind(this);
    this.handleChange9 = this.handleChange9.bind(this);
    this.handleChange10 = this.handleChange10.bind(this);
    this.handleChange11 = this.handleChange11.bind(this);
    this.handleChange12 = this.handleChange12.bind(this);
    this.handleChange13 = this.handleChange13.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.refreshMembersList = this.refreshMembersList.bind(this);
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
    headline1: null,
    headline2: null,
    headline3: null,
    headline4: null,
    headline5: null,
    showMembersList: false,
    showMembersList2: false,
    //showMembersList3: false,
    membersList: null,
    clubMode: 1,
    clubMode2: null,
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
     handleChange8(event) {
       this.state = {headline1b: event.target.value};
       this.setState({headline1: this.state.headline1b});
     }
     handleChange9(event) {
       this.state = {headline2b: event.target.value};
       this.setState({headline2: this.state.headline2b});
     }
     handleChange10(event) {
       this.state = {headline3b: event.target.value};
       this.setState({headline3: this.state.headline3b});
     }
     handleChange11(event) {
       this.state = {headline4b: event.target.value};
       this.setState({headline4: this.state.headline4b});
     }
     handleChange12(event) {
       this.state = {headline5b: event.target.value};
       this.setState({headline5: this.state.headline5b});
     }
  handleSubmit1(event) {
    event.preventDefault();
    this.postClubEditText();
  }
   handleChange13(event) {
     this.setState({clubMode: event.target.value});
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
            headline1: response.data.headline1,
            headline2: response.data.headline2,
            headline3: response.data.headline3,
            headline4: response.data.headline4,
            headline5: response.data.headline5,
            membersList: response.data.members,
            maxSize: response.data.maxSize,
            clubMode: response.data.clubMode,
            showMembersList: true,
            //showMembersList2: true,
          });
          if ( this.state.clubMode == 2 ) this.setState({clubMode2: "Public"});
          else this.setState({clubMode2: "Private"});
          if ( this.state.membersList.length < 1 ) this.setState({showMembersList2: false});
          else this.setState({showMembersList2: true});
          } // end if
          else {  }
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

  postClubEditText() {

          if ( this.state.clubMode == 2 ) this.setState({clubMode2: "Public"});
          else this.setState({clubMode2: "Private"});

    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u + ':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    let data = {id: this.props.clubId, clubName : this.state.clubName, description: this.state.description, maxSize: this.state.maxSize,
     headline1: this.state.headline1, headline2: this.state.headline2, headline3: this.state.headline3, headline4: this.state.headline4, headline5: this.state.headline5, clubMode: this.state.clubMode};
    axios.post("http://localhost:8080/api/c/d", data,
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
    this.setState({isLoaded: true, updatedMessage: " Club updated.", showSubmit: false, maxSize: response.data.maxSize,
              });
           }).catch(error => {this.setState({ isLoaded: true, error});
           });
  }

    refreshMembersList() {
        this.renderSingleClub();
        this.setState({showMembersList: !this.state.showMembersList});
    }

  render() {
    return (
    <div id="meSettingsDiv">

          { this.state.showSubmit &&
          <div>
                  <p> ClubMode: {this.state.clubMode2} </p>
                  <form id="inviteRadio1">
                      <div>
                        <label><input value="1" onChange={this.handleChange13} type="radio" name="optradio" /> Private: By invitation only. </label>
                      </div>
                      <div>
                        <label><input value="2" onChange={this.handleChange13} type="radio" name="optradio" /> Public: Anyone can join. </label>
                      </div>
                  </form>
          <table>
          <tr>
          <td> Max. membership size: </td>
          <td><input id="clubTextBoxSize" maxlength="3" type="text" value={this.state.maxSize} onChange={this.handleChange6}  autocomplete="off" placeholder="#"/></td>
          </tr>
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
          <td class="headline1"> Green Headline </td>
          <td><input className="clubTextBox" maxlength="110" type="text" value={this.state.headline1} onChange={this.handleChange8}  autocomplete="off" placeholder="<110 characters"/></td>
          </tr>
          <tr>
          <td class="headline2"> Red Headline </td>
          <td><input className="clubTextBox" maxlength="110" type="text" value={this.state.headline2} onChange={this.handleChange9}  autocomplete="off" placeholder="<110 characters"/></td>
          </tr>
          <tr>
          <td class="headline3"> Blurb 1 </td>
          <td><input className="clubTextBox" maxlength="250" type="text" value={this.state.headline3} onChange={this.handleChange10}  autocomplete="off" placeholder="<250 characters"/></td>
          </tr>
          <tr>
          <td class="headline3"> Blurb 2 </td>
          <td><input className="clubTextBox" maxlength="250" type="text" value={this.state.headline4} onChange={this.handleChange11}  autocomplete="off" placeholder="<250 characters"/></td>
          </tr>
          <tr>
          <td class="headline3"> Blurb 3 </td>
          <td><input className="clubTextBox" maxlength="250" type="text" value={this.state.headline5} onChange={this.handleChange12}  autocomplete="off" placeholder="<250 characters"/></td>
          </tr>
          </table>
          </div> }

          { !this.state.showSubmit &&
          <div>
          <table>
          <tr class="clubTR">
          <td> Club Mode: </td>
          <td> {this.state.clubMode2} </td>
          </tr>
          <tr class="clubTR">
          <td class="clubTR"> Max. membership size: </td>
          <td> {this.state.maxSize} </td>
          </tr>
          <tr class="clubTR">
          <td> Club name: </td>
          <td> {this.state.clubName} </td>
          </tr>
          <tr class="clubTR">
          <td> Description: </td>
          <td>{ this.state.description} </td>
          </tr>
          <tr class="clubTR">
          <td> Alpha member: </td>
          <td> {this.state.alpha} </td>
          </tr>
          </table>
            <p class="headline1"> {this.state.headline1} </p>
            <p class="headline2"> {this.state.headline2} </p>
            <p class="headline3"> {this.state.headline3} </p>
            <p class="headline3"> {this.state.headline4} </p>
            <p class="headline3"> {this.state.headline5} </p>
          </div> }

           { this.state.showSubmit &&
           <button type="submit" onClick={this.handleSubmit1} className="updateButton"> Update </button> }
           { !this.state.showSubmit &&
           <span class="updateParagraph">{this.state.updatedMessage}</span> }

          { this.state.showMembersList &&
          <div>
           <ClubMembersRemove membersList={this.state.membersList} refreshMembersList={this.refreshMembersList} showMembersList2={this.state.showMembersList2} clubId={this.state.clubId} />
          </div> }

          { !this.state.showMembersList &&
          <div>
           <ClubMembersRemove membersList={this.state.membersList} refreshMembersList={this.refreshMembersList} showMembersList2={this.state.showMembersList2} clubId={this.state.clubId} />
          </div> }

    </div>

    );
  }
}

export default ClubTextEdit;