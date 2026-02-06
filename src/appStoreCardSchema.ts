import { z } from "zod";
import { APP_STORE_SIZE_OPTIONS } from "./appStoreSizes";
import { BACKGROUND_FILES, SCREEN_FILES } from "./videoFiles";
import { APP_STORE_CARD_PRESET_NAMES } from "./presetsIndex";

const BACKGROUND_FILE_OPTIONS = ["none", ...BACKGROUND_FILES] as const;
const SCREEN_FILE_OPTIONS = [
  "screens/placeholder.png",
  ...SCREEN_FILES,
] as const;

export const appStoreCardSchema = z.object({
  presetName: z.enum(APP_STORE_CARD_PRESET_NAMES).describe("Preset"),

  screenshotSize: z
    .enum(APP_STORE_SIZE_OPTIONS)
    .describe("📏 Screenshot Size"),

  // Screen image (from public/)
  screenFile: z
    .enum(SCREEN_FILE_OPTIONS)
    .describe("📱 Screen Image (public/screens/...)"),

  // Text
  headlineText: z.string().describe("📝 Headline Text"),
  headlineFontSize: z
    .number()
    .min(24)
    .max(180)
    .step(2)
    .describe("📝 Headline Size"),
  fontWeight: z
    .enum(["normal", "medium", "semibold", "bold", "extrabold"])
    .describe("📝 Headline Weight"),
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
    .describe("📝 Font Family"),
  textColor: z.enum(["auto", "light", "dark"]).describe("📝 Text Color"),
  textShadowIntensity: z
    .enum(["none", "subtle", "medium", "strong"])
    .describe("📝 Text Shadow"),
  headerOffsetY: z
    .number()
    .min(-300)
    .max(300)
    .step(1)
    .describe("📝 Header Y Offset"),
  phoneOffsetY: z
    .number()
    .min(-600)
    .max(600)
    .step(1)
    .describe("📱 Phone Y Offset"),

  // Phone bezel
  bezelStyle: z.enum(["slim", "iphone16pro", "ipad12_9"]).describe("Device Style"),
  bezelColor: z
    .enum(["silver", "gold", "black", "natural", "desert", "blue"])
    .describe("Phone Color"),
  phoneScale: z
    .number()
    .min(0.6)
    .max(1)
    .step(0.05)
    .describe("📱 Phone Scale"),

  // Background
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
    .describe("🎨 Background Style"),
  backgroundType: z
    .enum(["gradient", "image"])
    .describe("🎨 Background Type"),
  backgroundFile: z
    .enum(BACKGROUND_FILE_OPTIONS)
    .describe("🎨 Background File"),

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

  customGradientAngle: z
    .number()
    .min(0)
    .max(360)
    .step(1)
    .describe("🔄 Gradient Angle (deg)"),
});

export type AppStoreCardProps = z.infer<typeof appStoreCardSchema>;
