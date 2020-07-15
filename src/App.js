import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Home2 from './Home2';
import Answer from './Answer';
import PublicUserPages from './PublicUserPages';
import { AuthContext } from "./context/auth";
import Network from "./Network";
import Profile from "./Profile";
import Clubs from "./Clubs.jsx";
import Guilds from "./Guilds.jsx";
import About from "./About.jsx";
import Ask from "./Ask";
import Start from "./Start";
//import TitleBar from "./TitleBar";

function App(props) {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    sessionStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

// TODO title bar in each route instead of above. eliminate the 2 in each below which is employed
// so that you can go back to 'blank state' when button is pressed. i.e. go to top parent.
// Add into a PrivateRoute a home page

  return (
            <React.Fragment>
                    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
                    <Router>
                      <div>
                       <Route exact path="/" component={Home} />
                       <Route exact path="/flavor" component={PublicUserPages} />
                       <Route exact path="/about" component={About} />
                       <PrivateRoute path="/home" component={Home2} />
                       <PrivateRoute path="/welcome" component={Start} />
                       <PrivateRoute path="/welcome_" component={Start} />
                       <PrivateRoute path="/network" component={Network} />
                       <PrivateRoute path="/network_" component={Network} />
                       <PrivateRoute path="/me" component={Profile} />
                       <PrivateRoute path="/me_" component={Profile} />
                       <PrivateRoute path="/clubs" component={Clubs} />
                       <PrivateRoute path="/clubs_" component={Clubs} />
                       <PrivateRoute path="/guilds" component={Guilds} />
                       <PrivateRoute path="/guilds_" component={Guilds} />
                       <PrivateRoute path="/answer" component={Answer} />
                       <PrivateRoute path="/ask" component={Ask} />
                      </div>
                    </Router>
                    </AuthContext.Provider>
            </React.Fragment>
  );
}

export default App;