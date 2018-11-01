import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter, Route, Link } from "react-router-dom";
import TimeReport from '../containers/TimeReport';
import Home from '../containers/Home';
import SignUp from "../containers/SignUp";
import SignIn from "../containers/SignIn";
import DashBoard from "../containers/DashBoard";
import NavBar from "../containers/NavBar";
import { CognitoUserService } from '../services/CognitoUserService';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isSignIn: false, isSignUp: false, isSignUpVerified: false};
  }

  componentDidMount = () => {
    CognitoUserService.getUserSession((error, isSignIn) => {
      console.log(isSignIn);
      if (error)
        this.handleError(error);
      else
        this.handleInUserSignIn(isSignIn);
    });
  }

  handleInUserSignIn = (isSignIn) => this.setState({ isSignIn: isSignIn });
  handleInUserSignUp = (isSignUp) => this.setState({ isSignUp: isSignUp });
  handleSignUpVerified = (isSignUpVerified) => this.setState({ isSignUpVerified: isSignUpVerified });
  handleInUserSignOut = (isSignOut) => this.setState({ isSignIn: !isSignOut });

  render() {
    return (
      <div>
        <NavBar />
        <HashRouter>
          <div className="container">
            <Route exact path="/" component={Home} />

            <Route exact path="/signup"
              render={
                () =>
                  <SignUp
                    isSignIn={this.state.isSignIn}
                    isSignUp={this.state.isSignUp}
                    isSignUpVerified={this.state.isSignUpVerified}
                    onSignUp={(isSignUp) => this.handleInUserSignUp(isSignUp)}
                    onSignUpVerified={(isSignUpVerified) => this.handleSignUpVerified(isSignUpVerified)}
                  />
              } />

            <Route exact path="/signin"
              render={
                () =>
                  <SignIn
                    isSignIn={this.state.isSignIn}
                    onSignIn={(isSignIn) => this.handleInUserSignIn(isSignIn)}
                  />
              } />

            <Route exact path="/dashboard"
              render={
                () =>
                  <DashBoard
                    isSignIn={this.state.isSignIn}
                    onSignOut={(isSignOut) => this.handleInUserSignOut(isSignOut)}
                  />
              } />

            <Route path="/timereport" component={TimeReport} />
          </div>
        </HashRouter>
      </div>
    );
  }
}
