use flate2::write::GzEncoder;
use flate2::Compression;
use std::fs::{self};
use std::io::{Read, Write};

pub fn compressor(b: &String, z: &String, blk: &String) -> anyhow::Result<()> {
    let blk_file_name = format!("{}/{}", b, blk);
    let tgz_file_name = format!("{}/{}.tgz", z, blk);
    println!(
        "Compressing blk file {:?} to {:?}",
        blk_file_name, tgz_file_name
    );
    let mut file = fs::File::open(&blk_file_name)?;
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)?;
    let mut encoder = GzEncoder::new(fs::File::create(&tgz_file_name)?, Compression::fast());
    encoder.write_all(&buffer)?;
    Ok(())
}
