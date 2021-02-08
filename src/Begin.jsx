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

        <div class="settings2ButtonsDiv">
         <p class="beginP"> &nbsp; It starts here &nbsp;</p> <br></br><br></br>
         <p class="questionsParagraph"> Clubs that anyone can join are listed below. After joining, go to 'Clubs' to view.  </p>
         <p class="questionsParagraph"> Use 'Network' to stay in contact with other users.</p>
        </div>
        <div>
         <ClubsListPublic />


         </div>
        </React.Fragment>
        )
    }

}

export default Begin;