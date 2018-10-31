import React from "react";
import { BrowserRouter as Router, HashRouter, Route, Link } from "react-router-dom";
import TimeReport from '../containers/TimeReport';
import Home from '../containers/Home';
import SignUp from "../containers/SignUp";
import SignIn from "../containers/SignIn";
import DashBoard from "../containers/DashBoard";

const App = () => (
  <div>
    <nav className="navbar navbar-light bg-dark">
        <a className="navbar-brand" href="#">
            <img src="https://codelabs.se/images/codelabs_white_code.svg" width="50" height="50" className="d-inline-block align-top"
                alt="" />        
        </a>
        <a className="btn btn-outline-light btn-lg" href="/">TimeReport</a>     
    </nav>
    <HashRouter>
      <div className="container">
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/dashboard" component={DashBoard} />
        <Route path="/timereport" component={TimeReport} />
      </div>
    </HashRouter>
  </div>
);
export default App;
