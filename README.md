# BlockTube

## Current
- Compress Bitcoin block data into .tar.gz files
- Use [@DvorakDwarfx Infinite-Storage-Glitch](https://github.com/DvorakDwarf/Infinite-Storage-Glitch) to convert compressed block data into video files
- Upload block data video file to YouTube via API

## Future
- Run alongside bitcoind listening for new blocks
- Compress, convert to video and upload to YouTube in real-time

### To Do
- [x] Get bigger SSD
- [ ] Write script to turn blk file into tgz (sh or rust?) -- compressor
- [ ] Write script to turn tgz into avi (sh or rust?) -- videographer
- [ ] Fix YouTube API and write script to upload avi to YT (nodejs or rust?) -- publisher
- [ ] Orchestrate them all together: compressor --> videographer --> publisher
Considerations:
 - use rust for all 3 parts
 - write a listener for new blk.dat files
 - upon new blk.dat file, execure compressor -> videographer -> publisher
 - alt: build an API making each functionality an endpoint running on top of a full node