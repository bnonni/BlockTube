// import { create, x } from 'tar';

// const tgzf = create({ gzip: true, file: 'rkunt.tgz' }, ['/Users/bryan/rkhunter.log']).then(_ => { console.log('.. tarball has been created ..') })
// console.log(tgzf)
// x({
//   file: './rkunt.tgz'
// })

import { createGzip, createGunzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';

var gzip = createGzip();
var r = createReadStream('./src/upload.js');
var w = createWriteStream('./upload.gz');
r.pipe(gzip).pipe(w);

var gunzip = createGunzip()
var r = createReadStream('./upload.gz');
var w = createWriteStream('./upload.js');
r.pipe(gunzip).pipe(w);