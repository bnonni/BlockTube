import { readdirSync } from 'fs';
import { upload } from "./src/upload.js";
import { tgzFilenames, createTGz } from './src/zip.js';
import { BLOCKTUBE_BLOCKS_DIR } from './src/env.js'


// listuploads
// create zips
const blockFiles = readdirSync(BLOCKTUBE_BLOCKS_DIR).splice(0, 5);
console.log('blockFiles', blockFiles);
const tgzFiles = tgzFilenames(blockFiles);
console.log('tgzFiles', tgzFiles);
await createTGz(tgzFiles)
// TODO: create videos from zips using isg_4real, may require simple rust server with isg endpoint
const videoFiles = []
const uploaded = await upload(videoFiles)
console.log('uploaded', uploaded);