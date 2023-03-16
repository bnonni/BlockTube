import { readFileSync } from 'fs';
import { google } from 'googleapis';

const ENV_FILE = JSON.parse(readFileSync(process.env.ENV_FILE_PATH));

const GOOGLE_OAUTH2_CLIENT_ID = ENV_FILE.google_oauth2_secret.client_id,
    GOOGLE_OAUTH2_CLIENT_SECRET = ENV_FILE.google_oauth2_secret.client_secret,
    GOOGLE_OAUTH2_REDIRECT_URI = ENV_FILE.google_oauth2_secret.redirect_uris[0],
    GOOGLE_OAUTH2_REFRESH_TOKEN = ENV_FILE.refresh_token;

const YOUTUBE_CHANNEL_ID = ENV_FILE.youtube.channel_id,
    YOUTUBE_API_KEY = ENV_FILE.youtube.api_key;

const ISG_VIDEO_FILE_PATH = ENV_FILE.isg.video_file_path;

const BLOCKTUBE_BLOCKS_DIR = ENV_FILE.blocktube.bitcoin_blocks_dir,
    BLOCKTUBE_TGZ_DIR = ENV_FILE.blocktube.tgz_dir,
    BLOCKTUBE_VIDEOS_DIR = ENV_FILE.blocktube.videos_dir;

const OAuth2 = google.auth.OAuth2;
const OAUTH2_CLIENT = new OAuth2(
    GOOGLE_OAUTH2_CLIENT_ID,
    GOOGLE_OAUTH2_CLIENT_SECRET,
    GOOGLE_OAUTH2_REDIRECT_URI
);
OAUTH2_CLIENT.credentials = GOOGLE_OAUTH2_REFRESH_TOKEN;

export {
    GOOGLE_OAUTH2_CLIENT_ID,
    GOOGLE_OAUTH2_CLIENT_SECRET,
    GOOGLE_OAUTH2_REDIRECT_URI,
    GOOGLE_OAUTH2_REFRESH_TOKEN,
    OAUTH2_CLIENT,
    YOUTUBE_CHANNEL_ID,
    YOUTUBE_API_KEY,
    ISG_VIDEO_FILE_PATH,
    BLOCKTUBE_BLOCKS_DIR,
    BLOCKTUBE_TGZ_DIR,
    BLOCKTUBE_VIDEOS_DIR,
};
