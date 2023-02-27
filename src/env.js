import { readFileSync } from "fs";
import { google } from "googleapis";

const ENV_FILE = JSON.parse(readFileSync('./env.json'));

export const GOOGLE_OAUTH2_CLIENT_ID = ENV_FILE.google_oauth2_secret.client_id,
  GOOGLE_OAUTH2_CLIENT_SECRET = ENV_FILE.google_oauth2_secret.client_secret,
  GOOGLE_OAUTH2_REDIRECT_URI = ENV_FILE.google_oauth2_secret.redirect_uris[0];

export const YOUTUBE_CHANNEL_ID = ENV_FILE.youtube.channel_id,
  YOUTUBE_API_KEY = ENV_FILE.youtube.api_key;

export const ISG_VIDEO_FILE_PATH = ENV_FILE.isg.video_file_path;

export const BLOCKTUBE_BLOCKS_DIR = ENV_FILE.blocktube.bitcoin_blocks_dir,
  BLOCKTUBE_TGZ_DIR = ENV_FILE.blocktube.tgz_dir;

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.credentials = ENV_FILE.refresh_token