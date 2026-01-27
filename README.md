# Remotion Simulator to Screen Recording Showcase

This is a Remotion project that creates a promotional video for iOS apps recorded using the simulator. The video showcases the app's features using a sleek iPhone bezel, animated bullet points, and app branding.

## Features

- Custom-designed, slim iPhone 16 Pro bezel.
- Animated video of the app in action (`neat_nest_demo.mp4`).
- Animated bullet points highlighting key features for a general app:
  - Get a daily cleaning schedule.
  - Stay consistent with streaks.
  - Set reminders for your routines.
  - Keep your plan flexible.
- App logo and "Download on the App Store" icon.
- Engaging bounce and slide animations for the phone.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your machine.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd remotion_videos
    ```

    (Replace `<repository_url>` with the actual URL of your repository.)

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Project

#### 1. Start the Remotion Studio (for live preview and development)

To open the Remotion Studio in your browser, run:

```bash
npm start
# or
yarn start
```

This will allow you to preview the video, scrub through frames, and make live adjustments.

#### 2. Render the Video (to generate a final MP4 file)

To render the video to an MP4 file (e.g., `out/demo.mp4`), run:

```bash
npm run render
# or
yarn render
```

The rendered video will be saved in the `out/` directory.

## Project Structure

- `src/DemoVideo.tsx`: The main Remotion composition defining the video's content and animations.
- `src/SlimBezel.tsx`: React component for the custom CSS-based iPhone bezel.
- `public/`: Contains static assets like the `neat_nest_demo.mp4` video, `app_logo_small.png`, and `dl_logo.svg`.
- `remotion.config.ts`: Remotion configuration file.
- `package.json`: Project dependencies and scripts.
