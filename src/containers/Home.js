import React from "react";
const urlEncodSlackRedirectUri = SLACK_REDIRECT_URI.replace("#", "%23");
const url = SLACK_ROOT_API_URL + "/oauth/authorize?scope=read&client_id=" + SLACK_CLIENT_ID + "&redirect_uri=" + urlEncodSlackRedirectUri + "&team=TD61YHFEF";

const Home = () => (
  <div >
    {/* <div className="text-center">
        <a className="btn btn-outline-light" href={url}>
          <img className="img-fluid" src={require('./../images/slack2.png')} />
        </a>
    </div> */}
    <div className="text-center">
      <a href={url} className="btn btn-outline-secondary">SignIn With Slack</a>&nbsp;
      <a href="#/signin" className="btn btn-outline-secondary">Regular SignIn</a>&nbsp;
      <a href="#/signup" className="btn  btn-outline-secondary">SignUp</a>
    </div>
  </div>
);

export default Home;