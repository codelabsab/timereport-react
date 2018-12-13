Time Report React Frontend
==============================================

Before starting the project set the environment variables:
```sh
API_ROOT = yourdomain.com
SLACK_CLIENT_ID = slack_client_id
SLACK_CLIENT_SECRET = slack_client_secret
SLACK_REDIRECT_URI = yourdomain.com/#/requestaccesstoken 
SLACK_ROOT_API_URL = https://<yourworkspace>.slack.com
UserPoolId = aws_cognito_userpool_Id
ClientId = aws_cognito_client_Id
```
 
## Quick Start
In Production (using aws hosting,etc.)
Buid first:
```bash
# Build for production
npm run build
```
after building you will able to see contents in dist folder.
then host all contents from dist folder to go live.

But if you are running it locally then you can just execute 
```bash
npm start
```

## Features
Right now after login it redirects do your_root_url/#/dashboard which uses old model and uses only one collection: users 

But new feature that uses 2 collections: events and users, 
will available if you change the url to: 
your_root_url/#/dashboardv2