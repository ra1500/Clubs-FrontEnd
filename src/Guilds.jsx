import React from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';


class Guilds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoaded: null,
        };
    };

  componentDidMount() {
  }

   render() {
    return (
        <React.Fragment>

              <div class="settings2ButtonsDiv">
              </div>

              <div class="topParentDiv">

      <div class="topParentDiv">
        <p> Guilds </p>



              </div>
            </div>
        </React.Fragment>
    ); // end return
   }
}

export default Guilds;