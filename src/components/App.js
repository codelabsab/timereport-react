import React, { Component } from 'react';
import { HashRouter, Route } from "react-router-dom";
import Home from '../containers/Home';
import SignUp from "../containers/SignUp";
import SignIn from "../containers/SignIn";
import DashBoard from "../containers/DashBoard";
import DashBoardV2 from "../containers/DashBoardV2";
import NavBar from "../containers/NavBar";
import { CognitoUserService } from '../services/CognitoUserService';
import ResetPassword from '../containers/ResetPassword';
import * as Logger from '../services/LoggerService';

const v2 = 'v2';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isSignIn: false, isSignUp: false, isSignUpVerified: false };
    Logger.log('current version: ' + VERSION);
    // based on version dashboard switching
    this.DashBoard = VERSION == v2 ? DashBoardV2 : DashBoard;
  }

  componentDidMount = () => {
    CognitoUserService.getUserSession((error, isSignIn) => {
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
        <NavBar isSignIn={this.state.isSignIn}
          onSignOut={(isSignOut) => this.handleInUserSignOut(isSignOut)}
        />
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
            <Route exact path="/forgotpassword" component={ResetPassword} />
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
                  < this.DashBoard
                    isSignIn={this.state.isSignIn}
                    onSignOut={(isSignOut) => this.handleInUserSignOut(isSignOut)}
                  />
              } />

          </div>
        </HashRouter>
      </div>
    );
  }
}
