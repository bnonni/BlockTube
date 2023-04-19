pub mod etcher;
pub mod settings;

use settings::{Data, Settings};

pub async fn run_embed(compressed_path: &str) -> anyhow::Result<()> {
    let mut settings = Settings::default();
    settings.size = 2;
    settings.threads = 8;
    settings.fps = 10.0;
    settings.width = 1280;
    settings.height = 720;
    let bytes = etcher::rip_bytes(compressed_path)?;
    let binary = etcher::rip_binary(bytes)?;
    let data = Data::from_binary(binary);
    let videos_path: &str = &compressed_path.replace("compressed", "videos").replace("tgz", "avi");
    etcher::etch(&videos_path, data, settings)?;
    println!("Video {} complete!", videos_path);
    Ok(())
}
