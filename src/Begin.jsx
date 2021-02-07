import React from 'react';
import axios from 'axios';
import ClubsListPublic from "./ClubsListPublic";

class Begin extends React.Component {
    constructor(props) {
        super(props);
        //this.editSingleClub = this.editSingleClub.bind(this);
        this.state = {
         //   list: null,

        };
    }

  componentDidMount() {
  }


    render() {
        return (
        <React.Fragment>
        <div class="topParentDiv">
        <div class="secondParentDiv">
        <div >
         <p class="questionsParagraph"> It starts here </p>
         <ClubsListPublic />

         </div>
         </div>
         </div>
        </React.Fragment>
        )
    }

}

export default Begin;