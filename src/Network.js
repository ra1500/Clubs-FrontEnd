import React from "react";
import axios from 'axios';
import ContactsListFriends from "./ContactsListFriends";
import ContactsListColleagues from "./ContactsListColleagues";
import ContactsListFamily from "./ContactsListFamily";
import ContactsListPending from "./ContactsListPending";
import ContactsListRemoved from "./ContactsListRemoved";
import InvitationForm from "./InvitationForm";
import ManageMyContactsRemoved from "./ManageMyContactsRemoved";
import NetworkContactPages from "./NetworkContactPages";
//import NetworkContactAudit from "./NetworkContactAudit";
//import { Link } from 'react-router-dom';

class Network extends React.Component {
  constructor(props) {
    super(props);
    this.goToRemovedContacts = this.goToRemovedContacts.bind(this);
    this.renderSingleContact = this.renderSingleContact.bind(this);
    this.renderSingleContactFromPicture = this.renderSingleContactFromPicture.bind(this);
    this.renderSingleContactRemoved = this.renderSingleContactRemoved.bind(this);
    this.auditMe = this.auditMe.bind(this);
    this.sendFriend = this.sendFriend.bind(this);
    this.goToNetworkContactsList = this.goToNetworkContactsList.bind(this);
    this.goToInvite = this.goToInvite.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          friend: null,
          inviter: null,
          userName: null,
          showNetworkListFriends: false,
          showNetworkListFamily: false,
          showNetworkListColleagues: false,
          showNetworkListPending: false,
          showRemovedList: false,
          showRemovedListDetails: false,
          showSingleContact: false,
          questionSetVersionEntityId: null, // used in questionSet auditing below.
          showInviteFriends: false,
          list: null,
        };
  }

    componentDidMount() {
        this.getFriendships(1);
    }

    getFriendships(e) {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/user/n",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
         if (response.status === 200) {
          this.setState({
            isLoaded: true,
            list: response.data.friendsList,
            showNetworkListDetails: true,
          });
          if (e == 1) { this.setState({showNetworkListFriends: true}); }
          else if (e == 2) { this.setState({showNetworkListFamily: true, showNetworkListFriends: false,}); }
          else if (e == 3) { this.setState({showNetworkListColleagues: true}); }
          else if (e == 4) { this.setState({showNetworkListPending: true}); }
          else { this.setState({showNetworkListFriends: true}); };
          } // end 1st if
          else {
            this.setState({showNetworkListFriends: true});
          }; // end 2nd if
               }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
               });
    }

    getRemovedFriendships() {
        const name = JSON.parse(sessionStorage.getItem('tokens'));
        const u = name.userName;
        const p = name.password;
        const token = u +':' + p;
        const hash = btoa(token);
        const Basic = 'Basic ' + hash;
        axios.get("http://localhost:8080/api/user/r",
        {headers : { 'Authorization' : Basic }})
        .then((response) => {
         if (response.status === 200) {
          this.setState({
            isLoaded: true,
            list: response.data.friendsList,
            showRemovedListDetails: true,
          });
          } // end if
          this.setState({showRemovedList: true});
               }).catch(error => {this.setState({ isLoaded: true, error, userScore: 0});
               });
    }

    renderSingleContact(event) {
        const data = {id: event.target.value};
        this.state = {friendId: data.id};
        this.setState({friendId: this.state.friendId}); // sillyness.
        this.setState({showNetworkListFriends: false, showNetworkListFamily: false, showNetworkListColleagues: false, showNetworkListPending: false,});
        this.setState({showRemovedList: false, showRemovedListDetails: false,});
        this.setState({showSingleContact: true});
        event.preventDefault();
    }

    renderSingleContactFromPicture(friendId2) {
        this.state = {friendId: friendId2};
        this.setState({friendId: this.state.friendId}); // sillyness.
        this.setState({showNetworkListFriends: false, showNetworkListFamily: false, showNetworkListColleagues: false, showNetworkListPending: false,});
        this.setState({showRemovedList: false, showRemovedListDetails: false,});
        this.setState({showSingleContact: true});
    }

    renderSingleContactRemoved(event) {
        const data = {id: event.target.value};
        this.setState({friendId: data.id});
        this.setState({showNetworkList: false, showNetworkListDetails: false,});
        this.setState({showRemovedList: false, showRemovedListDetails: false,});
        this.setState({showSingleContactRemoved: true});
    }

    auditMe(event) {
        this.setState({questionSetVersionEntityId: event.target.value});
    }

    goToNetworkContactsList(e) {
        this.setState({showSingleContact: false, showRemovedList: false, showRemovedListDetails: false, showSingleContactRemoved: false, showInviteFriends: false});
        this.setState({showNetworkListFriends: false, showNetworkListFamily: false, showNetworkListColleagues: false, showNetworkListPending: false, showNetworkListDetails: false,});
        this.getFriendships(e); // list can only be used once. so must call again...
    }
    goToInvite() {
        this.setState({showInviteFriends: true, showNetworkListFriends: false, showNetworkListFamily: false, showNetworkListColleagues: false, showNetworkListPending: false, showNetworkListDetails: false, showSingleContact: false, showRemovedList: false, showRemovedListDetails: false, showSingleContactRemoved: false});
    }
    goToRemovedContacts() {
        this.setState({showInviteFriends: false, showNetworkListFriends: false, showNetworkListFamily: false, showNetworkListColleagues: false, showNetworkListPending: false, showNetworkListDetails: false, showSingleContact: false, showRemovedList: false, showRemovedListDetails: false, showSingleContactRemoved: false});
        this.getRemovedFriendships();
    }

    sendFriend(event) {
        const data = {friend: event.target.value};
        this.setState({friend: data.friend});
    }

  render() {
    return (
    <React.Fragment>

          {this.state.showNetworkListFriends &&
          <div class="settings3ButtonsDiv">
            <button id="myNetworkButtonOn" onClick={() => this.goToNetworkContactsList(1)}> Friends </button>
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(2)}> Family </button>
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(3)}> Colleagues </button>
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(4)}> Pending </button>
            <button id="myNetworkButton" onClick={this.goToRemovedContacts}> Removed </button>
            <button id="myNetworkButton" onClick={this.goToInvite}> Invite </button>
          </div> }

          {this.state.showNetworkListFamily &&
          <div class="settings3ButtonsDiv">
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(1)}> Friends </button>
            <button id="myNetworkButtonOn" onClick={() => this.goToNetworkContactsList(2)}> Family </button>
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(3)}> Colleagues </button>
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(4)}> Pending </button>
            <button id="myNetworkButton" onClick={this.goToRemovedContacts}> Removed </button>
            <button id="myNetworkButton" onClick={this.goToInvite}> Invite </button>
          </div> }

          {this.state.showNetworkListColleagues &&
          <div class="settings3ButtonsDiv">
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(1)}> Friends </button>
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(2)}> Family </button>
            <button id="myNetworkButtonOn" onClick={() => this.goToNetworkContactsList(3)}> Colleagues </button>
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(4)}> Pending </button>
            <button id="myNetworkButton" onClick={this.goToRemovedContacts}> Removed </button>
            <button id="myNetworkButton" onClick={this.goToInvite}> Invite </button>
          </div> }

          {this.state.showNetworkListPending &&
          <div class="settings3ButtonsDiv">
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(1)}> Friends </button>
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(2)}> Family </button>
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(3)}> Colleagues </button>
            <button id="myNetworkButtonOn" onClick={() => this.goToNetworkContactsList(4)}> Pending </button>
            <button id="myNetworkButton" onClick={this.goToRemovedContacts}> Removed </button>
            <button id="myNetworkButton" onClick={this.goToInvite}> Invite </button>
          </div> }

          {this.state.showRemovedList &&
          <div class="settings3ButtonsDiv">
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(1)}> Friends </button>
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(2)}> Family </button>
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(3)}> Colleagues </button>
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(4)}> Pending </button>
            <button id="myNetworkButtonOn" onClick={this.goToRemovedContacts}> Removed </button>
            <button id="myNetworkButton" onClick={this.goToInvite}> Invite </button>
          </div> }

          {this.state.showInviteFriends &&
          <div class="settings3ButtonsDiv">
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(1)}> Friends </button>
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(2)}> Family </button>
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(3)}> Colleagues </button>
            <button id="myNetworkButton" onClick={() => this.goToNetworkContactsList(4)}> Pending </button>
            <button id="myNetworkButton" onClick={this.goToRemovedContacts}> Removed </button>
            <button id="myNetworkButtonOn" onClick={this.goToInvite}> Invite </button>
          </div> }

        {this.state.showNetworkListFriends &&
        <ContactsListFriends list={this.state.list} showNetworkListDetails={this.state.showNetworkListDetails} renderSingleContact={this.renderSingleContact} renderSingleContactFromPicture={this.renderSingleContactFromPicture} sendFriend={this.sendFriend}/>  }

        {this.state.showNetworkListFamily &&
        <ContactsListFamily list={this.state.list} showNetworkListDetails={this.state.showNetworkListDetails} renderSingleContact={this.renderSingleContact} renderSingleContactFromPicture={this.renderSingleContactFromPicture} sendFriend={this.sendFriend}/>  }

        {this.state.showNetworkListColleagues &&
        <ContactsListColleagues list={this.state.list} showNetworkListDetails={this.state.showNetworkListDetails} renderSingleContact={this.renderSingleContact} renderSingleContactFromPicture={this.renderSingleContactFromPicture} sendFriend={this.sendFriend}/>  }

        {this.state.showNetworkListPending &&
        <ContactsListPending list={this.state.list} showNetworkListDetails={this.state.showNetworkListDetails} renderSingleContact={this.renderSingleContact} renderSingleContactFromPicture={this.renderSingleContactFromPicture} sendFriend={this.sendFriend}/>  }

        {this.state.showInviteFriends &&
        <InvitationForm /> }

        {this.state.showRemovedList &&
        <ContactsListRemoved list={this.state.list} showRemovedListDetails={this.state.showRemovedListDetails} renderSingleContactRemoved={this.renderSingleContactRemoved}/> }

        {this.state.showSingleContact &&
        <NetworkContactPages friendId={this.state.friendId}/> }

        {this.state.showSingleContactRemoved &&
        <ManageMyContactsRemoved friendId={this.state.friendId}/> }



    </React.Fragment>
    );
    }

}

export default Network;