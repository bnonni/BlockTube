pub mod etcher;
pub mod settings;

use std::fs;
use settings::{Data, Settings};

pub async fn run_embed(compressed_path: &str) -> anyhow::Result<()> {
    let mut settings = Settings::default();
    settings.size = 2;
    settings.threads = 13;
    settings.fps = 10.0;
    settings.width = 256;
    settings.height = 144;
    let bytes = etcher::rip_bytes(compressed_path)?;
    let binary = etcher::rip_binary(bytes)?;
    let data = Data::from_binary(binary);
    let videos_path: &str = &compressed_path.replace("compressed", "videos").replace("tgz", "avi");
    etcher::etch(&videos_path, data, settings)?;
    let is_video_path = compressed_path.replace("compressed", "compressed/isVideo");
    fs::rename(compressed_path, is_video_path)?;
    Ok(())
}
