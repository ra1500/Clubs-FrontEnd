import React from "react";
import axios from 'axios';

class ManageMyContactsRemoved extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit5 = this.handleSubmit5.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          friendId: this.props.friendId,
          connectionStatus: null,
          inviter: null,
          connectionType: null,
          visibilityPermission: null,
          hasPendingInvitations: false,
          friendBeingManaged: null,
          showUpdatedMessage: false,
          showUnhideButton: true,
        };
  }

    componentDidMount() {
        this.getSingleFriendship();
    }

    patchFriendship() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: this.state.friendId, };
        axios.post("http://localhost:8080/api/f/f", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true,
                  });
                  this.setState({ showUpdatedMessage: true, showUnhideButton: false});
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

    getSingleFriendship() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/f/" + this.state.friendId,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
          this.setState({
            isLoaded: true,
            inviter: response.data.inviter,
            connectionStatus: response.data.connectionStatus,
            friendBeingManaged: response.data.friend,
          });
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }



  // add back to network list with 'Connected' status.
  handleSubmit5(event) {
    event.preventDefault();
    this.patchFriendship();
  }

    updatedMessage() {
    return (
        <p class="updateParagraph"> {this.state.friendBeingManaged} has been added back to your network.</p>
    )
    }

  render() {
    return (
    <React.Fragment>
    <div class="topParentDiv">
            <p> {this.state.friendBeingManaged} </p>
            <form onSubmit={this.handleSubmit5}>
            <p> Confirm unhide:</p>
             {this.state.showUnhideButton &&
             <button class="updateButton" type="submit"> Unhide </button> }
            </form>

      { this.state.showUpdatedMessage &&
         <div> {this.updatedMessage()} </div>}
    </div>
    </React.Fragment>
    );
  }
}

export default ManageMyContactsRemoved;