import { readFileSync, readFile, writeFile } from 'fs';
import { createInterface } from 'readline';
import { OAuth2Client } from 'google-auth-library';
const CWD = process.cwd()
console.log(CWD)
const SCOPES = ['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube.readonly', 'https://www.googleapis.com/auth/youtube.force-ssl'];
const TOKEN_PATH = './secrets/token.json';

const credentials = JSON.parse(readFileSync('./secrets/client_secret.json'));
const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

// Check if we have previously stored a token.
readFile(TOKEN_PATH, (err, token) => {
    getNewToken(oAuth2Client);
    oAuth2Client.setCredentials(JSON.parse(token));
});

function getNewToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
        });
    });
}
