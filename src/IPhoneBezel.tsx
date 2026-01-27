import React from "react";

interface IPhoneBezelProps {
  children: React.ReactNode;
  scale?: number;
}

export const IPhoneBezel: React.FC<IPhoneBezelProps> = ({
  children,
  scale = 1,
}) => {
  // iPhone 16 Pro dimensions (approximate ratios for bezel)
  const screenWidth = 393;
  const screenHeight = 852;
  const bezelPadding = 12;
  const borderRadius = 55;
  const frameWidth = screenWidth + bezelPadding * 2;
  const frameHeight = screenHeight + bezelPadding * 2;

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
          background: "linear-gradient(145deg, #f0e6d2 0%, #c8a464 100%)", // Gold gradient
          borderRadius: borderRadius,
          padding: bezelPadding,
          boxShadow: `
            0 0 0 2px #d4af37, 
            0 0 0 4px #b8860b,
            0 25px 50px -12px rgba(0, 0, 0, 0.4),
            0 0 80px rgba(212, 175, 55, 0.3)
          `,
          position: "relative",
        }}
      >
        {/* Side Buttons - Left (Silent Switch + Volume) */}
        <div
          style={{
            position: "absolute",
            left: -4,
            top: 120,
            width: 4,
            height: 28,
            backgroundColor: "#b8860b", // Darker gold
            borderRadius: "2px 0 0 2px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -4,
            top: 180,
            width: 4,
            height: 55,
            backgroundColor: "#b8860b",
            borderRadius: "2px 0 0 2px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -4,
            top: 245,
            width: 4,
            height: 55,
            backgroundColor: "#b8860b",
            borderRadius: "2px 0 0 2px",
          }}
        />

        {/* Side Button - Right (Power) */}
        <div
          style={{
            position: "absolute",
            right: -4,
            top: 200,
            width: 4,
            height: 80,
            backgroundColor: "#b8860b",
            borderRadius: "0 2px 2px 0",
          }}
        />

        {/* Screen Container */}
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
          {/* Dynamic Island */}
          <div
            style={{
              position: "absolute",
              top: 11,
              left: "50%",
              transform: "translateX(-50%)",
              width: 126,
              height: 37,
              backgroundColor: "#000",
              borderRadius: 20,
              zIndex: 10,
            }}
          />

          {/* Video/Content Container */}
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            {children}
          </div>

          {/* Home Indicator */}
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: "50%",
              transform: "translateX(-50%)",
              width: 134,
              height: 5,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: 3,
              zIndex: 10,
            }}
          />
        </div>
      </div>
    </div>
  );
};
