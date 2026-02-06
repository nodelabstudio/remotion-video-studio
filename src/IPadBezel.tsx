import React from "react";

interface BezelColors {
  gradient: string;
  border: string;
  button: string;
  glow?: string;
}

interface IPadBezelProps {
  children: React.ReactNode;
  scale?: number;
  colors?: BezelColors;
}

export const IPadBezel: React.FC<IPadBezelProps> = ({
  children,
  scale = 1,
  colors = {
    gradient: "linear-gradient(145deg, #e0e0e0 0%, #b0b0b0 100%)",
    border: "#c0c0c0",
    button: "#8f8f8f",
  },
}) => {
  const screenWidth = 800;
  const screenHeight = 1066;
  const bezelPadding = 28;
  const borderRadius = 32;
  const frameWidth = screenWidth + bezelPadding * 2;
  const frameHeight = screenHeight + bezelPadding * 2;

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      <div
        style={{
          width: frameWidth,
          height: frameHeight,
          background: colors.gradient,
          borderRadius: borderRadius,
          padding: bezelPadding,
          boxShadow: `
            0 0 0 2px ${colors.border},
            0 0 0 4px ${colors.button}80,
            0 20px 40px -12px rgba(0, 0, 0, 0.35)
            ${colors.glow ? `, 0 0 80px ${colors.glow}` : ""}
          `,
          position: "relative",
        }}
      >
        {/* Camera dot */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 10,
            height: 10,
            backgroundColor: "#111",
            borderRadius: "50%",
            opacity: 0.6,
          }}
        />

        {/* Speaker grille */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 90,
            height: 4,
            backgroundColor: "rgba(0,0,0,0.25)",
            borderRadius: 2,
          }}
        />

        {/* Side button */}
        <div
          style={{
            position: "absolute",
            right: -4,
            top: 220,
            width: 4,
            height: 60,
            backgroundColor: colors.button,
            borderRadius: "0 2px 2px 0",
          }}
        />

        <div
          style={{
            width: screenWidth,
            height: screenHeight,
            borderRadius: borderRadius - bezelPadding,
            overflow: "hidden",
            backgroundColor: "#000",
            position: "relative",
          }}
        >
          {/* Inner edge */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.08)",
              borderRadius: borderRadius - bezelPadding,
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
          <div style={{ width: "100%", height: "100%" }}>{children}</div>
        </div>
      </div>
    </div>
  );
};
