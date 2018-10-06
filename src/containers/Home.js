import React from "react";
const urlEncodSlackRedirectUri = SLACK_REDIRECT_URI.replace("#","%23");
const url = "https://slack.com/oauth/authorize?scope=read&client_id=" + SLACK_CLIENT_ID + "&redirect_uri="+urlEncodSlackRedirectUri;

const Home = () => (
    <div className="card text-center">
      <div className="card-body">
        <h1 className="card-title">Sign in</h1>
        <p className="card-text">You will be redirected after providing your credentials.</p>
        <a className="btn btn-outline-light" href={url}>
          <img src={require('./../images/slack2.png')} />
        </a>
      </div>
    </div>
  );

  export default Home;