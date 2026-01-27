import React from "react";
import {
  AbsoluteFill,
  Video,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
  Img,
} from "remotion";
import { SlimBezel } from "./SlimBezel";

export const DemoVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // --- Animation Keyframes ---
  const initialDropEnd = 60;
  const slideStart = 90;
  const slideEnd = 120;
  const contentAppearStart = 130;

  // --- Animation 1: Initial Drop & Bounce ---
  const dropProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100, mass: 1.5 },
    durationInFrames: initialDropEnd,
  });
  const phoneY_drop = interpolate(dropProgress, [0, 1], [-height, 0]);

  // --- Animation 2: Smooth Slide to Left ---
  const slideProgress = spring({
    frame: frame - slideStart,
    fps,
    config: { damping: 200, stiffness: 120 },
    durationInFrames: slideEnd - slideStart,
  });
  const phoneX_slide = interpolate(slideProgress, [0, 1], [0, -width * 0.25]);

  // Combine animations
  const finalPhoneY = phoneY_drop;
  const finalPhoneX = frame < slideStart ? 0 : phoneX_slide;

  // --- Animation 3: Content Appearances ---
  const contentOpacity = spring({
    frame: frame - contentAppearStart,
    fps,
    config: { damping: 200 },
    durationInFrames: 30,
  });

  const BulletPoint: React.FC<{ children: React.ReactNode; delay: number }> = ({
    children,
    delay,
  }) => {
    const appear = spring({
      frame: frame - (contentAppearStart + delay),
      fps,
      config: { damping: 200 },
      durationInFrames: 30,
    });
    return (
      <div
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 28,
          color: "#4a4a4a",
          fontWeight: 500,
          marginBottom: 18,
          opacity: appear,
          transform: `translateY(${(1 - appear) * 20}px)`,
        }}
      >
        <span style={{ marginRight: 15, color: "#2ecc71" }}>✓</span>
        {children}
      </div>
    );
  };

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e8ebf0 100%)",
      }}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Animated Phone */}
        <div
          style={{
            transform: `translateX(${finalPhoneX}px) translateY(${finalPhoneY}px)`,
          }}
        >
          <SlimBezel scale={0.75}>
            <Video
              src={staticFile("neat_nest_demo.mp4")}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              startFrom={0}
              volume={0}
            />
          </SlimBezel>
        </div>

        {/* --- Right Side Content --- */}
        <div
          style={{
            position: "absolute",
            width: "48%",
            right: 0,
            transform: `translateX(-${width * 0.05}px)`,
            opacity: contentOpacity,
            textAlign: "left", // Align all content to the left
          }}
        >
          <h1
            style={{
              fontFamily: "Roboto, sans-serif", // Google Sans style
              fontSize: 48,
              color: "black", // Solid black
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Neat Nest - Home Cleaning
          </h1>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
            <Img
              src={staticFile("app_logo_small.png")}
              style={{ width: 80, height: 80, marginRight: 20 }}
            />
            <Img
              src={staticFile("dl_logo.svg")}
              style={{
                width: 180,
              }}
            />
          </div>
          <div>
            <BulletPoint delay={0}>Get a daily cleaning schedule.</BulletPoint>
            <BulletPoint delay={20}>Stay consistent with streaks.</BulletPoint>
            <BulletPoint delay={40}>Set reminders for your routines.</BulletPoint>
            <BulletPoint delay={60}>Keep your plan flexible.</BulletPoint>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
