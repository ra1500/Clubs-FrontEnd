import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Answer from './Answer';
import PublicUserPages from './PublicUserPages';
import { AuthContext } from "./context/auth";
import Network from "./Network";
import Profile from "./Profile";
import Clubs from "./Clubs.jsx";
import Guilds from "./Guilds.jsx";
import Settings from "./Settings.jsx";
import About from "./About.jsx";
import Ask from "./Ask";
import Start from "./Start";
import TitleBar from "./TitleBar";

function App(props) {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    sessionStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

        //  ** put below after finished development **
       //                 <PrivateRoute path="/welcome" component={Start} />
       //                 <PrivateRoute path="/answer" component={Answer} />
       //                 <PrivateRoute path="/ask" component={Ask} />
       //                 <PrivateRoute path="/network" component={Network} />
       //                 <PrivateRoute path="/me" component={Profile} />
       //                 <PrivateRoute path="/clubs" component={Clubs} />
       //                 <PrivateRoute path="/guilds" component={Guilds} />
       //                 <PrivateRoute path="/settings" component={Settings} />

  return (
            <React.Fragment>
                    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
                    <Router>
                    <TitleBar />
                      <div>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/flavor" component={PublicUserPages} />
                        <PrivateRoute path="/welcome" component={Start} />
                        <PrivateRoute path="/answer" component={Answer} />
                        <PrivateRoute path="/ask" component={Ask} />
                        <PrivateRoute path="/network" component={Network} />
                        <PrivateRoute path="/me" component={Profile} />
                        <PrivateRoute path="/clubs" component={Clubs} />
                        <PrivateRoute path="/guilds" component={Guilds} />
                        <PrivateRoute path="/settings" component={Settings} />
                        <Route exact path="/about" component={About} />
                      </div>
                    </Router>
                    </AuthContext.Provider>
            </React.Fragment>
  );
}

export default App;