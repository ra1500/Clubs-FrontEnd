import Introduction from "./Introduction";
import React from "react";
import TitleBar from "./TitleBar";

function Home(props) {
  return   <div>
            <TitleBar />
            <Introduction />
           </div>;
}

export default Home;