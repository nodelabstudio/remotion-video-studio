# Remotion Video Studio

A Remotion-powered tool for creating professional iOS app promotional videos. Configure everything through an intuitive sidebar UI — no code editing required.

## Features

### 🎬 Video & Device

- **3 demo videos** included (add your own to `public/`)
- **2 phone bezels**: Slim silver, iPhone 16 Pro gold
- Configurable scale and positioning

### ✨ 15 Entrance Animations

| Simple | Dynamic        | Dramatic   |
| ------ | -------------- | ---------- |
| fadeIn | dropAndSlide   | spin       |
| none   | dropOnly       | zoomRotate |
|        | slideFromRight | flip       |
|        | slideFromLeft  | glitch     |
|        | bounce         | elastic    |
|        | float          | swing      |
|        | scaleUp        |            |

### ⚡ Animation Speed

- **slow** (1.5x duration) — elegant, cinematic
- **normal** — balanced timing
- **fast** (0.6x) — punchy, energetic
- **veryFast** (0.35x) — snappy, attention-grabbing

### 🎨 9 Background Presets

`lightGray` · `darkMode` · `sunset` · `ocean` · `forest` · `purple` · `midnight` · `warmGradient` · `coolGradient`

### 💡 Lighting & Effects

- **5 shadow intensities**: none → dramatic
- **5 light angles**: topLeft, topRight, top, bottomLeft, bottomRight
- **Screen reflections**: subtle, medium, strong

### 📝 Branding & Content

- Custom header text
- 1-6 bullet points with animated reveal
- App icon toggle & custom file
- App Store download button toggle
- Auto text color for dark backgrounds

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
git clone <repository_url>
cd remotion_videos
npm install
```

### Usage

**Start Remotion Studio** (live preview + sidebar editor):

```bash
npm start
```

**Render final video**:

```bash
npm run render
```

Output: `out/demo.mp4`

---

## Project Structure

```
src/
├── index.ts          # Entry point
├── Root.tsx          # Composition registration
├── schema.ts         # Zod schema (defines sidebar UI)
├── DemoVideo.tsx     # Main animated composition
├── PhoneBezel.tsx    # Bezel selector component
├── SlimBezel.tsx     # Silver bezel
├── IPhoneBezel.tsx   # Gold titanium bezel
└── ThreePhones.tsx   # Multi-phone static layout

public/
├── *.mov, *.mp4      # Demo videos
├── app_logo_small.png
└── dl_logo.svg
```

---

## Adding Your Own Content

### Videos

Drop `.mov` or `.mp4` files into `public/`, then add them to the enum in `src/schema.ts`:

```typescript
videoFile: z.enum(["your_video.mp4", ...])
```

### App Icons

Add your icon to `public/` and update the `appIconFile` prop.

### App Store Card Screens

Place App Store screenshot images in `public/screens/` and reference them as `screens/your-file.png` in the `AppStoreCard` composition.

### Exporting App Store Cards

Render a still image (PNG) from the `AppStoreCard` composition:

```bash
npm run still:appstore
```

This uses `presets/app-store-card/last.json` to populate the props.

---

## App Store Card Sizes

Use the `AppStoreCard` composition for single-image App Store screenshots. Supported sizes:

1. iPhone 6.7" — 1290×2796
2. iPhone 6.5" — 1242×2688
3. iPhone 5.5" — 1242×2208
4. iPad 12.9" — 2048×2732

---

## Roadmap

### ✅ Completed

- [x] Zod schema sidebar configuration
- [x] 15 entrance animations with speed control
- [x] 9 background presets
- [x] Shadow/lighting effects
- [x] Screen reflections
- [x] Auto dark mode text colors
- [x] 6 bezel colors (Silver, Gold, Black, Natural, Desert, Blue)
- [x] Subtitle/tagline text field
- [x] Animation delay offset slider
- [x] Custom gradient color picker (with auto text color detection)
- [x] Multiple aspect ratios (16:9, 9:16, 1:1, 4:5)
- [x] Exit animations (8 types with timing control)
- [x] Continuous floating/breathing effect
- [x] Dynamic video file browser (auto-detect from public/)
- [x] Image/video backgrounds
- [x] Audio support (music + SFX)

### 🔜 Planned (Hard)

- [ ] Multi-scene compositions

---

## Tech Stack

- [Remotion](https://remotion.dev) — React-based video creation
- [Zod](https://zod.dev) — Schema validation + sidebar UI
- TypeScript + React

## License

ISC
