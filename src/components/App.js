import React from "react";
import { BrowserRouter as Router, HashRouter, Route, Link } from "react-router-dom";
import TimeReport from '../containers/TimeReport';
import Home from '../containers/Home';
import SignUp from "../containers/SignUp";

const App = () => (
  <HashRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route path="/timereport" component={TimeReport} />
    </div>
  </HashRouter>
);
export default App;
