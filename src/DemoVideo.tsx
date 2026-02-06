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
  Audio,
} from "remotion";
// Google Fonts are loaded via src/fonts.css
import { PhoneBezel } from "./PhoneBezel";
import { DemoVideoProps } from "./schema";
import { usePersistedProps } from "./persistedProps";
import { StudioPresetExport } from "./StudioPresetExport";
import { DEMO_VIDEO_PRESETS } from "./presetsIndex";
import { usePresetApplier } from "./usePresetApplier";

export const DemoVideo: React.FC<DemoVideoProps> = (props) => {
  usePersistedProps("remotion:DemoVideo", props);

  const {
    videoFile,
  bezelStyle,
  bezelColor,
  animationType,
  animationSpeed,
  animationDelay,
  showAppIcon,
  appIconFile,
  appIconSize,
  showAppStoreButton,
  headerText,
  subtitle,
  bulletPoints,
  textShadowIntensity,
  headerFontSize,
  subtitleFontSize,
  fontWeight,
  fontFamily,
  audioFile,
  audioVolume,
  backgroundPreset,
  backgroundType,
  backgroundFile,
  useCustomBackground,
  startColorR,
  startColorG,
  startColorB,
  endColorR,
  endColorG,
  endColorB,
  customGradientAngle,
  shadowIntensity,
  lightAngle,
  showReflection,
  reflectionIntensity,
  exitAnimationType,
  exitAnimationStart,
  enableFloating,
    floatingIntensity,
  } = props;
  const [videoError, setVideoError] = React.useState(false);
  const [appIconError, setAppIconError] = React.useState(false);
  const [appStoreButtonError, setAppStoreButtonError] = React.useState(false);
  const [appStoreButtonSrc, setAppStoreButtonSrc] = React.useState(
    "screens/dl_logo.svg"
  );

  React.useEffect(() => {
    setVideoError(false);
  }, [videoFile]);

  React.useEffect(() => {
    setAppIconError(false);
  }, [appIconFile]);

  React.useEffect(() => {
    setAppStoreButtonError(false);
    setAppStoreButtonSrc("screens/dl_logo.svg");
  }, [showAppStoreButton]);

  const handleAppStoreButtonError = () => {
    if (appStoreButtonSrc !== "dl_logo.svg") {
      setAppStoreButtonSrc("dl_logo.svg");
      return;
    }
    setAppStoreButtonError(true);
  };
  const frame = useCurrentFrame();
  const { fps, width, height, id } = useVideoConfig();
  usePresetApplier(id, props.presetName, DEMO_VIDEO_PRESETS);

  // --- Font Loading ---
  // Fonts are loaded via index.ts -> fonts.css
  
  const getFontFamily = () => {
    switch (fontFamily) {
      case "Inter": return "Inter, sans-serif";
      case "Roboto": return "Roboto, sans-serif";
      case "Lato": return "Lato, sans-serif";
      case "Oswald": return "Oswald, sans-serif";
      case "Playfair Display": return "'Playfair Display', serif";
      case "Montserrat": return "Montserrat, sans-serif";
      case "Open Sans": return "'Open Sans', sans-serif";
      case "Poppins": return "Poppins, sans-serif";
      case "Merriweather": return "Merriweather, serif";
      case "Nunito": return "Nunito, sans-serif";
      case "Raleway": return "Raleway, sans-serif";
      case "Ubuntu": return "Ubuntu, sans-serif";
      case "PT Sans": return "'PT Sans', sans-serif";
      case "Rubik": return "Rubik, sans-serif";
      case "Lora": return "Lora, serif";
      case "Work Sans": return "'Work Sans', sans-serif";
      default: return "Roboto, sans-serif";
    }
  };
  
  const selectedFont = getFontFamily();

  // --- Aspect Ratio Detection ---
  const aspectRatio = width / height;
  const isVertical = aspectRatio < 0.7; // 9:16 = 0.5625
  const isSquare = aspectRatio >= 0.9 && aspectRatio <= 1.1; // ~1:1
  const isPortrait = aspectRatio >= 0.7 && aspectRatio < 0.9; // 4:5 = 0.8
  const isLandscape = aspectRatio > 1.1; // 16:9 = 1.78

  // --- Layout Configuration ---
  const layout = {
    // Phone position offset (relative to center)
    phoneOffsetX: isLandscape ? -width * 0.25 : 0,
    phoneOffsetY: isVertical ? -height * 0.2 : isSquare || isPortrait ? -height * 0.15 : 0,
    // Phone scale
    phoneScale: isVertical ? 0.55 : isSquare ? 0.5 : isPortrait ? 0.55 : 0.75,
    // Content positioning
    contentWidth: isLandscape ? "48%" : "90%",
    contentPosition: isLandscape ? "right" : "bottom",
    contentOffsetY: isVertical ? height * 0.35 : isSquare || isPortrait ? height * 0.3 : 0,
    // Font sizes (smaller for compact layouts)
    headerSize: isLandscape ? 48 : isVertical ? 38 : 36,
    subtitleSize: isLandscape ? 22 : 18,
    bulletSize: isLandscape ? 28 : 22,
  };

  // --- Animation Delay ---
  const delayedFrame = Math.max(0, frame - animationDelay);

  // --- Speed Multiplier ---
  const speedMultiplier: Record<string, number> = {
    slow: 1.5,
    normal: 1,
    fast: 0.6,
    veryFast: 0.35,
  };
  const speed = speedMultiplier[animationSpeed] || 1;

  // --- Animation Keyframes (scaled by speed) ---
  const initialDropEnd = Math.round(60 * speed);
  const slideStart = Math.round(90 * speed);
  const slideEnd = Math.round(120 * speed);
  const contentAppearStart = Math.round(130 * speed);

  // --- Animation calculations based on type ---
  const getAnimationValues = () => {
    switch (animationType) {
      case "dropAndSlide": {
        const dropProgress = spring({
          frame: delayedFrame,
          fps,
          config: { damping: 15, stiffness: 100, mass: 1.5 },
          durationInFrames: initialDropEnd,
        });
        const phoneY_drop = interpolate(dropProgress, [0, 1], [-height, 0]);

        const slideProgress = spring({
          frame: frame - slideStart,
          fps,
          config: { damping: 200, stiffness: 120 },
          durationInFrames: slideEnd - slideStart,
        });
        const phoneX_slide = interpolate(
          slideProgress,
          [0, 1],
          [0, -width * 0.25]
        );

        return {
          phoneY: phoneY_drop,
          phoneX: frame < slideStart ? 0 : phoneX_slide,
          phoneOpacity: 1,
        };
      }
      case "dropOnly": {
        const dropProgress = spring({
          frame: delayedFrame,
          fps,
          config: { damping: 15, stiffness: 100, mass: 1.5 },
          durationInFrames: initialDropEnd,
        });
        const phoneY_drop = interpolate(dropProgress, [0, 1], [-height, 0]);

        return {
          phoneY: phoneY_drop,
          phoneX: -width * 0.25,
          phoneOpacity: 1,
        };
      }
      case "fadeIn": {
        const fadeProgress = spring({
          frame: delayedFrame,
          fps,
          config: { damping: 200 },
          durationInFrames: Math.round(60 * speed),
        });

        return {
          phoneY: 0,
          phoneX: -width * 0.25,
          phoneOpacity: fadeProgress,
        };
      }
      case "spin": {
        const spinProgress = spring({
          frame: delayedFrame,
          fps,
          config: { damping: 12, stiffness: 80, mass: 1 },
          durationInFrames: Math.round(90 * speed),
        });
        const rotation = interpolate(spinProgress, [0, 1], [720, 0]);
        const scale = interpolate(spinProgress, [0, 1], [0.3, 1]);

        return {
          phoneY: 0,
          phoneX: -width * 0.25,
          phoneOpacity: spinProgress,
          phoneRotation: rotation,
          phoneScale: scale,
        };
      }
      case "scaleUp": {
        const scaleProgress = spring({
          frame: delayedFrame,
          fps,
          config: { damping: 15, stiffness: 100, mass: 1.2 },
          durationInFrames: Math.round(60 * speed),
        });
        const scale = interpolate(scaleProgress, [0, 1], [0, 1]);

        return {
          phoneY: 0,
          phoneX: -width * 0.25,
          phoneOpacity: scaleProgress,
          phoneScale: scale,
        };
      }
      case "slideFromRight": {
        const slideProgress = spring({
          frame: delayedFrame,
          fps,
          config: { damping: 20, stiffness: 100 },
          durationInFrames: Math.round(60 * speed),
        });
        const phoneX = interpolate(
          slideProgress,
          [0, 1],
          [width, -width * 0.25]
        );

        return {
          phoneY: 0,
          phoneX,
          phoneOpacity: 1,
        };
      }
      case "bounce": {
        const bounceProgress = spring({
          frame: delayedFrame,
          fps,
          config: { damping: 8, stiffness: 150, mass: 1 },
          durationInFrames: Math.round(90 * speed),
        });
        const phoneY = interpolate(bounceProgress, [0, 1], [-height * 1.5, 0]);

        return {
          phoneY,
          phoneX: -width * 0.25,
          phoneOpacity: 1,
        };
      }
      case "slideFromLeft": {
        const slideProgress = spring({
          frame: delayedFrame,
          fps,
          config: { damping: 20, stiffness: 100 },
          durationInFrames: Math.round(60 * speed),
        });
        const phoneX = interpolate(
          slideProgress,
          [0, 1],
          [-width, -width * 0.25]
        );

        return {
          phoneY: 0,
          phoneX,
          phoneOpacity: 1,
        };
      }
      case "swing": {
        const swingProgress = spring({
          frame: delayedFrame,
          fps,
          config: { damping: 8, stiffness: 60, mass: 1.5 },
          durationInFrames: Math.round(120 * speed),
        });
        const rotation = interpolate(swingProgress, [0, 1], [-30, 0]);
        const phoneY = interpolate(swingProgress, [0, 1], [-height * 0.3, 0]);

        return {
          phoneY,
          phoneX: -width * 0.25,
          phoneOpacity: swingProgress,
          phoneRotation: rotation,
        };
      }
      case "elastic": {
        const elasticProgress = spring({
          frame: delayedFrame,
          fps,
          config: { damping: 6, stiffness: 120, mass: 0.8 },
          durationInFrames: Math.round(90 * speed),
        });
        const scale = interpolate(elasticProgress, [0, 1], [0.2, 1]);
        const rotation = interpolate(elasticProgress, [0, 1], [15, 0]);

        return {
          phoneY: 0,
          phoneX: -width * 0.25,
          phoneOpacity: elasticProgress,
          phoneScale: scale,
          phoneRotation: rotation,
        };
      }
      case "zoomRotate": {
        const zoomProgress = spring({
          frame: delayedFrame,
          fps,
          config: { damping: 12, stiffness: 80 },
          durationInFrames: Math.round(75 * speed),
        });
        const scale = interpolate(zoomProgress, [0, 1], [3, 1]);
        const rotation = interpolate(zoomProgress, [0, 1], [180, 0]);

        return {
          phoneY: 0,
          phoneX: -width * 0.25,
          phoneOpacity: zoomProgress,
          phoneScale: scale,
          phoneRotation: rotation,
        };
      }
      case "float": {
        const floatProgress = spring({
          frame: delayedFrame,
          fps,
          config: { damping: 25, stiffness: 50 },
          durationInFrames: Math.round(90 * speed),
        });
        const floatY = interpolate(floatProgress, [0, 1], [height * 0.5, 0]);
        const floatRotation = interpolate(floatProgress, [0, 1], [5, 0]);

        return {
          phoneY: floatY,
          phoneX: -width * 0.25,
          phoneOpacity: floatProgress,
          phoneRotation: floatRotation,
        };
      }
      case "glitch": {
        // Glitch effect with random-like jitter that settles
        const glitchProgress = spring({
          frame: delayedFrame,
          fps,
          config: { damping: 20, stiffness: 200 },
          durationInFrames: Math.round(45 * speed),
        });
        const jitter = frame < 30 ? Math.sin(frame * 5) * (30 - frame) : 0;
        const phoneX = -width * 0.25 + jitter;
        const phoneY = jitter * 0.5;

        return {
          phoneY,
          phoneX,
          phoneOpacity: glitchProgress,
        };
      }
      case "flip": {
        const flipProgress = spring({
          frame: delayedFrame,
          fps,
          config: { damping: 15, stiffness: 80 },
          durationInFrames: Math.round(75 * speed),
        });
        const rotateY = interpolate(flipProgress, [0, 1], [180, 0]);

        return {
          phoneY: 0,
          phoneX: -width * 0.25,
          phoneOpacity: flipProgress,
          phoneRotateY: rotateY,
        };
      }
      case "none":
      default:
        return {
          phoneY: 0,
          phoneX: -width * 0.25,
          phoneOpacity: 1,
        };
    }
  };

  const animationValues = getAnimationValues();
  
  // Apply layout offsets based on aspect ratio
  // For non-landscape, override the X offset and add Y offset
  const basePhoneX = isLandscape ? animationValues.phoneX : 0;
  const basePhoneY = animationValues.phoneY + layout.phoneOffsetY;
  
  // --- Get total duration for exit calculations ---
  const { durationInFrames } = useVideoConfig();
  
  // --- Exit Animation Logic ---
  const getExitAnimationValues = () => {
    const exitStart = durationInFrames - exitAnimationStart;
    const exitFrame = frame - exitStart;
    
    // If we haven't reached exit start, return neutral values
    if (frame < exitStart || exitAnimationType === "none") {
      return { exitX: 0, exitY: 0, exitOpacity: 1, exitRotation: 0, exitScale: 1 };
    }
    
    const exitProgress = spring({
      frame: exitFrame,
      fps,
      config: { damping: 20, stiffness: 80 },
      durationInFrames: exitAnimationStart,
    });
    
    switch (exitAnimationType) {
      case "fadeOut":
        return { exitX: 0, exitY: 0, exitOpacity: 1 - exitProgress, exitRotation: 0, exitScale: 1 };
      case "slideUp":
        return { exitX: 0, exitY: interpolate(exitProgress, [0, 1], [0, -height * 1.2]), exitOpacity: 1, exitRotation: 0, exitScale: 1 };
      case "slideDown":
        return { exitX: 0, exitY: interpolate(exitProgress, [0, 1], [0, height * 1.2]), exitOpacity: 1, exitRotation: 0, exitScale: 1 };
      case "slideLeft":
        return { exitX: interpolate(exitProgress, [0, 1], [0, -width]), exitY: 0, exitOpacity: 1, exitRotation: 0, exitScale: 1 };
      case "slideRight":
        return { exitX: interpolate(exitProgress, [0, 1], [0, width]), exitY: 0, exitOpacity: 1, exitRotation: 0, exitScale: 1 };
      case "zoomOut":
        return { exitX: 0, exitY: 0, exitOpacity: 1 - exitProgress, exitRotation: 0, exitScale: interpolate(exitProgress, [0, 1], [1, 0.3]) };
      case "spin":
        return { exitX: 0, exitY: 0, exitOpacity: 1 - exitProgress * 0.5, exitRotation: interpolate(exitProgress, [0, 1], [0, 720]), exitScale: interpolate(exitProgress, [0, 1], [1, 0.2]) };
      default:
        return { exitX: 0, exitY: 0, exitOpacity: 1, exitRotation: 0, exitScale: 1 };
    }
  };
  
  const exitValues = getExitAnimationValues();
  
  // --- Floating/Breathing Effect ---
  const getFloatingOffset = () => {
    if (!enableFloating) return { floatY: 0, floatRotation: 0 };
    
    // Intensity settings
    const intensityMap: Record<string, { amplitude: number; rotationAmplitude: number; speed: number }> = {
      subtle: { amplitude: 8, rotationAmplitude: 0.5, speed: 0.04 },
      medium: { amplitude: 15, rotationAmplitude: 1, speed: 0.05 },
      strong: { amplitude: 25, rotationAmplitude: 1.5, speed: 0.06 },
    };
    const settings = intensityMap[floatingIntensity] || intensityMap.subtle;
    
    // Only float after entrance animation has mostly completed
    const entranceComplete = frame > contentAppearStart;
    
    // Fade in the floating effect after entrance
    const floatFadeIn = entranceComplete ? Math.min(1, (frame - contentAppearStart) / 30) : 0;
    
    // Calculate sine wave oscillation
    const floatY = Math.sin(frame * settings.speed) * settings.amplitude * floatFadeIn;
    const floatRotation = Math.sin(frame * settings.speed * 0.7) * settings.rotationAmplitude * floatFadeIn;
    
    return { floatY, floatRotation };
  };
  
  const floatingOffset = getFloatingOffset();
  
  // Apply entrance + floating + exit animations
  const phoneY = basePhoneY + floatingOffset.floatY + exitValues.exitY;
  const phoneX = basePhoneX + exitValues.exitX;
  const phoneOpacity = animationValues.phoneOpacity * exitValues.exitOpacity;
  const phoneRotation = (animationValues.phoneRotation ?? 0) + floatingOffset.floatRotation + exitValues.exitRotation;
  const phoneScale = (animationValues.phoneScale ?? 1) * layout.phoneScale / 0.75 * exitValues.exitScale;
  const phoneRotateY = animationValues.phoneRotateY ?? 0;
  
  // Content exit opacity (fade out with phone)
  const contentExitOpacity = exitValues.exitOpacity;

  // --- Background Presets ---
  const getBackground = (): string | undefined => {
    // Return undefined for media backgrounds (rendered separately)
    if (backgroundType === "image" || backgroundType === "video") {
      if (backgroundFile !== "none") {
        return undefined; // Will render media component instead
      }
      // Fall back to gradient if no file specified
    }
    
    // Use custom gradient if enabled
    if (useCustomBackground) {
      const startColor = `rgb(${startColorR}, ${startColorG}, ${startColorB})`;
      const endColor = `rgb(${endColorR}, ${endColorG}, ${endColorB})`;
      return `linear-gradient(${customGradientAngle}deg, ${startColor} 0%, ${endColor} 100%)`;
    }

    const backgrounds: Record<string, string> = {
      lightGray: "linear-gradient(135deg, #f5f7fa 0%, #e8ebf0 100%)",
      darkMode: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      sunset: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
      ocean: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      forest: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
      purple: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      midnight: "linear-gradient(135deg, #232526 0%, #414345 100%)",
      warmGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      coolGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    };
    return backgrounds[backgroundPreset] || backgrounds.lightGray;
  };

  // --- Render Background Media ---
  const resolveBackgroundMediaSrc = () => {
    if (backgroundFile === "none") return null;
    const normalized = backgroundFile.replace(/^\//, "");
    if (normalized.includes("/")) {
      return staticFile(normalized);
    }
    return staticFile(`backgrounds/${normalized}`);
  };

  const renderBackgroundMedia = () => {
    const mediaPath = resolveBackgroundMediaSrc();
    if (!mediaPath) return null;
    
    if (backgroundType === "image") {
      return (
        <Img
          src={mediaPath}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      );
    }
    
    if (backgroundType === "video") {
      return (
        <Video
          src={mediaPath}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          loop
          muted
        />
      );
    }
    
    return null;
  };

  // --- Shadow Styling ---
  const getShadow = () => {
    const lightAngles: Record<string, { x: number; y: number }> = {
      topLeft: { x: 15, y: 15 },
      topRight: { x: -15, y: 15 },
      top: { x: 0, y: 20 },
      bottomLeft: { x: 15, y: -15 },
      bottomRight: { x: -15, y: -15 },
    };
    const angle = lightAngles[lightAngle] || lightAngles.topLeft;

    const shadows: Record<string, string> = {
      none: "none",
      subtle: `${angle.x}px ${angle.y}px 20px rgba(0, 0, 0, 0.15)`,
      medium: `${angle.x}px ${angle.y}px 40px rgba(0, 0, 0, 0.25)`,
      strong: `${angle.x}px ${angle.y}px 60px rgba(0, 0, 0, 0.35), ${angle.x / 2}px ${angle.y / 2}px 20px rgba(0, 0, 0, 0.2)`,
      dramatic: `${angle.x}px ${angle.y}px 80px rgba(0, 0, 0, 0.45), ${angle.x}px ${angle.y}px 30px rgba(0, 0, 0, 0.3), 0 0 100px rgba(0, 0, 0, 0.2)`,
    };
    return shadows[shadowIntensity] || shadows.medium;
  };

  // --- Reflection Gradient (Glass Glare Effect) ---
  const getReflectionGradient = () => {
    if (!showReflection) return "none";
    
    // Multiple overlapping gradients for realistic glass glare
    const intensities: Record<string, string> = {
      subtle: `
        linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0) 40%),
        linear-gradient(315deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 30%)
      `,
      medium: `
        linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0) 50%),
        linear-gradient(315deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 35%),
        linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)
      `,
      strong: `
        linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 15%, rgba(255,255,255,0.1) 35%, rgba(255,255,255,0) 55%),
        linear-gradient(315deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0) 60%),
        linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)
      `,
    };
    return intensities[reflectionIntensity] || intensities.subtle;
  };

  // --- Text color based on background ---
  // Calculate perceived luminance from RGB values (0-255 scale)
  const getPerceivedLuminance = (r: number, g: number, b: number): number => {
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  const isDarkBackground = useCustomBackground
    ? (getPerceivedLuminance(startColorR, startColorG, startColorB) + 
       getPerceivedLuminance(endColorR, endColorG, endColorB)) / 2 < 0.5
    : ["darkMode", "midnight", "ocean"].includes(backgroundPreset);
  const textColor = isDarkBackground ? "#ffffff" : "#000000";
  const subtextColor = isDarkBackground ? "#cccccc" : "#4a4a4a";
  const checkColor = isDarkBackground ? "#4ade80" : "#2ecc71";

  // --- Content Appearance Animation ---
  const contentOpacity = spring({
    frame: frame - contentAppearStart,
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(30 * speed),
  });

  // --- Text Shadow ---
  const getTextShadow = () => {
    switch (textShadowIntensity) {
      case "none":
        return "none";
      case "subtle":
        return "0 1px 2px rgba(0, 0, 0, 0.2)";
      case "medium":
        return "0 1px 4px rgba(0, 0, 0, 0.4)";
      case "strong":
        return "0 2px 8px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3)";
      default:
        return "none";
    }
  };

  const getBulletShadow = () => {
    switch (textShadowIntensity) {
      case "none":
        return "none";
      case "subtle":
      case "medium":
        return "0 1px 2px rgba(0, 0, 0, 0.3)";
      case "strong":
        return "0 1px 3px rgba(0, 0, 0, 0.4)";
      default:
        return "none";
    }
  };

  const BulletPoint: React.FC<{ children: React.ReactNode; delay: number }> = ({
    children,
    delay,
  }) => {
    const appear = spring({
      frame: frame - (contentAppearStart + delay),
      fps,
      config: { damping: 200 },
      durationInFrames: Math.round(30 * speed),
    });
    return (
      <div
        style={{
          fontFamily: selectedFont,
          fontSize: 28,
          color: subtextColor,
          fontWeight: 500,
          marginBottom: 18,
          opacity: appear,
          transform: `translateY(${(1 - appear) * 20}px)`,
          textShadow: getBulletShadow(),
        }}
      >
        <span style={{ marginRight: 15, color: checkColor, textShadow: getBulletShadow() }}>✓</span>
        {children}
      </div>
    );
  };

  const resolveAppIconSrc = () => {
    if (!appIconFile || appIconFile === "none") return null;
    const normalized = appIconFile.replace(/^\//, "");
    if (normalized.startsWith("screens/") || normalized.includes("/")) {
      return staticFile(normalized);
    }
    return staticFile(`screens/${normalized}`);
  };

  return (
    <AbsoluteFill
      style={{
        background: getBackground() || undefined,
      }}
    >
      <StudioPresetExport compositionId={id} props={props} />
      {/* Background Audio */}
      {audioFile !== "none" && (
        <Audio
          src={staticFile(`audio/${audioFile}`)}
          volume={audioVolume}
          loop
        />
      )}

      {/* Background Media (image or video) */}
      {renderBackgroundMedia()}
      
      {/* Floating Content / Copy - Rendered BEHIND phone */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            width: layout.contentWidth,
            zIndex: 1,
            ...(isLandscape
              ? {
                  right: width * 0.05,
                  top: "50%",
                  transform: "translateY(-50%)",
                  textAlign: "left" as const,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }
              : {
                  bottom: height * 0.1,
                  left: "50%",
                  transform: "translateX(-50%)",
                  textAlign: "center" as const,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }),
            opacity: contentOpacity * contentExitOpacity,
          }}
        >
          <h1
            style={{
              fontFamily: selectedFont,
              fontSize: headerFontSize,
              color: textColor,
              fontWeight: fontWeight,
              marginBottom: subtitle ? 10 : 20,
              textShadow: getTextShadow(),
            }}
          >
            {headerText}
          </h1>
          {subtitle && (
            <p
              style={{
                fontFamily: selectedFont,
                fontSize: subtitleFontSize,
                color: subtextColor,
                fontWeight: 400,
                marginBottom: isLandscape ? 25 : 15,
                marginTop: 0,
                textShadow: getTextShadow(),
              }}
            >
              {subtitle}
            </p>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: isLandscape ? "flex-start" : "center",
              marginBottom: isLandscape ? 30 : 20,
            }}
          >
            {showAppIcon && appIconFile !== "none" && !appIconError && (
              <Img
                src={resolveAppIconSrc() ?? staticFile("screens/placeholder.png")}
                onError={() => setAppIconError(true)}
                style={{
                  width: appIconSize,
                  height: appIconSize,
                  objectFit: "cover",
                  borderRadius: Math.round(appIconSize * 0.22),
                  backgroundColor: "#ffffff",
                  marginRight: Math.max(12, Math.round(appIconSize * 0.25)),
                }}
              />
            )}
            {showAppIcon && appIconFile !== "none" && appIconError && (
              <Img
                src={staticFile("screens/placeholder.png")}
                style={{
                  width: appIconSize,
                  height: appIconSize,
                  marginRight: Math.max(12, Math.round(appIconSize * 0.25)),
                }}
              />
            )}
            {showAppStoreButton && !appStoreButtonError && (
              <Img
                src={staticFile(appStoreButtonSrc)}
                onError={handleAppStoreButtonError}
                style={{
                  width: isLandscape ? 180 : 140,
                }}
              />
            )}
          </div>
          {/* Hide bullet points on compact layouts */}
          {isLandscape && (
            <div>
              {bulletPoints.map((point, index) => (
                <BulletPoint key={index} delay={index * 20}>
                  {point}
                </BulletPoint>
              ))}
            </div>
          )}
        </div>
      </AbsoluteFill>

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
            transform: `translateX(${phoneX}px) translateY(${phoneY}px) rotate(${phoneRotation}deg) scale(${phoneScale}) rotateY(${phoneRotateY}deg)`,
            opacity: phoneOpacity,
            perspective: 1000,
            filter: `drop-shadow(${getShadow()})`,
          }}
        >
          <PhoneBezel style={bezelStyle} color={bezelColor} scale={0.75}>
            {videoFile === "none" || videoError ? (
              <Img
                src={staticFile("screens/placeholder.png")}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 40,
                }}
              />
            ) : (
              <Video
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 40,
                }}
                src={staticFile(videoFile)}
                loop
                muted
                onError={() => setVideoError(true)}
              />
            )}
            {/* Screen Reflection Overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 40,
                background: getReflectionGradient(),
                pointerEvents: "none",
                zIndex: 10,
              }}
            />
          </PhoneBezel>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
