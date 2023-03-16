import { createServer } from 'http';
import { request } from 'https';
import { parse } from 'url';
import { google } from 'googleapis';

/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI.
 * To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */
const oauth2Client = new google.auth.OAuth2(
  "934999403834-61abkr0roomvauhq7b4ikeoenb6p64j3.apps.googleusercontent.com",   
  "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",
  "http://localhost"
);

const scopes = [
  'https://www.googleapis.com/auth/youtube'
];

// Generate a url that asks permissions for the Drive activity scope
const authorizationUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',
  /** Pass in the scopes array defined above.
    * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  scope: scopes,
  // Enable incremental authorization. Recommended as a best practice.
  include_granted_scopes: true
});

/* Global variable that stores user credential in this code example.
 * ACTION ITEM for developers:
 *   Store user's refresh token in your data store if
 *   incorporating this code into your real app.
 *   For more information on handling refresh tokens,
 *   see https://github.com/googleapis/google-api-nodejs-client#handling-refresh-tokens
 */

let userCredential = null;

async function main() {
  const server = createServer(async function (req, res) {
    // Example on redirecting user to Google's OAuth 2.0 server.
    if (req.url == '/') {
      res.writeHead(301, { "Location": authorizationUrl });
    }

    // Receive the callback from Google's OAuth 2.0 server.
    if (req.url.startsWith('/oauth2callback')) {
      // Handle the OAuth 2.0 server response
      let q = parse(req.url, true).query;

      if (q.error) { // An error response e.g. error=access_denied
        console.log('Error:' + q.error);
      } else { // Get access and refresh tokens (if access_type is offline)
        let { tokens } = await oauth2Client.getToken(q.code);
        oauth2Client.setCredentials(tokens);

        /** Save credential to the global variable in case access token was refreshed.
          * ACTION ITEM: In a production app, you likely want to save the refresh token
          *              in a secure persistent database instead. */
        userCredential = tokens;

        // Example of using Google Drive API to list filenames in user's Drive.
        const drive = google.drive('v3');
        drive.files.list({
          auth: oauth2Client,
          pageSize: 10,
          fields: 'nextPageToken, files(id, name)',
        }, (err1, res1) => {
          if (err1) return console.log('The API returned an error: ' + err1);
          const files = res1.data.files;
          if (files.length) {
            console.log('Files:');
            files.map((file) => {
              console.log(`${file.name} (${file.id})`);
            });
          } else {
            console.log('No files found.');
          }
        });
      }
    }

    // Example on revoking a token
    if (req.url == '/revoke') {
      // Build the string for the POST request
      let postData = "token=" + userCredential.access_token;

      // Options for POST request to Google's OAuth 2.0 server to revoke a token
      let postOptions = {
        host: 'oauth2.googleapis.com',
        port: '443',
        path: '/revoke',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      // Set up the request
      const postReq = request(postOptions, function (res) {
        res.setEncoding('utf8');
        res.on('data', d => {
          console.log('Response: ' + d);
        });
      });

      postReq.on('error', error => {
        console.log(error)
      });

      // Post the request with data
      postReq.write(postData);
      postReq.end();
    }
    res.end();
  }).listen(8080);
}
main().catch(console.error);