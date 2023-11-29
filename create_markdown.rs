#!/usr/bin/env rust-script
//! This is a regular crate doc comment, but it also contains a partial
//! Cargo manifest.  Note the use of a *fenced* code block, and the
//! `cargo` "language".
//!
//! ```cargo
//! [dependencies]
//! chrono = "0.4"
//! colored = "2.0"
//! indoc = "2"
//! ```

use chrono::Utc;
use colored::*;
use dialoguer::Input;
use indoc::indoc;
use std::env;
use std::fs;
use std::io::Write;
use std::path::PathBuf;

fn main() {
    let current_dir = env::current_dir().unwrap();
    println!("Current directory: {}", current_dir.display());

    let file_name = env::args().nth(1).unwrap_or_else(|| {
        eprintln!("{}", "Error: Please specify a file name".red());
        std::process::exit(1);
    });

    let adrs_dir = match env::var("ADRS_DIR") {
        Ok(val) => PathBuf::from(val),
        Err(_) => PathBuf::from("../src/pages/adrs"),
    };

    let file_path = adrs_dir.join(format!("{}.mdx", &file_name));

    fs::create_dir_all(&adrs_dir).unwrap_or_else(|e| {
        eprintln!("{}", format!("Failed to create directory: {}", e).red());
        std::process::exit(1);
    });

    let context = Input::<String>::new()
        .with_prompt("Enter Context")
        .interact_text()
        .unwrap_or_else(|e| handle_error_and_exit(format!("Failed to read Context: {}", e)));

    let decision = Input::<String>::new()
        .with_prompt("Enter Decision")
        .interact_text()
        .unwrap_or_else(|e| handle_error_and_exit(format!("Failed to read Decision: {}", e)));

    let consequences = Input::<String>::new()
        .with_prompt("Enter Consequences")
        .interact_text()
        .unwrap_or_else(|e| handle_error_and_exit(format!("Failed to read Consequences: {}", e)));

    let content = format!(
        indoc! {"
            ---
            title: \"{}\"
            date: \"{}\"
            ---
    
            # {}
    
            ## Context
    
            ## Decision
    
            ## Consequences
        "},
        file_name,
        Utc::now().format("%Y-%m-%dT%H:%M:%S%.3fZ"),
        file_name,
        context,
        decision,
        consequences
    );

    let mut file = fs::File::create(&file_path).unwrap_or_else(|e| {
        eprintln!("{}", format!("Failed to create file: {}", e).red());
        std::process::exit(1);
    });
    file.write_all(content.as_bytes()).unwrap_or_else(|e| {
        eprintln!("{}", format!("Failed to write to file: {}", e).red());
        std::process::exit(1);
    });

    println!(
        "ADR MDX file created at {}",
        file_path.display().to_string().green()
    );
}
