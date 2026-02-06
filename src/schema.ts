import { z } from "zod";
import {
  VIDEO_FILES,
  BACKGROUND_FILES,
  AUDIO_FILES,
  SCREEN_FILES,
} from "./videoFiles";
import { DEMO_VIDEO_PRESET_NAMES } from "./presetsIndex";

const VIDEO_FILE_OPTIONS = ["none", ...VIDEO_FILES] as const;
const AUDIO_FILE_OPTIONS = ["none", ...AUDIO_FILES] as const;
const BACKGROUND_FILE_OPTIONS = [
  "none",
  ...BACKGROUND_FILES,
  ...SCREEN_FILES,
] as const;
const APP_ICON_FILE_OPTIONS = ["none", "app_logo_small.png", ...SCREEN_FILES] as const;

export const demoVideoSchema = z.object({
  isActive: z.boolean().describe("Is Active").default(true),
  durationInFrames: z.number().min(1).describe("Duration (frames)").default(300),
  presetName: z.enum(DEMO_VIDEO_PRESET_NAMES).describe("Preset").optional(),

  // Video source (auto-detected from public/ folder)
  videoFile: z.enum(VIDEO_FILE_OPTIONS).describe("Demo Video"),

  // Phone bezel style
  bezelStyle: z.enum(["slim", "iphone16pro"]).describe("Phone Style"),
  // Note: Enum values appear as-is in sidebar. Using readable values:

  // Phone bezel color
  bezelColor: z
    .enum(["silver", "gold", "black", "natural", "desert", "blue"])
    .describe("Phone Color"),

  // Animation type
  animationType: z
    .enum([
      "dropAndSlide",
      "dropOnly",
      "fadeIn",
      "spin",
      "scaleUp",
      "slideFromRight",
      "slideFromLeft",
      "bounce",
      "flip",
      "swing",
      "elastic",
      "zoomRotate",
      "float",
      "glitch",
      "none",
    ])
    .describe("Animation"),

  // Animation speed
  animationSpeed: z
    .enum(["slow", "normal", "fast", "veryFast"])
    .describe("Animation Speed"),

  // Animation delay (in frames at 30fps, so 0-60 = 0-2 seconds)
  animationDelay: z
    .number()
    .min(0)
    .max(60)
    .describe("Animation Delay (frames)"),

  // App branding
  showAppIcon: z.boolean().describe("Show App Icon"),
  appIconFile: z.enum(APP_ICON_FILE_OPTIONS).describe("App Icon File"),
  appIconSize: z
    .number()
    .min(30)
    .max(140)
    .step(2)
    .describe("App Icon Size"),
  showAppStoreButton: z.boolean().describe("Show App Store Button"),

  // Text content
  headerText: z.string().describe("Header Text"),
  subtitle: z.string().describe("Subtitle / Tagline"),
  bulletPoints: z.array(z.string()).min(1).max(6).describe("Bullet Points"),

  // Font styling
  textShadowIntensity: z
    .enum(["none", "subtle", "medium", "strong"])
    .describe("🔤 Text Shadow"),
  headerFontSize: z
    .number()
    .min(24)
    .max(80)
    .step(2)
    .describe("🔤 Header Font Size"),
  subtitleFontSize: z
    .number()
    .min(14)
    .max(40)
    .step(1)
    .describe("🔤 Subtitle Font Size"),
  fontWeight: z
    .enum(["normal", "medium", "semibold", "bold", "extrabold"])
    .describe("🔤 Header Font Weight"),
  fontFamily: z
    .enum([
      "Roboto",
      "Inter",
      "Lato",
      "Oswald",
      "Playfair Display",
      "Montserrat",
      "Open Sans",
      "Poppins",
      "Merriweather",
      "Nunito",
      "Raleway",
      "Ubuntu",
      "PT Sans",
      "Rubik",
      "Lora",
      "Work Sans",
    ])
    .describe("🔤 Font Family"),

  // Audio settings
  audioFile: z.enum(AUDIO_FILE_OPTIONS).describe("🎵 Audio File"),
  audioVolume: z
    .number()
    .min(0)
    .max(1)
    .step(0.05)
    .describe("🎵 Audio Volume"),

  // Background styling
  backgroundPreset: z
    .enum([
      "lightGray",
      "darkMode",
      "sunset",
      "ocean",
      "forest",
      "purple",
      "midnight",
      "warmGradient",
      "coolGradient",
    ])
    .describe("Background Style"),

  // Background type: gradient (presets/custom) or media (image/video)
  backgroundType: z
    .enum(["gradient", "image", "video"])
    .describe("🖼️ Background Type"),
  
  // Background file (for image/video types) - filename from public/backgrounds/
  backgroundFile: z.enum(BACKGROUND_FILE_OPTIONS).describe("🖼️ Background File"),

  // Custom background gradient (enable toggle to use these)
  useCustomBackground: z.boolean().describe("✨ Use Custom Gradient"),
  
  // Start color RGB sliders (0-255)
  startColorR: z.number().min(0).max(255).step(1).describe("🔴 Start Red"),
  startColorG: z.number().min(0).max(255).step(1).describe("🟢 Start Green"),
  startColorB: z.number().min(0).max(255).step(1).describe("🔵 Start Blue"),
  
  // End color RGB sliders (0-255)
  endColorR: z.number().min(0).max(255).step(1).describe("🔴 End Red"),
  endColorG: z.number().min(0).max(255).step(1).describe("🟢 End Green"),
  endColorB: z.number().min(0).max(255).step(1).describe("🔵 End Blue"),
  
  customGradientAngle: z.number().min(0).max(360).step(1).describe("🔄 Gradient Angle (°)"),

  // Phone effects
  shadowIntensity: z
    .enum(["none", "subtle", "medium", "strong", "dramatic"])
    .describe("Shadow Intensity"),
  lightAngle: z
    .enum(["topLeft", "topRight", "top", "bottomLeft", "bottomRight"])
    .describe("Light Source"),
  showReflection: z.boolean().describe("Screen Reflection"),
  reflectionIntensity: z
    .enum(["subtle", "medium", "strong"])
    .describe("Reflection Intensity"),

  // Exit animations
  exitAnimationType: z
    .enum([
      "none",
      "fadeOut",
      "slideUp",
      "slideDown",
      "slideLeft",
      "slideRight",
      "zoomOut",
      "spin",
    ])
    .describe("🔚 Exit Animation"),
  exitAnimationStart: z
    .number()
    .min(0)
    .max(90)
    .step(1)
    .describe("🔚 Exit Start (frames before end)"),

  // Floating/breathing effect
  enableFloating: z.boolean().describe("🎈 Enable Floating Effect"),
  floatingIntensity: z
    .enum(["subtle", "medium", "strong"])
    .describe("🎈 Floating Intensity"),
});

export type DemoVideoProps = z.infer<typeof demoVideoSchema>;
