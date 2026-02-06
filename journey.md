# 🎬 Video Studio Journey

A development journal documenting my journey building an automated video generation studio for app marketing.

---

## Day 1 — The Foundation

**Goal:** Create a starting point for generating professional app demo videos.

I set up a Remotion project to build animated videos programmatically with React. The initial concept was simple: display an iPhone with a screen recording playing inside it, alongside marketing copy.

Started with:

- Basic Remotion project structure
- A simple phone bezel component
- Hardcoded video file

**Why this approach?** Every time I ship an app, I need promotional videos for the App Store, social media, and landing pages. Hiring someone or manually editing in Premiere Pro is slow and expensive. I wanted a repeatable, customizable system.

---

## Day 2 — Making It Configurable

**Goal:** Move away from hardcoded values so I can tweak videos without touching code.

Introduced a Zod schema to define all the video properties. This does two things:

1. Type-safe props throughout the codebase
2. Remotion Studio automatically generates a sidebar UI from the schema

Added configurable:

- Video file selection
- Header text and bullet points
- Phone bezel style selection

**Why Zod?** Remotion's schema integration is magic — define your types once, get a visual editor for free. No more recompiling just to change a headline.

---

## Day 3 — Entrance Animations

**Goal:** Make the phone entrance feel polished and attention-grabbing.

Built 15 different entrance animations:

- `dropAndSlide` — classic drop + slide to reveal content
- `fadeIn`, `scaleUp`, `bounce` — standard motion library staples
- `spin`, `flip`, `swing` — more dramatic options
- `elastic`, `zoomRotate`, `float`, `glitch` — creative effects

Each uses Remotion's `spring()` function for physics-based easing.

Added animation speed control (slow, normal, fast, veryFast) and a delay offset slider.

**Why so many options?** Different platforms have different vibes. TikTok needs energy, LinkedIn needs professionalism. Having presets lets me match the tone instantly.

---

## Day 4 — Background System

**Goal:** Stop using boring solid backgrounds.

Created 9 gradient presets:

- `lightGray` — clean, professional
- `darkMode` — modern tech aesthetic
- `sunset`, `ocean`, `forest`, `purple` — vibrant options
- `midnight`, `warmGradient`, `coolGradient` — mood-specific

**Why gradients?** Flat colors look cheap. Subtle gradients add depth without distracting from the phone.

---

## Day 5 — Phone Effects & Realism

**Goal:** Make the phone look like it belongs in the scene.

Added:

- **Dynamic shadows** — 5 intensity levels (none to dramatic)
- **Light source direction** — topLeft, topRight, top, bottomLeft, bottomRight
- **Screen reflections** — subtle glass glare overlay at 3 intensities

The shadow angle follows the light source for visual consistency.

**Why this matters:** These subtle effects are the difference between "screenshot pasted on a background" and "professional product shot." It's all about perceived production value.

---

## Day 6 — Bezel Colors & Polish

**Goal:** Match the phone to different app aesthetics.

Added 6 bezel color options:

- Silver, Gold, Black (classics)
- Natural, Desert, Blue (iPhone 15 Pro colors)

Each uses carefully tuned gradients for frame, buttons, notch, and camera to look realistic.

Also added auto dark-mode text detection — the text color now automatically switches to white when the background is dark. Uses luminance calculation from the gradient colors.

**Why bezel colors?** Brand consistency. If my app has a warm color scheme, I want the phone to complement it, not clash.

---

## Day 7 — Custom Gradients

**Goal:** Full creative control over backgrounds.

Added a "Use Custom Background" toggle with:

- RGB sliders for start color (0-255 for R, G, B)
- RGB sliders for end color
- Gradient angle control (0-360°)

The auto text color detection works with custom gradients too — calculates perceived luminance and picks black or white text accordingly.

**Why RGB sliders?** The built-in color picker wasn't giving me visual controls. RGB sliders let me dial in exact brand colors and see the gradient update in real-time.

---

## Day 8 — Multiple Aspect Ratios

**Goal:** Export for every platform without redesigning.

Created 4 composition variants:
| Format | Size | Use Case |
|--------|------|----------|
| 16:9 | 1920×1080 | YouTube, websites |
| 9:16 | 1080×1920 | TikTok, Reels, Stories |
| 1:1 | 1080×1080 | Instagram feed |
| 4:5 | 1080×1350 | Instagram optimal |

The layout adapts automatically:

- Phone repositions (centered for vertical, left-aligned for landscape)
- Phone scales appropriately for each canvas
- Content repositions (below phone for vertical, beside for landscape)
- Font sizes adjust for legibility
- Bullet points hide on compact layouts

**Why this was crucial:** I was manually resizing videos in Premiere. Now I render once per aspect ratio directly from Remotion. Huge time saver.

---

## Day 9 — Exit Animations

**Goal:** Professional endings, not abrupt cuts.

Added 8 exit animation types:

- `none` — stays in place
- `fadeOut` — classic fade to transparent
- `slideUp/Down/Left/Right` — directional exits
- `zoomOut` — shrinks away
- `spin` — dramatic rotating exit

Also added timing control — "Exit Start" slider determines how many frames before the end the exit begins.

Exit animations combine with entrance animations seamlessly. The phone can drop in, float for a while, then slide out.

**Why exits matter:** It's the last impression. A polished exit makes the whole video feel intentional, not like I ran out of timeline.

---

## Day 10 — Floating/Breathing Effect

**Goal:** Keep the phone visually interesting during the "hold" period.

Added a continuous floating effect using sine wave motion:

- Gentle vertical oscillation (up/down)
- Subtle rotation wobble
- 3 intensity levels (subtle, medium, strong)

The effect fades in after the entrance animation completes and stops before exit begins.

