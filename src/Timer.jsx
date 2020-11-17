import React from "react";
import MessageBoardFriend from "./MessageBoardFriend";
//import axios from 'axios';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    //this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.state = {
    //showPicture: false,
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval( () => this.tick(), 3000  // 1 second equals 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() { this.setState({ date: new Date()});
        //this.props.getMessagesList();
    }

  render() {
    return (
    <div id="meSettingsDiv">
        <p className="noLineSpaceP"> Last refresh: {this.state.date.toLocaleTimeString()}.</p>
        <MessageBoardFriend />
    </div>

    );
  }
}

export default Timer;