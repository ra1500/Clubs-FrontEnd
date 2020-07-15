import React from "react";
import axios from 'axios';
import MessagesList from "./MessagesList";

class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    this.state = {
    userName: u,
    clubMessage: null,
    receiverId: null,
    receiverType: null,
    showMessagesList: false,
    showMessagesList2: false,
    showMessagesList3: true,
    list: null,
    };
  }

  componentDidMount() {
    this.getMessagesList();
  }

     handleChange(event) {
       this.setState({clubMessage: event.target.value});
     }

  handleSubmit1(event) {
    event.preventDefault();
    this.postClubMessage();
  }

  handleKeyDown(e){
    if (e.key === 'Enter') {
      this.postClubMessage();
    }
  }
  scrollToBottom() {
      let elmnt = document.getElementById("end");
    elmnt.scrollIntoView();
  }

  postClubMessage() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u + ':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    let data = {message : this.state.clubMessage, receiverType: 2, receiverId: this.props.clubId };
    axios.post("http://localhost:8080/api/m/b", data,
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
    this.setState({isLoaded: true,});
    this.getMessagesList();
           }).catch(error => {this.setState({ isLoaded: true, error});
           });
  }

    getMessagesList() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/m/c?cId=" + this.props.clubId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
         if (response.status === 200) {
          this.setState({
            isLoaded: true,
            list: response.data,
            showMessagesList: !this.state.showMessagesList, // initial list rendering
            showMessagesList2: true, // stays true since response is '200' and there is content to pass down to child.
            showMessagesList3: !this.state.showMessagesList3,
            clubMessage: null,
          });
          this.scrollToBottom();
          } // end if
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }


  render() {
    return (
    <div id="meSettingsDiv">

        { this.state.showMessagesList &&
        <div>
        <MessagesList list={this.state.list} showMessagesList2={this.state.showMessagesList2}  />
        </div> }
        { this.state.showMessagesList3 &&
        <div>
        <MessagesList list={this.state.list} showMessagesList2={this.state.showMessagesList2}  />
        </div> }

        { this.state.showMessagesList &&
        <div id="msgInputDiv">
        <input id="newQuestion" onKeyDown={this.handleKeyDown} maxlength="254" type="text" value={this.state.clubMessage} onChange={this.handleChange}  autocomplete="off" autoFocus="autoFocus" />
        <button type="submit" onClick={this.handleSubmit1} className="msgSendButton"> Send </button>
        </div> }
        { this.state.showMessagesList3 &&
        <div id="msgInputDiv">
        <input id="newQuestion" onKeyDown={this.handleKeyDown} maxlength="254" type="text" value={this.state.clubMessage} onChange={this.handleChange}  autocomplete="off" autoFocus="autoFocus" />
        <button type="submit" onClick={this.handleSubmit1} className="msgSendButton"> Send </button>
        </div> }

    </div>

    );
  }
}

export default MessageBoard;