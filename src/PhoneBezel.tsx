import React from "react";
import { SlimBezel } from "./SlimBezel";
import { IPhoneBezel } from "./IPhoneBezel";
import { IPadBezel } from "./IPadBezel";

export type BezelColor = "silver" | "gold" | "black" | "natural" | "desert" | "blue";

// Color palettes for different bezel colors
export const bezelColorPalettes: Record<BezelColor, {
  gradient: string;
  border: string;
  button: string;
  glow?: string;
}> = {
  silver: {
    gradient: "linear-gradient(145deg, #e0e0e0 0%, #b0b0b0 100%)",
    border: "#c0c0c0",
    button: "#8f8f8f",
  },
  gold: {
    gradient: "linear-gradient(145deg, #f0e6d2 0%, #c8a464 100%)",
    border: "#d4af37",
    button: "#b8860b",
    glow: "rgba(212, 175, 55, 0.3)",
  },
  black: {
    gradient: "linear-gradient(145deg, #2c2c2c 0%, #1a1a1a 100%)",
    border: "#3a3a3a",
    button: "#4a4a4a",
  },
  natural: {
    gradient: "linear-gradient(145deg, #c4b8a8 0%, #9a8b7a 100%)",
    border: "#a89888",
    button: "#8a7a6a",
  },
  desert: {
    gradient: "linear-gradient(145deg, #e8d4c0 0%, #c4a882 100%)",
    border: "#d4b896",
    button: "#b49876",
  },
  blue: {
    gradient: "linear-gradient(145deg, #4a6fa5 0%, #2d4a6f 100%)",
    border: "#3a5a8a",
    button: "#2a4a7a",
    glow: "rgba(74, 111, 165, 0.3)",
  },
};

interface PhoneBezelProps {
  style: "slim" | "iphone16pro" | "ipad12_9";
  color?: BezelColor;
  scale?: number;
  children: React.ReactNode;
}

export const PhoneBezel: React.FC<PhoneBezelProps> = ({
  style,
  color = "silver",
  scale = 1,
  children,
}) => {
  const colors = bezelColorPalettes[color];

  if (style === "iphone16pro") {
    return <IPhoneBezel scale={scale} colors={colors}>{children}</IPhoneBezel>;
  }
  if (style === "ipad12_9") {
    return <IPadBezel scale={scale} colors={colors}>{children}</IPadBezel>;
  }
  return <SlimBezel scale={scale} colors={colors}>{children}</SlimBezel>;
};
