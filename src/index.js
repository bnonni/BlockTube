import { readdirSync } from 'fs';
// import { listUploads, upload } from "./upload";
import { createTGz } from './zip.js';
import { BLOCKS_DIR } from './env.js'

// listuploads
// create zips
const blockFiles = readdirSync(BLOCKS_DIR).splice(0, 5);
console.log('blockFiles', blockFiles)
const create = createTGz(blockFiles)
// create videos from zips
// upload videos
console.log('create', create)