import React from "react";
import axios from 'axios';
import MessagesList from "./MessagesList";

class MessageBoardSingle extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addToList = this.addToList.bind(this);
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
    list2: null,
    scrollPageNumber: 0,
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

  handleKeyDown(e){
    if (e.key === 'Enter') {
      this.postMessage();
    }
  }
  scrollToBottom() {
      let elmnt = document.getElementById("end");
    elmnt.scrollIntoView();
  }
  scrollToTop() {
      let elmnt = document.getElementById("start");
    elmnt.scrollIntoView();
  }

  addToList() {
    let newPageNo = ++this.state.scrollPageNumber;
    this.setState({scrollPageNumber: newPageNo});
    if ( newPageNo < 11 ) { this.getMessagesList(); }; // limit to 10 pulls
  }

  postMessage() {
    const name = JSON.parse(sessionStorage.getItem('tokens'));
    const u = name.userName;
    const p = name.password;
    const token = u + ':' + p;
    const hash = btoa(token);
    const Basic = 'Basic ' + hash;
    let data = {message : this.state.clubMessage, receiverType: 1, receiverId: this.props.singleClubMemberId, clubName: this.props.clubName };
    axios.post("http://localhost:8080/api/m/b", data,
    {headers : { 'Authorization' : Basic }})
    .then((response) => {
    this.setState({isLoaded: true,
        scrollPageNumber: 0,  // set to zero in order to auto scroll to bottom of list again
        list: null, // need to clear list so to start infinite scroll over
    });
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
        axios.get("http://localhost:8080/api/m/i?iId=" + this.props.singleClubMemberId  + "&pN=" + this.state.scrollPageNumber,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
         if (response.status === 200) {

            if (this.state.list == null)
             { this.setState({ list: response.data,
                         showMessagesList: !this.state.showMessagesList, // initial list rendering
                         showMessagesList2: true, // stays true since response is '200' and there is content to pass down to child.
                         showMessagesList3: !this.state.showMessagesList3,
                         clubMessage: null,
                });
             }

            else {
            this.setState({ list: this.state.list.concat(response.data),
                         showMessagesList: !this.state.showMessagesList, // initial list rendering
                         showMessagesList2: true, // stays true since response is '200' and there is content to pass down to child.
                         showMessagesList3: !this.state.showMessagesList3,
                         clubMessage: null,
              }) };
          if (this.state.scrollPageNumber == 0) { this.scrollToBottom(); }
          else { this.scrollToTop(); };
          //this.scrollToBottom();
          } // end if
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }


  render() {
    return (
    <div id="meSettingsDiv">

        { this.state.showMessagesList &&
        <div>
        <MessagesList list={this.state.list} showMessagesList2={this.state.showMessagesList2} addToList={this.addToList} />
        </div> }
        { this.state.showMessagesList3 &&
        <div>
        <MessagesList list={this.state.list} showMessagesList2={this.state.showMessagesList2} addToList={this.addToList} />
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

export default MessageBoardSingle;