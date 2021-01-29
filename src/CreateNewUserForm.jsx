import React from "react";
import axios from 'axios';

class CreateNewUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          verifyMessage: null,
          showMessage: true,
          countOfUsersCreated: "hell",
          showCount: false,
        };
  }

    componentDidMount() {
        this.getCountOfUsersCreated();
    }

  handleChange1(event) {
    this.setState({userName: event.target.value});
  }

  handleChange2(event) {
    this.setState({password: event.target.value});
  }

  handleChange3(event) {
    this.setState({verifyPassword: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (window.confirm('Please confirm new user creation')) {
    this.postNewUser();
    }
  }

  getCountOfUsersCreated() {
          const name = JSON.parse(sessionStorage.getItem('tokens'));
          const u = name.userName;
          const p = name.password;
          const token = u +':' + p;
          const hash = btoa(token);
          const Basic = 'Basic ' + hash;
          axios.get("http://localhost:8080/api/user/pc",
          {headers : { 'Authorization' : Basic }})
          .then((response) => {
           if (response.status === 200) {
            this.setState({
              isLoaded: true,
              countOfUsersCreated: response.data.relationshipStatus,
              showCount: true,
            });
            } // end if
                 }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
                 });
      }

  postNewUser() {
    if (this.state.password !== this.state.verifyPassword) {this.setState({showMessage: false, verifyMessage: "Password fields did not match."}); }
    else if (this.state.userName.length < 8) {this.setState({showMessage: false, verifyMessage: "username should be at least 8 characters long."}); }
    else if (this.state.password.length < 8) {this.setState({showMessage: false, verifyMessage: "password should be at least 8 characters long"}); }
    else { // else1

        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { userName: this.state.userName, password: this.state.password };
        axios.post("http://localhost:8080/api/user/signup", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        if (response.status === 204) { this.setState({countOfUsersCreated: response.relationshipStatus, verifyMessage: "Sorry, username already used. Please choose another." });}
        else if (response.status === 200) {
        this.setState({verifyMessage: "new user added" });
        this.getCountOfUsersCreated();
        }
        else { this.setState({verifyMessage: "error" });}
               }).catch(error => {this.setState({ isLoaded: true, error});
               });

    } // end else1
  }


  render() {
    return (
    <React.Fragment>
      <div class="topParentDiv">
        <p class="questionsParagraph"> Create a new user to join NeuralJuice (you are limited to adding 50 new users) </p>
        <p class="questionsParagraph"> After providing someone with a login they can change their password in Profile -> Settings. </p>

        { this.state.showCount &&
        <div>
        <p> Count of users added: {this.state.countOfUsersCreated}</p>
        </div> }

        { !this.state.showCount &&
        <div>
        <p> Count of users added: {this.state.countOfUsersCreated}</p>
        </div> }

        <p></p>
        <div class="secondParentDiv">
      <div>
            <input class="signupBox" maxlength="100" type="username" value={this.state.userName} onChange={this.handleChange1} placeholder="username" />
            <input class="signupBox" maxlength="100" type="password" value={this.state.password} onChange={this.handleChange2} placeholder="password" />
            <input class="signupBox" maxlength="100" type="password" value={this.state.verifyPassword} onChange={this.handleChange3} placeholder="confirm password" />
            <button class="updateButton" onClick={this.handleSubmit}>Add</button>
      </div>

        { this.state.showMessage &&
        <div>
        <p id="deletedAnswersMessage">{this.state.verifyMessage}</p>
        </div> }

        { !this.state.showMessage &&
        <div>
        <p id="deletedAnswersMessage">{this.state.verifyMessage}</p>
        </div> }

        </div>
      </div>
    </React.Fragment>
    );
  }
}

export default CreateNewUserForm;