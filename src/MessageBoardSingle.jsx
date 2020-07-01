import React from "react";
import axios from 'axios';
import MessagesList from "./MessagesList";

class MessageBoardSingle extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    this.state = {
    userName: u,
    clubMessage: null,
    updatedMessage: null,
    receiverId: null,
    receiverType: null,
    showMessagesList: false,
    showMessagesList2: false,
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
    this.postMessage();
  }

  postMessage() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u + ':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    let data = {message : this.state.clubMessage, receiverType: 1, receiverId: this.props.singleClubMemberId };
    axios.post("http://localhost:8080/api/m/b", data,
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
    this.setState({isLoaded: true,
            updatedMessage: " Message Posted.",
              });
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
        axios.get("http://localhost:8080/api/m/i?iId=" + this.props.singleClubMemberId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
         if (response.status === 200) {
          this.setState({
            isLoaded: true,
            list: response.data,
            showMessagesList2: true,
            showMessagesList: true,
          });
          } // end if
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }


  render() {
    return (
    <div id="meSettingsDiv">

          <div class="askDiv">
          <input id="newQuestion" maxlength="80" type="text" value={this.state.clubMessage} onChange={this.handleChange}  autocomplete="off" placeholder="Message"/>
          </div>
            <button type="submit" onClick={this.handleSubmit1} className="inviteAuditButton"> Send </button>
            <span class="updateParagraph">{this.state.updatedMessage}</span>

        { this.state.showMessagesList &&
        <div>
        <MessagesList list={this.state.list} showMessagesList2={this.state.showMessagesList2}  />
        </div> }



    </div>

    );
  }
}

export default MessageBoardSingle;