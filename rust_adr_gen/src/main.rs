use chrono::Utc;
use colored::*;
use dialoguer::Input;
use indoc::indoc;
use std::env;
use std::fs;
use std::io::Write;
use std::path::PathBuf;
use std::process;

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

    let context = get_user_input("Enter Context");
    let decision = get_user_input("Enter Decision");
    let consequences = get_user_input("Enter Consequences");

    let content = format!(
        indoc! {"
        ---
        title: \"{}\"
        date: \"{}\"
        ---

        # {}

        ## Context
        {}

        ## Decision
        {}

        ## Consequences
        {}
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

fn get_user_input(prompt: &str) -> String {
    match Input::<String>::new().with_prompt(prompt).interact_text() {
        Ok(input) => input,
        Err(e) => {
            eprintln!("{}", format!("Failed to read {}: {}", prompt, e).red());
            process::exit(1);
        }
    }
}
