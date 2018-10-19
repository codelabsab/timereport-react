# Time Report Documentation


## set redirect url for slack
Log in to api.slack.com/apps
In Oauth & Permissions add redirect url like:
```sh
yourdomain.com/#/requestaccesstoken
```
And copy client_id & client_secret you need this to define environment variable(see below)

## Define environment variable

```sh
API_ROOT = yourdomain.com
SLACK_CLIENT_ID=slack_client_id
SLACK_CLIENT_SECRET=slack_client_secret
SLACK_REDIRECT_URI=yourdomain.com/#/requestaccesstoken 
SLACK_ROOT_API_URL=https://<yourworkspace>.slack.com
```
 
## Quick Start
Buid first:
```bash
# Build for production
npm run build
```
then host all contents from dist folder.