**Why floating?** A static phone feels dead. Subtle motion keeps viewers engaged and makes the video feel more "alive" — like something you'd see in an Apple keynote.

---

## Day 11 — Dynamic Video File Browser

**Goal:** Stop editing code every time I add a new screen recording.

The hardcoded video file enum was annoying. Every time I captured a new demo, I had to open `schema.ts` and add it manually. For a tool meant to speed up my workflow, that friction was unacceptable.

Created a build script (`scripts/scan-videos.js`) that:

1. Scans the `public/` folder for video files (.mp4, .mov, .webm)
2. Generates `src/videoFiles.ts` with a typed const array
3. Exports the list for the schema to import

Updated `package.json` with npm hooks:

- `prestart` runs the scan before `remotion studio`
- `prebuild` runs the scan before rendering

Now the workflow is:

1. Drop a new `.mov` or `.mp4` into `public/`
2. Run `npm start`
3. New video appears in the dropdown — no code changes needed

**Why this was tricky:** Remotion's schema needs static values for the sidebar UI. It can't read the filesystem at runtime. The solution was code generation — a pre-build step that writes the file list to a TypeScript module.

**The compound effect:** This is exactly the kind of tooling investment that pays off. I'll add dozens of screen recordings over time. Each one now takes 5 seconds instead of 2 minutes of file editing.

---

## Day 12 — Image/Video Backgrounds

**Goal:** Use custom imagery beyond gradient presets.

Gradients are great, but sometimes you want a textured background, a branded pattern, or even a looping video backdrop. This feature adds support for both.

Created a `public/backgrounds/` folder as the designated location for background media. Extended the scan script to detect files here separately from demo videos.

Added to the schema:

- **Background Type** — "gradient" (default), "image", or "video"
- **Background File** — filename from the backgrounds folder

The `getBackground()` function now returns `undefined` when using media backgrounds, allowing the gradient layer to be transparent. A new `renderBackgroundMedia()` function conditionally renders either:

- `<Img>` for static images (covers full canvas)
- `<Video>` for looping video backgrounds (muted, auto-loops)

Both use `objectFit: "cover"` to fill the canvas without distortion.

**Implementation detail:** I used a plain string field for the background filename rather than a dropdown enum. This is because Remotion's schema needs at least one value for enums, and the backgrounds folder starts empty. Once files are added and the scan runs, they'll be detected — but the UI pattern is "type the filename" rather than "select from dropdown."

**Why this matters:** Stock video sites are full of beautiful abstract backgrounds. Now I can drop one in and instantly see how it looks behind my phone demo. The visual polish difference is significant.

---

## Day 13 — Typography & Layout Polish

**Goal:** Make text legible on any background and fix layout regressions.

With image backgrounds now possible, plain text often gets lost. I implemented a robust font customization system:

- **Text Shadows:** Selectable intensity (none, subtle, medium, strong)
- **Font Control:** Adjustable size and weight for headers and subtitles
- **Smart defaults:** Everything looks good out of the box

**The "Z-Index" Bug:**
I encountered a tricky issue where the text was floating _on top_ of the phone bezel, breaking the 3D illusion. This happened because I appended the text layer last in the DOM.

**The Fix:**
I reordered the rendering layers:

1. Background (Bottom)
2. Text Content (Middle)
3. Phone Bezel (Top)

I also restored the absolute positioning logic to ensure the "side-by-side" layout works correctly in landscape mode (Phone Left, Text Right) while keeping portrait mode centered.

---

## Day 14 — Audio Support & Static Screenshots

**Goal:** Complete the sensory experience and support App Store assets.

**Audio:**
- Added an `Audio` folder scan script (similar to videos/backgrounds)
- Implemented `<Audio />` component in the main composition
- Added volume control (0-100%)
- Now videos can have background music or voiceovers!

**Static Screenshots (AppStoreCard):**
- Built a new composition specifically for exporting PNGs
- Supports standard App Store sizes (iPhone 6.7", iPad 12.9", etc.)
- Simplified layout: Headline + Phone + Background (no animation props)
- Perfect for generating the 3-5 mandatory screenshots for the App Store.

---

## Day 15 — Production & Deployment

**Goal:** Go live. Move from a local dev tool to a hosted web application.

This was a massive infrastructure day. I transitioned the project from a simple local React app to a full-stack production service.

**1. Authentication & Security:**
- Built a client-side auth system (Login, Register, Dashboard)
- Secured the API with JWT (JSON Web Tokens)
- Hashed passwords using `bcrypt` for security

**2. Database Migration:**
- Moved from `lowdb` (local JSON file) to **PostgreSQL**
- Integrated **Prisma ORM** for robust database management
- Successfully migrated local user data to the production database

**3. Containerization (Docker):**
- Created a `Dockerfile` based on Node 22 (required by Prisma)
- Configured `docker-compose` for local testing with Postgres
- Verified the build locally before deploying

**4. Deployment on Railway:**
- Deployed the full stack to Railway
- Connected a managed Postgres service
- Solved a tricky "Multiple Domains" issue by implementing a **Reverse Proxy** in Express
- Now, the API (port 3002) and Remotion Studio (port 3000) are both accessible via a single HTTPS domain!

**Outcome:**
The Remotion Video Studio is now a live web app. I can log in from anywhere, access my dashboard, and launch the editor to create videos in the cloud.

---

## Reflections

This project started as a weekend experiment and turned into a legitimate tool I'll use for every app launch. The key insight: invest in tooling that compounds. Every hour spent building this studio saves hours on every future promotional video.

The Remotion + Zod combination is incredibly powerful. Define your schema once, get a visual editor and type safety everywhere. No more hunting through code to change a color value.

— _Building in public, one feature at a time._