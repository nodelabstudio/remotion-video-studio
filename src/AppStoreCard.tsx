import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useVideoConfig,
  CalculateMetadataFunction,
} from "remotion";
import { PhoneBezel } from "./PhoneBezel";
import { AppStoreCardProps } from "./appStoreCardSchema";
import { APP_STORE_SIZE_MAP } from "./appStoreSizes";
import { usePersistedProps } from "./persistedProps";
import { StudioPresetExport } from "./StudioPresetExport";
import { APP_STORE_CARD_PRESETS } from "./presetsIndex";
import { usePresetApplier } from "./usePresetApplier";

const getFontFamily = (fontFamily: AppStoreCardProps["fontFamily"]) => {
  switch (fontFamily) {
    case "Inter":
      return "Inter, sans-serif";
    case "Roboto":
      return "Roboto, sans-serif";
    case "Lato":
      return "Lato, sans-serif";
    case "Oswald":
      return "Oswald, sans-serif";
    case "Playfair Display":
      return "'Playfair Display', serif";
    case "Montserrat":
      return "Montserrat, sans-serif";
    case "Open Sans":
      return "'Open Sans', sans-serif";
    case "Poppins":
      return "Poppins, sans-serif";
    case "Merriweather":
      return "Merriweather, serif";
    case "Nunito":
      return "Nunito, sans-serif";
    case "Raleway":
      return "Raleway, sans-serif";
    case "Ubuntu":
      return "Ubuntu, sans-serif";
    case "PT Sans":
      return "'PT Sans', sans-serif";
    case "Rubik":
      return "Rubik, sans-serif";
    case "Lora":
      return "Lora, serif";
    case "Work Sans":
      return "'Work Sans', sans-serif";
    default:
      return "Roboto, sans-serif";
  }
};

const getBezelFrameSize = (style: AppStoreCardProps["bezelStyle"]) => {
  if (style === "iphone16pro") {
    return { width: 417, height: 876 };
  }
  if (style === "ipad12_9") {
    return { width: 848, height: 1114 };
  }
  return { width: 416, height: 881 };
};

const estimateLineCount = (
  text: string,
  fontSize: number,
  maxWidth: number
) => {
  const trimmed = text.trim();
  if (!trimmed) return 1;
  const explicitLines = trimmed.split("\n");
  let lines = 0;

  const avgCharWidth = fontSize * 0.56;

  explicitLines.forEach((line) => {
    const normalizedLine = line.replace(/\s+/g, " ").trim();
    if (!normalizedLine) {
      lines += 1;
      return;
    }
    const words = normalizedLine.split(" ");
    let currentWidth = 0;
    let lineCount = 1;
    words.forEach((word) => {
      const wordWidth = word.length * avgCharWidth + avgCharWidth;
      if (currentWidth + wordWidth > maxWidth) {
        lineCount += 1;
        currentWidth = wordWidth;
      } else {
        currentWidth += wordWidth;
      }
    });
    lines += lineCount;
  });

  return Math.max(1, lines);
};

