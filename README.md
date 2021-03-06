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
After login it redirects to dashboard which by default uses old api (one collection: users)

But the new feature that uses api v2 (2 collections : events and users), will available if you set special environment varibale:
```sh
VERSION = v2
```
##How It Works
User need to signup at first (email confirmation step is there).

Whenever user signedIn to system, it first uses this email to lookup slack user.

If slack user found then it uses slack credentials as a token for furthere api call.

If slack user is not found then it uses email domain as a token for further api call where only GET Request is allowed  (limited functionality).