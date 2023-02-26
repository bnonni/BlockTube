import { readFileSync } from "fs";
import { google } from "googleapis";

export const ENV_FILE = JSON.parse(readFileSync('./env.json')),
  CLIENT_ID = ENV_FILE.client_secret.client_id,
  CLIENT_SECRET = ENV_FILE.client_secret.client_secret,
  REDIRECT_URI = ENV_FILE.client_secret.redirect_uris[0],
  YOUTUBE_CHANNEL_ID = ENV_FILE.youtube.channel_id;

export const BLOCKS_DIR = '/Volumes/BLOCKCHAIN/.bitcoin/blocks',
  TAR_DIR = '/Users/bryan/.config/isg4real/tar',
  TGZ_DIR = '/Users/bryan/.config/isg4real/targz';

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.credentials = ENV_FILE.refresh_token