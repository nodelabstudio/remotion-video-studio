#!/usr/bin/env node
/**
 * Load a preset from presets/<composition>/<name>.json and print it or copy to clipboard.
 *
 * Usage:
 *   node scripts/load-preset.js app-store-card last
 *   node scripts/load-preset.js demo-video last --copy
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error("Usage: node scripts/load-preset.js <composition> <name> [--copy]");
  process.exit(1);
}

const composition = args[0];
const name = args[1];
const shouldCopy = args.includes("--copy");

const presetPath = path.join(
  __dirname,
  "..",
  "presets",
  composition,
  `${name}.json`
);

if (!fs.existsSync(presetPath)) {
  console.error(`Preset not found: ${presetPath}`);
  process.exit(1);
}

const content = fs.readFileSync(presetPath, "utf8");

if (shouldCopy) {
  if (process.platform === "darwin") {
    const copy = spawnSync("pbcopy", [], { input: content });
    if (copy.status !== 0) {
      console.error("Failed to copy to clipboard.");
      process.exit(1);
    }
    console.log(`✅ Copied ${presetPath} to clipboard`);
  } else {
    console.error("Clipboard copy is only supported on macOS in this script.");
    process.exit(1);
  }
} else {
  process.stdout.write(content);
}