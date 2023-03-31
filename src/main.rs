pub mod compare;
pub mod compressor;
pub mod embed;

use compare::{compare_blk_to_tgz, compare_tgz_to_avi};
use std::env::args;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // implement better arg parsing
    let mut b: &String = &String::from("");
    let mut z: &String = &String::from("");
    let mut v: &String = &String::from("");
    let args: Vec<String> = args().collect();

    if let Some(index1) = args.iter().position(|arg| arg == "-b") {
        if let Some(index2) = args.iter().position(|arg| arg == "-z") {
            if let Some(index3) = args.iter().position(|arg| arg == "-v") {
                b = &args[index1 + 1];
                z = &args[index2 + 1];
                v = &args[index3 + 1];
            }
        }
    }

    let blks = compare_blk_to_tgz(b, z);
    println!("Blk files to compress: {:?}", blks);

    if !blks.is_empty() {
        for blk in blks {
            let _ = compressor::compressor(b, z, &blk);
        }
    }

    let tgzs = compare_tgz_to_avi(z, v);
    println!("Tgz files to etch: {:?}", tgzs);

    if !tgzs.is_empty() {
        for tgz in tgzs {
            let tgz_file_name = format!("{}/{}.tgz", z, tgz);
            let avi_file_name = format!("{}/{}.avi", v, tgz);
            println!(
                "Etching tgz file {:?} to {:?}",
                tgz_file_name, avi_file_name
            );
            embed::run_embed(&tgz_file_name).await?;
        }
    }

    Ok(())
}
