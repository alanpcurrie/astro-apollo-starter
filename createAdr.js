#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";

// Get the filename from the command line arguments
const fileName = process.argv[2];

if (!fileName) {
  console.error(chalk.red("Error: Please specify a file name"));
  process.exit(1);
}

// Define the directory and path for the new file
const adrsDir = path.join(process.cwd(), "src", "pages", "adrs");
const filePath = path.join(adrsDir, `${fileName}.mdx`);

// Check if the target directory exists, create it if not
if (!fs.existsSync(adrsDir)) {
  fs.mkdirSync(adrsDir, { recursive: true });
}

// Define the content to be written into the file
const content = `---
title: "${fileName}"
date: "${new Date().toISOString()}"
---

# ${fileName}

## Context

## Decision

## Consequences

`;

// Write the file
fs.writeFile(filePath, content, "utf8", (err) => {
  if (err) {
    console.error(chalk.red(`Error: ${err.message}`));
    return;
  }
  console.log(chalk.green(`ADR MDX file created at ${filePath}`));
});
