import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { OAuth2Client } from 'google-auth-library';
import videoIDs from './videoIDs.js';
const CWD = process.cwd()

const credentials = JSON.parse(readFileSync(`${CWD}/youtube/secrets/client_secret.json`));
const token = JSON.parse(readFileSync(`${CWD}/youtube/secrets/token.json`));
const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials(token);
const youtube = google.youtube({ version: 'v3', auth: oAuth2Client });
for (let i = 0; i < videoIDs.length; i++) {
    const videoID = videoIDs[i]
    console.log(`Updating privacyStatus and audience of videoID ${videoID} ...`)
    youtube.videos.update({
        part: "status",
        resource: {
            id: videoID,
            status: {
                privacyStatus: "public",
                selfDeclaredMadeForKids: false
            },
        },
    }, (err, data) => {
        if (err) {
            console.error('Error updating video:', err);
        } else {
            console.log('Video updated:', data.data.id);
        }
    });
}