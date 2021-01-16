import React from "react";
import axios from 'axios';


class GameSample extends React.Component {
  constructor(props) {
    super(props);
    //this.goToAbout = this.goToAbout.bind(this);
        this.state = {
          error: null,
          isLoaded: false,
          showGame: false,
          gameCells: null,
        };
  }

  componentDidMount() {
    this.loadSampleGame();
  }

    loadSampleGame() {
        axios.get("http://localhost:8080/api/g/a?g=" + "18", {headers : { 'Authorization' : "" }})
        .then((response) => {
         if (response.status === 200) {
          this.setState({
            isLoaded: true,
            showGame: true,
            list: response.data.gameCells,
          });
          //      if ( response.data.clubsList.length > 0 ) { this.setState({ showClubsList2: true}) };
          } // end if
               }).catch(error => {this.setState({ isLoaded: true, error,});
               });
    }

    renderGame() {
      return this.state.list.map((data, index) => {
         return (
            <tr key={data.index}>
                <td> {data.points} </td>
            </tr>
         )
      })
   }


  render() {

    return (
    <React.Fragment>

    { this.state.showGame &&
    <div>
        <img class="arrowImage" src="http://localhost:8080/redUp.png" />
        <img class="arrowImage" src="http://localhost:8080/orangeUp.png" />
        <img class="arrowImage" src="http://localhost:8080/greenUp.png" />
        <img class="arrowImage" src="http://localhost:8080/blackUp.png" />
        <img class="arrowImage" src="http://localhost:8080/blackUpRight.png" />
        {this.renderGame()}
    </div> }

    { !this.state.showGame &&
    <div>
        error loading game
    </div> }


    </React.Fragment>
    );
  }
}

export default GameSample;