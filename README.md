# BlockTube

## Current
- Compress Bitcoin block data into .tgz files
- Use [@DvorakDwarfx Infinite-Storage-Glitch](https://github.com/DvorakDwarf/Infinite-Storage-Glitch) to convert compressed block data into video files
- Upload block data video file to YouTube via API

## Future
- Run alongside bitcoind listening for new blocks
- Compress, convert to video and upload to YouTube in real-time

### To Do
- [x] Get bigger SSD
- [ ] Compressor: compresses blk.dat files into blk.dat.tgz files
- [ ] Videographer: uses `isg_4real` to convert blk.dat.tgz files into blk.dat.avi video files
- [ ] Publisher: use YouTube API to upload blk.dat.avi files to YT channel
- [ ] Orchestrater: make them all work together - Compressor --> Videographer --> Publisher
- [ ] Integrator: watch full node .bitcoin/blocks folder for a newly finished blk.dat file and run alongside bitcoind
Considerations:
 - use rust for all 3 parts
 - write a listener for new blk.dat files
 - upon new blk.dat file, execure compressor -> videographer -> publisher
 - alt: build an API making each functionality an endpoint running on top of a full node