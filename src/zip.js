import { tgz } from 'compressing'
import { BLOCKTUBE_BLOCKS_DIR, BLOCKTUBE_TGZ_DIR } from './env.js'

const tgzFilenames = (blockFiles) => {
  try {
    const filenames = []
    const filtered = blockFiles.filter(
      b =>
        b.match(/blk[0-9]{5}\.dat/g) &&
        !b.startsWith('.') &&
        !b.includes('blk00000')
    )
    filtered.forEach(file => {
      const block = `${BLOCKTUBE_BLOCKS_DIR}/${file}`
      const tgz = `${BLOCKTUBE_TGZ_DIR}/${file.replace('.dat', '.tgz')}`
      filenames.push({ block, tgz })
    })
    return filenames
  } catch (error) {
    throw new Error(error.message)
  }
};

const createTGz = async (files) => { return files.map(async (f) => await tgz.compressFile(f.block, f.tgz)) };

export { tgzFilenames, createTGz };