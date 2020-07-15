import React from "react";
import axios from 'axios';
import ContactsList from "./ContactsList";
import ContactsListRemoved from "./ContactsListRemoved";
import InvitationForm from "./InvitationForm";
import ManageMyContactsRemoved from "./ManageMyContactsRemoved";
import NetworkContactPages from "./NetworkContactPages";
//import NetworkContactAudit from "./NetworkContactAudit";
import { Link } from 'react-router-dom';
import TitleBar2 from "./TitleBar2";

class Network extends React.Component {
  constructor(props) {
    super(props);
    this.goToRemovedContacts = this.goToRemovedContacts.bind(this);
    this.renderSingleContact = this.renderSingleContact.bind(this);
    this.renderSingleContactRemoved = this.renderSingleContactRemoved.bind(this);
    this.auditMe = this.auditMe.bind(this);
    this.sendFriend = this.sendFriend.bind(this);
    this.goToNetwork = this.goToNetwork.bind(this);
    this.goToInvite = this.goToInvite.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          friend: null,
          inviter: null,
          userName: null,
          showNetworkList: false,
          showNetworkListDetails: false,
          showRemovedList: false,
          showRemovedListDetails: false,
          showSingleContact: false,
          questionSetVersionEntityId: null, // used in questionSet auditing below.
          showInviteFriends: false,
          list: null,
        };
  }

    componentDidMount() {
        this.getFriendships();
    }

    getFriendships() {
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
          } // end if
          this.setState({showNetworkList: true});
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

   renderContactsList() {
    return ( <ContactsList list={this.state.list} showNetworkListDetails={this.state.showNetworkListDetails} renderSingleContact={this.renderSingleContact}
      sendFriend={this.sendFriend}/> )
   }

   renderContactsListRemoved() {
    return ( <ContactsListRemoved list={this.state.list} showRemovedListDetails={this.state.showRemovedListDetails} renderSingleContactRemoved={this.renderSingleContactRemoved}/> )
   }

    renderSingleContact(event) {
        const data = {id: event.target.value};
        this.state = {friendId: data.id};
        this.setState({friendId: this.state.friendId}); // sillyness.
        this.setState({showNetworkList: false, showNetworkListDetails: false,});
        this.setState({showRemovedList: false, showRemovedListDetails: false,});
        this.setState({showSingleContact: true});
        event.preventDefault();
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

    goToNetwork() {
        this.setState({showSingleContact: false, showRemovedList: false, showRemovedListDetails: false, showSingleContactRemoved: false, showInviteFriends: false});
        this.setState({showNetworkList: false, showNetworkListDetails: false,}); // set to true after this in getFriendships()
        this.getFriendships();
    }
    goToInvite() {
        this.setState({showInviteFriends: true, showNetworkList: false, showNetworkListDetails: false, showSingleContact: false, showRemovedList: false, showRemovedListDetails: false, showSingleContactRemoved: false});
    }
    goToRemovedContacts() {
        this.setState({showInviteFriends: false, showNetworkList: false, showNetworkListDetails: false, showSingleContact: false, showRemovedList: false, showRemovedListDetails: false, showSingleContactRemoved: false});
        this.getRemovedFriendships();
    }

    sendFriend(event) {
        const data = {friend: event.target.value};
        this.setState({friend: data.friend});
    }

  render() {
    return (
    <React.Fragment>

        <TitleBar2 />

            {!this.state.showSingleContact &&
          <div class="settings3ButtonsDiv">
            <button id="myContactsButton" onClick={this.goToNetwork}> My Contacts </button>
            <button id="connectButton" onClick={this.goToInvite}> Connect </button>
            <button id="removedContactsButton" onClick={this.goToRemovedContacts}> Removed Contacts </button>
          </div> }

        {this.state.showNetworkList &&
        <div>
        {this.renderContactsList()}
        </div> }

        {this.state.showInviteFriends &&
        <div>
        <InvitationForm />
        </div> }

        {this.state.showRemovedList &&
        <div>
        {this.renderContactsListRemoved()}
        </div> }

        {this.state.showSingleContact &&
        <div>
        <NetworkContactPages friendId={this.state.friendId}/>
        </div> }

        {this.state.showSingleContactRemoved &&
        <div>
         <ManageMyContactsRemoved friendId={this.state.friendId}/>
        </div> }



    </React.Fragment>
    );
    }

}

export default Network;