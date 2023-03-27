pub struct Block {
    pub block: &'static str,
    pub tgz: &'static str,
}

pub const BLOCKS: [Block; 2] = [
    Block {
        block: "/Volumes/BLOCKCHAIN/.bitcoin/blocks/blk03496.dat",
        tgz: "/Volumes/BLOCKTUBE/compressed/blk03496.dat.tgz",
    },
    Block {
        block: "/Volumes/BLOCKCHAIN/.bitcoin/blocks/blk03497.dat",
        tgz: "/Volumes/BLOCKTUBE/compressed/blk03497.dat.tgz",
    },
];
