import { google } from 'googleapis';
import { readFileSync, createReadStream } from 'fs';
import { OAuth2Client } from 'google-auth-library';
import videos from './videos.js';
const CWD = process.cwd()

const credentials = JSON.parse(readFileSync(`${CWD}/src/client_secret.json`));
const token = JSON.parse(readFileSync(`${CWD}/src/token.json`));
const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials(token);
const youtube = google.youtube({ version: 'v3', auth: oAuth2Client });
for (let i = 0; i < 10; i++) {
    const video = videos[i]
    const videoTitle = (video.split('/Volumes/BLOCKTUBE/videos/')[1]).replaceAll('.avi', '')
    console.log(`Uploading video file ${video} with title ${videoTitle} ...`)
    youtube.videos.insert({
        part: "snippet,status,contentDetails",
        requestBody: {
            snippet: {
                title: videoTitle,
            },
            status: {
                privacyStatus: "public",
                selfDeclaredMadeForKids: false
            },
            contentDetails: {
                contentRating: {
                    ytRating: "ytAgeRestricted"
                }
            }
        },
        media: {
            body: createReadStream(video)
        }
    }, (err, res) => {
        if (err) return console.log(`The API returned an error: ${err}`);
        console.log(`Video uploaded: ${res.data.snippet.title} (${res.data.id})`);
    });
}