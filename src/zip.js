import { BLOCKTUBE_BLOCKS_DIR, BLOCKTUBE_TGZ_DIR } from './env.js';
import { appendFileSync } from 'fs';

const tgzFilenames = blockFiles => {
    try {
        const filenames = [];
        const filtered = blockFiles.filter(
            b =>
                b.match(/blk[0-9]{5}\.dat/g) &&
                !b.startsWith('.') &&
                !b.includes('blk00000')
        );
        filtered.forEach(file => {
            const block = `${BLOCKTUBE_BLOCKS_DIR}/${file}`;
            const tgz = `${BLOCKTUBE_TGZ_DIR}/${file.replace('.dat', '.tgz')}`;
            filenames.push({ block, tgz });
        });
        appendFileSync('./blocks.txt', JSON.stringify(filenames) + '",\n')
        return filenames;
    } catch (error) {
        throw new Error(error.message);
    }
};

const createTGz = files => {
    try {
    } catch (error) {
        throw new Error(error);
    }
};

export { tgzFilenames, createTGz };
