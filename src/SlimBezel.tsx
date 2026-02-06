import React from "react";

interface BezelColors {
  gradient: string;
  border: string;
  button: string;
  glow?: string;
}

interface SlimBezelProps {
  children: React.ReactNode;
  scale?: number;
  colors?: BezelColors;
}

export const SlimBezel: React.FC<SlimBezelProps> = ({
  children,
  scale = 1,
  colors = {
    gradient: "linear-gradient(145deg, #e0e0e0 0%, #b0b0b0 100%)",
    border: "#c0c0c0",
    button: "#8f8f8f",
  },
}) => {
  // Slim, modern dimensions
  const screenWidth = 400;
  const screenHeight = 865;
  const bezelPadding = 8;
  const borderRadius = 60;
  const frameWidth = screenWidth + bezelPadding * 2;
  const frameHeight = screenHeight + bezelPadding * 2;

  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: colors.button,
    boxShadow: '0px 0px 2px rgba(0,0,0,0.4)',
  };

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      {/* Phone Frame */}
      <div
        style={{
          width: frameWidth,
          height: frameHeight,
          background: colors.gradient,
          borderRadius: borderRadius,
          padding: bezelPadding,
          boxShadow: `
            0 0 0 1px ${colors.border},
            0 0 0 3px ${colors.border}80,
            0 15px 30px -10px rgba(0, 0, 0, 0.3)
            ${colors.glow ? `, 0 0 60px ${colors.glow}` : ''}
          `,
          position: "relative",
        }}
      >
        {/* --- Side Buttons --- */}
        {/* Left: Silent Switch */}
        <div style={{ ...buttonStyle, left: -4, top: 120, width: 4, height: 25, borderRadius: '2px 0 0 2px' }} />
        {/* Left: Volume Up */}
        <div style={{ ...buttonStyle, left: -4, top: 170, width: 4, height: 50, borderRadius: '2px 0 0 2px' }} />
        {/* Left: Volume Down */}
        <div style={{ ...buttonStyle, left: -4, top: 230, width: 4, height: 50, borderRadius: '2px 0 0 2px' }} />
        
        {/* Right: Power Button */}
        <div style={{ ...buttonStyle, right: -4, top: 180, width: 4, height: 70, borderRadius: '0 2px 2px 0' }} />

        {/* Screen Container with perfect fit */}
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
          {/* Video/Content Container */}
          <div style={{ width: "100%", height: "100%" }}>{children}</div>

          {/* Dynamic Island (uniform) */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 28,
              backgroundColor: "#000",
              borderRadius: 20,
              zIndex: 10,
            }}
          />
        </div>
      </div>
    </div>
  );
};
