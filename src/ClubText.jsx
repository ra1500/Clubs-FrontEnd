import React from "react";
import axios from 'axios';

class ClubText extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange6 = this.handleChange6.bind(this);
    this.handleChange8 = this.handleChange8.bind(this);
    this.handleChange9 = this.handleChange9.bind(this);
    this.handleChange10 = this.handleChange10.bind(this);
    this.handleChange11 = this.handleChange11.bind(this);
    this.handleChange12 = this.handleChange12.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleChange13 = this.handleChange13.bind(this);
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    this.state = {
    userName: u,
    alpha: null,
    updatedMessage: null,
    showSubmit: true,
    maxSize: 20, // default size.
    headline1: null,
    headline2: null,
    headline3: null,
    headline4: null,
    headline5: null,
    clubMode: 1,
    clubMode2: null,
    };
  }

  componentDidMount() {
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
    this.postClubText();
  }
   handleChange13(event) {
     this.setState({clubMode: event.target.value});
   }

  postClubText() {

          if ( this.state.clubMode == 2 ) this.setState({clubMode2: "Public"});
          else this.setState({clubMode2: "Private"});

    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u + ':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    let data = {clubName : this.state.clubName, description: this.state.description, maxSize: this.state.maxSize, headline1: this.state.headline1, headline2: this.state.headline2, headline3: this.state.headline3, headline4: this.state.headline4, headline5: this.state.headline5, clubMode: this.state.clubMode};
    axios.post("http://localhost:8080/api/c/b", data,
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
    this.setState({isLoaded: true, showSubmit: false, maxSize: response.data.maxSize, alpha: u,
              });
    if (response.data.founder == "OVER LIMIT") { this.setState({ updatedMessage: " Sorry, you have already reached your limit of 30 clubs joined" }) }
    else { this.setState({ updatedMessage: " Club has been added" }) };
           }).catch(error => {this.setState({ isLoaded: true, error});
           });
  }

  render() {
    return (
    <div id="meSettingsDiv">

          { this.state.showSubmit &&
          <div>
                  <form id="inviteRadio1">
                      <div>
                        <label><input value="1" onChange={this.handleChange13} type="radio" name="optradio" /> Private: By invitation only. (default) </label>
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
          <td> Club name </td>
          <td><input className="clubTextBox" maxlength="40" type="text" value={this.state.clubName} onChange={this.handleChange2}  autocomplete="off" placeholder=""/></td>
          </tr>
          <tr>
          <td> Description: </td>
          <td><input className="clubTextBox" maxlength="80" type="text" value={this.state.description} onChange={this.handleChange3}  autocomplete="off" placeholder=""/></td>
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
          <td> Max. membership size: </td>
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
           <button type="submit" onClick={this.handleSubmit1} className="updateButton"> Submit </button> }
           { !this.state.showSubmit &&
           <span class="updateParagraph">{this.state.updatedMessage}</span> }
    </div>

    );
  }
}

export default ClubText;