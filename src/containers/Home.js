import React from "react";
const urlEncodSlackRedirectUri = SLACK_REDIRECT_URI.replace("#", "%23");
const url = SLACK_ROOT_API_URL + "/oauth/authorize?scope=read&client_id=" + SLACK_CLIENT_ID + "&redirect_uri=" + urlEncodSlackRedirectUri + "&team=TD61YHFEF";

const Home = () => (
    <div className="row">

      <div className="col d-none d-sm-block"></div>

      <div className="col">
        <div className="card-deck text-center">
          <div className="card shadow">
            <div className="card-body">
              <h3><span className="oi oi-timer"></span>Time Report</h3>
              <ul className="list-unstyled mt-3 mb-4">
                <li ><a href={url} className="btn btn-outline-secondary btn-block">SignIn With Slack</a>&nbsp;</li>
                <li ><a href="#/signin" className="btn btn-outline-secondary btn-block">Regular SignIn</a>&nbsp;</li>
                <li ><a href="#/signup" className="btn  btn-outline-secondary btn-block">SignUp</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="col d-none d-sm-block"></div>
      
    </div>
);

export default Home;