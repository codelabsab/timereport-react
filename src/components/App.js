import React from "react";
import { BrowserRouter as Router, HashRouter, Route, Link } from "react-router-dom";
import TimeReport from '../containers/TimeReport';
import Home from '../containers/Home';
import SignUp from "../containers/SignUp";
import SignIn from "../containers/SignIn";
import DashBoard from "../containers/DashBoard";
import NavBar from "../containers/NavBar";

const App = () => (
  <div>
    <NavBar />
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
