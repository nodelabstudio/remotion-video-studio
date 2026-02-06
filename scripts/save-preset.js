#!/usr/bin/env node
/**
 * Save a JSON preset into presets/<composition>/<name>.json
 *
 * Usage:
 *   node scripts/save-preset.js app-store-card last --from ./path/to/props.json
 *   node scripts/save-preset.js demo-video last --props '{"headerText":"New"}'
 */

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error(
    "Usage: node scripts/save-preset.js <composition> <name> --from <file> | --props <json>"
  );
  process.exit(1);
}

const composition = args[0];
const name = args[1];
const fromIndex = args.indexOf("--from");
const propsIndex = args.indexOf("--props");

if (fromIndex === -1 && propsIndex === -1) {
  console.error("Provide --from <file> or --props <json>");
  process.exit(1);
}

let data;

if (fromIndex !== -1) {
  const fromPath = args[fromIndex + 1];
  if (!fromPath) {
    console.error("--from requires a file path");
    process.exit(1);
  }
  data = fs.readFileSync(fromPath, "utf8");
} else {
  const jsonArg = args[propsIndex + 1];
  if (!jsonArg) {
    console.error("--props requires a JSON string");
    process.exit(1);
  }
  data = jsonArg;
}

let parsed;
try {
  parsed = JSON.parse(data);
} catch (err) {
  console.error("Invalid JSON:", err.message);
  process.exit(1);
}

const targetDir = path.join(__dirname, "..", "presets", composition);
fs.mkdirSync(targetDir, { recursive: true });

const outPath = path.join(targetDir, `${name}.json`);
fs.writeFileSync(outPath, JSON.stringify(parsed, null, 2));

console.log(`✅ Saved preset: ${outPath}`);