const getTextShadow = (intensity: AppStoreCardProps["textShadowIntensity"]) => {
  switch (intensity) {
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

const getPerceivedLuminance = (r: number, g: number, b: number): number => {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

const getBackgroundGradient = (props: AppStoreCardProps): string => {
  const {
    backgroundPreset,
    useCustomBackground,
    startColorR,
    startColorG,
    startColorB,
    endColorR,
    endColorG,
    endColorB,
    customGradientAngle,
  } = props;

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

const getTextColor = (props: AppStoreCardProps): string => {
  const { textColor, useCustomBackground, backgroundPreset, backgroundType, backgroundFile } = props;

  if (textColor === "light") return "#ffffff";
  if (textColor === "dark") return "#111111";
  if (backgroundType === "image" && backgroundFile !== "none") return "#ffffff";

  const isDarkBackground = useCustomBackground
    ? (getPerceivedLuminance(props.startColorR, props.startColorG, props.startColorB) +
        getPerceivedLuminance(props.endColorR, props.endColorG, props.endColorB)) /
        2 <
      0.5
    : ["darkMode", "midnight", "ocean"].includes(backgroundPreset);

  return isDarkBackground ? "#ffffff" : "#111111";
};

export const calculateAppStoreCardMetadata: CalculateMetadataFunction<
  AppStoreCardProps
> = ({ props }) => {
  const { width, height } = APP_STORE_SIZE_MAP[props.screenshotSize];
  return {
    width,
    height,
    durationInFrames: 1,
    fps: 30,
  };
};

export const AppStoreCard: React.FC<AppStoreCardProps> = (props) => {
  usePersistedProps("remotion:AppStoreCard", props);
  const {
    screenFile,
    screenshotSize,
    headlineText,
    headlineFontSize,
    fontWeight,
    fontFamily,
    textShadowIntensity,
    headerOffsetY,
    phoneOffsetY,
    bezelStyle,
    bezelColor,
    phoneScale,
    backgroundType,
    backgroundFile,
  } = props;

  const { width, height, id } = useVideoConfig();
  usePresetApplier(id, props.presetName, APP_STORE_CARD_PRESETS);
  const resolvedScreenFile = screenFile || "screens/placeholder.png";
  const selectedFont = getFontFamily(fontFamily);
  const textColor = getTextColor(props);
  const useGradientBackground =
    backgroundType === "gradient" || backgroundFile === "none";
  const isIpad = screenshotSize.toLowerCase().includes("ipad");

  const frame = getBezelFrameSize(bezelStyle);

  const headerMaxWidth = width * (isIpad ? 0.72 : 0.84);
  const estimatedLines = estimateLineCount(
    headlineText,
    headlineFontSize,
    headerMaxWidth
  );
  const headerTextHeight = Math.round(estimatedLines * headlineFontSize * 1.12);
  const headerTop = Math.max(0, height * (isIpad ? 0.06 : 0.05) + headerOffsetY);
  const headerBottom = headerTop + headerTextHeight;
  const headerBottomGap = Math.round(height * (isIpad ? 0.05 : 0.04));

  const reservedTop = headerBottom + headerBottomGap;
  const phoneAreaHeight = Math.max(0, height - reservedTop);
  const maxPhoneWidth = width * (isIpad ? 0.82 : 0.86);
  const maxPhoneHeight = phoneAreaHeight * (isIpad ? 0.9 : 0.95);
  const baseScale = Math.min(
    maxPhoneWidth / frame.width,
    maxPhoneHeight / frame.height
  );
  const scale = Math.min(baseScale * phoneScale, baseScale);

  const scaledPhoneHeight = frame.height * scale;
  const bottomPadding = Math.round(height * (isIpad ? 0.08 : 0.06));
  const bottomAnchoredTop =
    height - scaledPhoneHeight - bottomPadding + phoneOffsetY;
  const phoneTop = Math.max(reservedTop, bottomAnchoredTop);

  return (
    <AbsoluteFill
      style={{
        background: useGradientBackground ? getBackgroundGradient(props) : undefined,
      }}
    >
      <StudioPresetExport compositionId={id} props={props} />
      {backgroundType === "image" && backgroundFile !== "none" && (
        <Img
          src={staticFile(`backgrounds/${backgroundFile}`)}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          top: headerTop,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          paddingLeft: width * 0.08,
          paddingRight: width * 0.08,
          zIndex: 2,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: selectedFont,
            fontSize: headlineFontSize,
            fontWeight: fontWeight,
            color: textColor,
            lineHeight: 1.1,
            textShadow: getTextShadow(textShadowIntensity),
            maxWidth: headerMaxWidth,
          }}
        >
          {headlineText}
        </h1>
      </div>

      <div
        style={{
          position: "absolute",
          top: phoneTop,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      >
        <PhoneBezel style={bezelStyle} color={bezelColor} scale={scale}>
          <Img
            src={staticFile(resolvedScreenFile)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </PhoneBezel>
      </div>
    </AbsoluteFill>
  );
};
