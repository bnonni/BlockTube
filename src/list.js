import { google } from 'googleapis';
import { readFileSync, appendFileSync } from 'fs';
import { OAuth2Client } from 'google-auth-library';

const credentials = JSON.parse(readFileSync(`youtube/secrets/client_secret.json`));
const token = JSON.parse(readFileSync(`youtube/secrets/token.json`));
const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials(token);
const youtube = google.youtube({ version: 'v3', auth: oAuth2Client });
const channelId = '';
const maxResults = 50;
let nextPageToken = '';
let videos = [];

const getVideos = async () => {
  const res = await youtube.search.list({
    channelId: channelId,
    part: 'id',
    maxResults: maxResults,
    pageToken: nextPageToken
  });

  res.data.items.forEach(item => {
    if (item.id.videoId) {
      videos.push(item.id.videoId);
      appendFileSync('./videoIds.txt', item.id.videoId + '\n')
    }
  });

  if (res.data.nextPageToken) {
    nextPageToken = res.data.nextPageToken;
    await getVideos();
  }
};

getVideos()
  .then(() => console.log('Video IDs:', videos))
  .catch(err => console.error('Error:', err));
