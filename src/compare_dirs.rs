use std::collections::HashSet;
use std::fs;
use regex::Regex;

pub fn compare_dirs(blks: &String, tgzs: &String) -> HashSet<String> {

    let blk_files: HashSet<String> = fs::read_dir(blks)
        .unwrap()
        .filter_map(|entry| {
            let entry = entry.ok()?;
            let path = entry.path();
            if path.is_file() {
                let file_name = path.file_name().unwrap().to_string_lossy().to_string();
                let re = Regex::new("blk03[0-9]{3}.dat").unwrap();
                if re.is_match(&file_name) && file_name.ends_with(".dat") && !file_name.starts_with("rev") {
                    Some(file_name)
                } else {
                    None
                }
            } else {
                None
            }
        })
        .collect();

    let tgz_files: HashSet<String> = fs::read_dir(tgzs)
        .unwrap()
        .filter_map(|entry| {
            let entry = entry.ok()?;
            let path = entry.path();
            if path.is_file() {
                let file_name = path.file_name().unwrap().to_string_lossy().to_string();
                if file_name.ends_with(".dat.tgz") {
                    let new_file_name: String = file_name[..file_name.len() - 4].to_string();
                    Some(new_file_name)
                } else {
                    None
                }
            } else {
                None
            }
        })
        .collect();

    let diff = blk_files.difference(&tgz_files).cloned().collect();

    return diff;
}
