import React from "react";
const urlEncodSlackRedirectUri = SLACK_REDIRECT_URI.replace("#", "%23");
const url = SLACK_ROOT_API_URL + "/oauth/authorize?scope=read&client_id=" + SLACK_CLIENT_ID + "&redirect_uri=" + urlEncodSlackRedirectUri + "&team=TD61YHFEF";

const Home = () => (
    <div class="row">

      <div class="col d-none d-sm-block"></div>

      <div class="col">
        <div class="card-deck text-center">
          <div class="card shadow">
            <div class="card-body">
              <h3><span class="oi oi-timer"></span>Time Report</h3>
              <ul class="list-unstyled mt-3 mb-4">
                <li ><a href={url} className="btn btn-outline-secondary btn-block">SignIn With Slack</a>&nbsp;</li>
                <li ><a href="#/signin" className="btn btn-outline-secondary btn-block">Regular SignIn</a>&nbsp;</li>
                <li ><a href="#/signup" className="btn  btn-outline-secondary btn-block">SignUp</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="col d-none d-sm-block"></div>
      
    </div>
);

export default Home;