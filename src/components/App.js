import React from "react";
import { BrowserRouter as Router, HashRouter, Route, Link } from "react-router-dom";
import TimeReport from '../containers/TimeReport';
import Home from '../containers/Home';

const App = () => (
  <HashRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/timereport" component={TimeReport} />
    </div>
  </HashRouter>
);
export default App;
