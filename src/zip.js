import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { c } from 'tar';
const compressing = require('compressing');


import { BLOCKS_DIR, TAR_DIR, TGZ_DIR } from './env.js'

const createTGz = (blockFiles) => {
  try {
    const filtered = blockFiles.filter(
      b =>
        b.match(/blk[0-9]{5}\.dat/g) &&
        !b.startsWith('.') &&
        !b.includes('blk00000')
    )

    filtered.forEach(file => {
      const blockFilename = `${BLOCKS_DIR}/${file}`
      console.log('blockFilename', blockFilename)

      const tar = file.replace('.dat', '.tar')
      const tarFilename = `${TAR_DIR}/${tar}`
      console.log('tarFilename', tarFilename)

      c({ file: tarFilename }, [blockFilename]).then(_ => console.log(`${tarFilename} created`));

      const tarGzFilename = `${TGZ_DIR}/${tar}.gz`
      console.log('tarGzFilename', tarGzFilename)

      const readBlock = createReadStream(blockFilename);
      const writeArchive = createWriteStream(tarGzFilename);
      const gzip = createGzip();
      readBlock.pipe(gzip).pipe(writeArchive);
    })
    return true
  } catch (error) {
    throw new Error(error.message)
  }
};

export default { createTGz };