#!/usr/bin/env node
/**
 * Watches Downloads for *-props.json files and imports them into presets/.
 *
 * Usage:
 *   node scripts/watch-presets.js
 *   node scripts/watch-presets.js --dir ~/Downloads --name last --interval 2000
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

const args = process.argv.slice(2);
const getArg = (flag, fallback) => {
  const idx = args.indexOf(flag);
  if (idx === -1) return fallback;
  return args[idx + 1] ?? fallback;
};

const intervalMs = Number(getArg("--interval", "2000"));
const name = getArg("--name", "last");
const dirArg = getArg("--dir", path.join(os.homedir(), "Downloads"));
const watchDir = dirArg.replace(/^~\//, `${os.homedir()}/`);

const toPresetDir = (compositionId) =>
  compositionId
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();

const parseCompositionId = (filename) => {
  const match = filename.match(/^(.+?)-props(?: \(\d+\))?\.json$/);
  if (!match) return null;
  return match[1];
};

const safeJsonParse = (content) => {
  try {
    return JSON.parse(content);
  } catch {
    return null;
  }
};

const ensureDir = (dir) => {
  fs.mkdirSync(dir, { recursive: true });
};

const pending = new Map();
const processed = new Map();

const scan = () => {
  let entries;
  try {
    entries = fs.readdirSync(watchDir);
  } catch (err) {
    console.error(`Failed to read directory: ${watchDir}`);
    console.error(err.message);
    process.exit(1);
  }

  entries
    .filter((file) => file.endsWith(".json"))
    .filter((file) => !file.endsWith(".download"))
    .forEach((file) => {
      const fullPath = path.join(watchDir, file);
      const stats = fs.statSync(fullPath);

      const last = processed.get(fullPath);
      if (last && last >= stats.mtimeMs) return;

      const state = pending.get(fullPath) || {
        lastSize: 0,
        stableCount: 0,
      };

      if (stats.size === state.lastSize) {
        state.stableCount += 1;
      } else {
        state.lastSize = stats.size;
        state.stableCount = 0;
      }

      pending.set(fullPath, state);

      if (state.stableCount < 1) return;

      const compositionId = parseCompositionId(file);
      if (!compositionId) return;

      const content = fs.readFileSync(fullPath, "utf8");
      const parsed = safeJsonParse(content);
      if (!parsed) return;

      const presetDir = path.join(__dirname, "..", "presets", toPresetDir(compositionId));
      ensureDir(presetDir);

      const outPath = path.join(presetDir, `${name}.json`);
      fs.writeFileSync(outPath, JSON.stringify(parsed, null, 2));

      processed.set(fullPath, stats.mtimeMs);
      pending.delete(fullPath);

      console.log(`✅ Imported ${file} -> ${path.relative(process.cwd(), outPath)}`);
    });
};

console.log(`Watching: ${watchDir}`);
console.log(`Saving as: presets/**/${name}.json`);
console.log("Download props in Remotion Studio to trigger import.");

setInterval(scan, intervalMs);
scan();