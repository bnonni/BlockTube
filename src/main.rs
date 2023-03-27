pub mod compare_dirs;

use flate2::write::GzEncoder;
use flate2::Compression;
use std::fs;
use std::io::{Write, Read};
use std::env::args;
use compare_dirs::compare_dirs;

fn main() -> std::io::Result<()> {
    let mut b: &String = &String::from("");
    let mut z: &String = &String::from("");
    let args: Vec<String> = args().collect();

    if let Some(index1) = args.iter().position(|arg| arg == "-b") {
        if let Some(index2) = args.iter().position(|arg| arg == "-z") {
            b = &args[index1 + 1];
            z = &args[index2 + 1];
        }
    }
    
    let blks = compare_dirs(b, z);
    println!("Blk files to compress: {:?}", blks);

    for blk in blks {
        let blk_file_name = format!("{}/{}", b, blk);
        let tgz_file_name = format!("{}/{}.tgz", z, blk);
        println!("Compressing blk file {:?} to {:?}", blk_file_name, tgz_file_name);
        let mut file = fs::File::open(&blk_file_name)?;
        let mut buffer = Vec::new();
        file.read_to_end(&mut buffer)?;
        let mut encoder = GzEncoder::new(fs::File::create(&tgz_file_name)?, Compression::best());
        encoder.write_all(&buffer)?;
    }


    Ok(())
}
