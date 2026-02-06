# Compositions Guide

This project includes multiple Remotion compositions. Use this guide to pick the right one and set the key props in Remotion Studio.

**General**
1. Run `npm start`.
2. Open Remotion Studio and select a composition by name.
3. Adjust props in the sidebar.
4. Render with `npm run render` or `npm run build`.

**DemoVideo**
Single phone promo video with animated entrance/exit, headline, subtitle, bullets, and audio.
1. Select `DemoVideo`.
2. Choose `Demo Video` from the dropdown.
3. Pick a `Preset` (optional) to load saved settings.
4. Set `Header Text`, `Subtitle`, and `Bullet Points`.
5. Tune animations, bezels, background, and audio settings.
6. For image/video backgrounds, choose a file from `public/backgrounds/` or `public/screens/` in the `Background File` dropdown.

**DemoVideo-Vertical**
Same as `DemoVideo`, but sized for 9:16 vertical.
1. Select `DemoVideo-Vertical`.
2. Configure the same props as `DemoVideo`.

**DemoVideo-Square**
Same as `DemoVideo`, but sized for 1:1.
1. Select `DemoVideo-Square`.
2. Configure the same props as `DemoVideo`.

**DemoVideo-Portrait**
Same as `DemoVideo`, but sized for 4:5.
1. Select `DemoVideo-Portrait`.
2. Configure the same props as `DemoVideo`.

**ThreePhones**
Static three‑phone layout for marketing screenshots.
1. Select `ThreePhones`.
2. Pick a `Preset` (optional) to load saved settings.
3. Set `Left/Center/Right Screen` to files in `public/`.
4. Adjust layout mode, spacing, scale, and bezel color.

**AppStoreCard**
Single App Store screenshot card with headline + phone on a background.
1. Select `AppStoreCard`.
2. Pick a `Preset` (optional) to load saved settings.
3. Pick `Screenshot Size` for the correct App Store Connect size.
4. Set `Screen Image` to a file in `public/screens/` (example: `screens/your-file.png`).
5. Adjust `Headline Text`, font settings, and `Phone Scale`.
6. Use `Phone Y Offset` to nudge the phone lower or higher.
7. Choose a background preset, custom gradient, or background image.
8. For still export, run `npm run still:appstore` (uses `presets/app-store-card/last.json`).

**Where to put files**
1. App Store card screen images: `public/screens/` (reference as `screens/your-file.png`).
2. Other phone screen images: `public/` (or subfolders).
3. Background images: `public/backgrounds/`.
4. Audio: `public/audio/`.
5. App Store button asset: `public/screens/dl_logo.svg` (fallback: `public/dl_logo.svg`).

**Refreshing dropdowns**
1. After adding/removing videos, backgrounds, or screens: `npm run scan:videos`
2. After adding/removing presets: `npm run scan:presets`
3. Restart Studio (`npm start`) to pick up changes.

**Props Persistence**
Two layers are available:
1. **Local browser persistence**: The last-used props for each composition are saved in localStorage and restored next time you open Remotion Studio.
2. **Disk presets (local “database”)**: JSON files in `presets/` can be used to store/share settings.
3. **In‑Studio export**: Each composition shows `Download Props` and `Copy JSON` buttons in the Studio preview (not rendered in final output).

Note: The export buttons save **only the props for the currently selected composition**. AppStoreCard props will not include DemoVideo fields like `bulletPoints`.

Save a preset to disk:
```bash
npm run preset:save -- app-store-card last --from ./path/to/props.json
```

Or auto-import from Downloads:
```bash
npm run preset:watch
```

By default, `preset:watch` looks in `~/Downloads` for files like `DemoVideo-props.json`.
Use `--dir` to point at a different folder.

**Loading presets**
1. Open Remotion Studio and select the composition.
2. Open the `JSON` tab in the right sidebar.
3. Paste the contents of a preset file (example: `presets/demo-video/last.json`) into the JSON editor.
4. The props will update immediately.

Tip: If you used `Download Props`, you can open that file and paste it into the JSON tab to restore the exact settings.

Shortcut:
```bash
npm run preset:load -- demo-video last --copy
```
This copies the preset JSON to your clipboard so you can paste into the JSON tab.

Presets live here:
1. `presets/demo-video/`
2. `presets/three-phones/`
3. `presets/app-store-card/`
