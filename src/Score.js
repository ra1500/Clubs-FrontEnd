import React from "react";
import QuestionSetSelector from "./QuestionSetSelector";
import TitleBar from "./TitleBar";

function Score(props) {

  return (
    <React.Fragment>
    <div>
      <TitleBar />
      <QuestionSetSelector />
    </div>
    </React.Fragment>
  );
}

export default Score;