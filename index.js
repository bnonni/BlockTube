// import { tgz } from "compressing";
const { tgz } = require("compressing");
// import { blockFiles } from "./blocks.js";
const blockFiles = require("./blocks");
// import PromptSync from "prompt-sync"();
const prompt = require("prompt-sync")();
// import { exit } from "process";

const args = process.argv;
const pCheck = args.includes('-p')
const nCheck = args.find(n => /-n=[0-9]{1,3}/.test(n))
const iCheck = args.find(i => /-i=[0-9]{1,3}/.test(i))

// const videoFiles = readdirSync(BLOCKTUBE_VIDEOS_DIR);
// const uploads = await listUploads();
// console.log(`Videos uploaded to YouTube`, uploads);

// const response = await upload('/Users/bryan/.config/isg4real/videos/blk00002.avi')
// console.log('response', response)

let period = ".";

const promptContinue = () => {
  return prompt("Continue? [y/n] ").trim().toLowerCase();
};

const create = f => {
  console.log(`starting file compression on ${f.block} ...`);
  let blockFile = f.block,
    tgzFile = f.tgz;
  console.log((period += "."));
  tgz
    .compressFile(blockFile, tgzFile)
    .then(_ => console.log(`tgz file ${tgzFile} created for ${blockFile}`))
    .catch(e => console.log(e));
};

const start = () => {
  let n = nCheck?.split('=')[1] ?? 10;
  for (let i = 0; i < n; i++) {
    console.log("creating tgz for", blockFiles[i]);
    create(blockFiles[i]);
    if (pCheck && i === n - 1) {
      console.log("Files to be compressed: ", n);
      const answer = promptContinue();
      if (["y", "yes"].includes(answer)) n += 10;
    }
  }
  return `Please wait ... Compressing ${n} files`;
};

const done = start();
console.log(done);
