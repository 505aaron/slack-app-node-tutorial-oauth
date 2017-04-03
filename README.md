# slack-app-node-tutorial-oauth
Node.js Slack Application OAuth Tutorial. Red a detailed write-up [https://www.lessrework.com/2017/04/slack-app-tutorial-oauth/](https://www.lessrework.com/2017/04/slack-app-tutorial-oauth/)

## Development

### Install Ngrok
```
npm install -g ngrok
```

### Start the Application

```
COOKIE_PASSWORD=<fill in> \
SLACK_SECRET=<fill in> \
SLACK_CLIENT_ID=<fill in> \
SLACK_VERIFICATION_TOKEN=<fill in> \
npm run start
```

```
ngrok http 3000
```

### Authenticate
1. Navigate to host/authenticate
2. Navigate to your host.
