import { z } from "zod";
import { THREE_PHONES_PRESET_NAMES } from "./presetsIndex";

export const threePhonesSchema = z.object({
  presetName: z.enum(THREE_PHONES_PRESET_NAMES).describe("Preset"),

  // Screens
  screen1: z.string().describe("📱 Left Screen"), // Image file from public/ or staticFile path
  screen2: z.string().describe("📱 Center Screen"),
  screen3: z.string().describe("📱 Right Screen"),

  // Layout
  layoutMode: z.enum(["3d", "flat"]).describe("📐 Layout Mode"),
  spacing: z.number().min(0).max(300).step(10).describe("↔️ Spacing"),
  scale: z.number().min(0.5).max(1.5).step(0.05).describe("🔍 Master Scale"),
  centerScale: z.number().min(0.5).max(1.5).step(0.05).describe("🔍 Center Phone Scale"),
  sideScale: z.number().min(0.5).max(1.5).step(0.05).describe("🔍 Side Phones Scale"),
  angle: z.number().min(0).max(45).step(1).describe("📐 Side Angle (°)"),
  
  // Background
  backgroundPreset: z
    .enum([
      "lightGray",
      "darkMode",
      "sunset",
      "ocean",
      "purple",
      "midnight",
    ])
    .describe("🎨 Background"),
  
  // Bezel
  bezelColor: z
    .enum(["silver", "gold", "black", "natural", "desert", "blue"])
    .describe("Phone Color"),
});

export type ThreePhonesProps = z.infer<typeof threePhonesSchema>;
