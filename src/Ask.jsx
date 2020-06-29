import React from "react";
//import QuestionSetSelectorPrivate from "./QuestionSetSelectorPrivate";
import AskFormQset from "./AskFormQset";

class Ask extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
          error: null,
          isLoaded: false,
        };
  }

    componentDidMount() {
    }

  render() {
    return (
        <React.Fragment>
        <div>
          <AskFormQset />
        </div>
        </React.Fragment>
    );
  }
}

export default Ask;