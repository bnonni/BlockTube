import { createReadStream } from 'fs';
import { google } from 'googleapis';
import {
    YOUTUBE_CHANNEL_ID,
    YOUTUBE_API_KEY,
    GOOGLE_OAUTH2_CLIENT_ID,
    GOOGLE_OAUTH2_CLIENT_SECRET,
    GOOGLE_OAUTH2_REDIRECT_URI,
    GOOGLE_OAUTH2_REFRESH_TOKEN
} from './env.js';

const OAuth2 = google.auth.OAuth2;
const OAUTH2_CLIENT = new OAuth2(
    GOOGLE_OAUTH2_CLIENT_ID,
    GOOGLE_OAUTH2_CLIENT_SECRET,
    GOOGLE_OAUTH2_REDIRECT_URI
);
OAUTH2_CLIENT.credentials = GOOGLE_OAUTH2_REFRESH_TOKEN;

const youtube = google.youtube({
    version: 'v3',
    auth: YOUTUBE_API_KEY
});

const listUploads = async () => {
    const channelResponse = await youtube.channels.list({
        part: 'contentDetails',
        id: [YOUTUBE_CHANNEL_ID]
    });
    const uploadsId =
        channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;
    const uploadsResponse = await youtube.playlistItems.list({
        part: 'contentDetails',
        playlistId: uploadsId,
        maxResults: 10
    });
    return uploadsResponse.data.items;
};

const upload = async video => {
    // let i = 1;
    // while (i < 10) {
    console.log('Uploading video', video);
    const fileArr = file.split('/');
    const filename = file.split('/')[fileArr.length - 1].replace('avi', 'dat');
    const uploadVideo = await youtube.videos.insert({
        part: ['snippet,status'],
        requestBody: {
            snippet: {
                title: filename
            },
            status: {
                privacyStatus: 'public'
            }
        },
        media: { body: createReadStream(video) }
    });

    console.log(`Video ${snippetObject.title} uploaded`, uploadVideo.data);
    // }
};

export { upload, listUploads };
