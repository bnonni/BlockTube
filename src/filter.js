import { google } from 'googleapis';
import { writeFileSync, readFileSync } from 'fs';
import { OAuth2Client } from 'google-auth-library';

const credentials = JSON.parse(readFileSync(`youtube/secrets/client_secret.json`));
const token = JSON.parse(readFileSync(`youtube/secrets/token.json`));
const { client_secret, client_id, redirect_uris } = credentials.web;

const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials(token);

const youtube = google.youtube({ version: 'v3', auth: oAuth2Client });

const params = {
    part: 'id',
    type: 'video',
    fields: 'items(id)',
    maxResults: 50,
    status: 'draft',
    channelId: '',
};

youtube.search.list(params, (err, response) => {
    if (err) {
        console.error(err);
        return;
    }
    const videoIds = response.data.items.map(item => item.id.videoId);
    const fileContent = `export default [
        ${videoIds.map(str => `"${str}"`).join(",\n")}
        ]`;
    console.log(`Video IDs: ${videoIds}`);
    writeFileSync('videoIDs1.js', fileContent)
});