import React from "react";
import axios from 'axios';
import TitleBar3 from "./TitleBar3";


class About extends React.Component {
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

            <TitleBar3 />

              <div class="settings2ButtonsDiv">
              </div>

              <div class="topParentDiv">

      <div class="topParentDiv">
            <p>  </p>
        </div>


              </div>

        </React.Fragment>
    ); // end return
   }
}

export default About;