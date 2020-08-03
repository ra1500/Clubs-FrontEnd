import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import PublicUserPages from './PublicUserPages';
import { AuthContext } from "./context/auth";
import About from "./About.jsx";
import TitleBar4 from "./TitleBar4";

function App(props) {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    sessionStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
            <React.Fragment>
                    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
                    <Router>
                      <div>
                       <Route exact path="/" component={Home} />
                       <Route exact path="/flavor" component={PublicUserPages} />
                       <Route exact path="/about" component={About} />
                       <PrivateRoute path="/app" component={TitleBar4} />
                      </div>
                    </Router>
                    </AuthContext.Provider>
            </React.Fragment>
  );
}

export default App;