import React from "react";
import { AbsoluteFill, Img, staticFile, useVideoConfig } from "remotion";
import { PhoneBezel } from "./PhoneBezel";
import { ThreePhonesProps } from "./threePhonesSchema";
import { usePersistedProps } from "./persistedProps";
import { StudioPresetExport } from "./StudioPresetExport";
import { THREE_PHONES_PRESETS } from "./presetsIndex";
import { usePresetApplier } from "./usePresetApplier";

export const ThreePhones: React.FC<ThreePhonesProps> = (props) => {
  usePersistedProps("remotion:ThreePhones", props);

  const {
    screen1,
  screen2,
  screen3,
  spacing,
  scale,
  centerScale,
  sideScale,
  angle,
  backgroundPreset,
  bezelColor,
  layoutMode,
  } = props;
  const { width, height, id } = useVideoConfig();
  usePresetApplier(id, props.presetName, THREE_PHONES_PRESETS);
  const isFlat = layoutMode === "flat";

  const getBackground = () => {
    switch (backgroundPreset) {
      case "lightGray": return "linear-gradient(135deg, #f5f7fa 0%, #e8ebf0 100%)";
      case "darkMode": return "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)";
      case "sunset": return "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)";
      case "ocean": return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      case "purple": return "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)";
      case "midnight": return "linear-gradient(135deg, #232526 0%, #414345 100%)";
      default: return "white";
    }
  };

  return (
    <AbsoluteFill
      style={{
        background: getBackground(),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: 2000, // 3D perspective container
        overflow: "visible",
      }}
    >
      <StudioPresetExport compositionId={id} props={props} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scale})`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Left Phone */}
        <div
          style={{
            transform: `translateX(-${spacing}px) ${
              isFlat ? "" : `rotateY(${angle}deg) translateZ(-50px)`
            } scale(${sideScale})`,
            zIndex: 1,
            transition: "all 0.3s ease",
          }}
        >
          <PhoneBezel style="iphone16pro" color={bezelColor} scale={1}>
             <Img
               src={staticFile(screen1 || "screens/app_logo_small.png")} // Fallback
               style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 40 }}
             />
          </PhoneBezel>
        </div>

        {/* Center Phone (Forward) */}
        <div
          style={{
            zIndex: 10,
            transform: `${
              isFlat ? "" : "translateZ(50px)"
            } scale(${centerScale})`,
          }}
        >
          <PhoneBezel style="iphone16pro" color={bezelColor} scale={1}>
             <Img
               src={staticFile(screen2 || "screens/app_logo_small.png")}
               style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 40 }}
             />
          </PhoneBezel>
        </div>

        {/* Right Phone */}
        <div
          style={{
             transform: `translateX(${spacing}px) ${
              isFlat ? "" : `rotateY(-${angle}deg) translateZ(-50px)`
            } scale(${sideScale})`,
            zIndex: 1,
          }}
        >
          <PhoneBezel style="iphone16pro" color={bezelColor} scale={1}>
             <Img
               src={staticFile(screen3 || "screens/app_logo_small.png")}
               style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 40 }}
             />
          </PhoneBezel>
        </div>
      </div>
    </AbsoluteFill>
  );
};
