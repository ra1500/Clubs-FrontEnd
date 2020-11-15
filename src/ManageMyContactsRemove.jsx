import React from "react";
import axios from 'axios';

class ManageMyContactsRemove extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          friendId: this.props.friendId,
          connectionType: this.props.connectionType,
          connectionStatus: null,
          visibilityPermission: this.props.visibilityPermission,
          inviter: null,
          hasPendingInvitations: false,
          isAfriend: true,
          friendBeingManaged: null,
          showDeletedMessage: false,
          showRemoveButton: true,
          deletedMessage: "(contact has been removed)",
          currentType: this.props.connectionType,
          currentVisibility: this.props.visibilityPermission,
        };
  }

    componentDidMount() {
        this.manageUpdate();
    }

    removeFriendship() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u + ':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        let data = { id: this.props.friendId, };
        axios.post("http://localhost:8080/api/f/e", data,
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
        this.setState({isLoaded: true, showRemoveButton : false, showDeletedMessage : true,
                  });
               }).catch(error => {this.setState({ isLoaded: true, error});
               });
    }

  handleSubmit2(event) {
    event.preventDefault();
    this.removeFriendship();
  }

  manageUpdate() {
    if (this.props.connectionStatus == "pending") {
        this.setState({isAfriend: false, hasPendingInvitations: true});
     }
    else {
        this.setState({isAfriend: true, hasPendingInvitations: false});
    }
  }

  render() {
    return (
    <React.Fragment>
    <div >

      { this.state.hasPendingInvitations &&
      <div>
                <p> You can remove your pending contact here. You can undo this in your removed members list.</p>
                { this.state.showDeletedMessage &&
                <p id="deletedAnswersMessage"> {this.state.deletedMessage} </p> }
                { this.state.showRemoveButton &&
                <button type="submit" onClick={this.handleSubmit2} className="updateButton"> Remove </button> }
      </div> }

      { this.state.isAfriend &&
       <div class="invitationForm">
                 <p> You can remove your contact here. You can undo this in your removed members list.</p>
                { this.state.showDeletedMessage &&
                <p id="deletedAnswersMessage"> {this.state.deletedMessage} </p> }
                { this.state.showRemoveButton &&
                <button type="submit" onClick={this.handleSubmit2} className="updateButton"> Remove </button> }
      </div> }

    </div>
    </React.Fragment>
    );
  }
}

export default ManageMyContactsRemove;