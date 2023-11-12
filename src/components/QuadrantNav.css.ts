import { margin } from "./Radar.css";
// QuadrantNav.css.ts
import { style } from "@vanilla-extract/css";

export const radarWrapper = style({
  position: "absolute",
  width: "100vw",
  height: "100vh",
  maxWidth: "1200px",
  maxHeight: "1200px",
  margin: "auto",
  zIndex: -1,
});

export const quadrantsOverlay = style({
  position: "relative",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

export const quadrant = style({
  width: "25%",
  height: "25%",
  position: "relative",
  cursor: "pointer",
  transition: "background-color 0.3s",
  padding: "1rem",
  background: "#EEF5FC",
  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export const chevron = style({
  display: "inline-block",
  width: "10px",
  height: "10px",
  borderTop: "2px solid currentColor",
  borderRight: "2px solid currentColor",
  transform: "rotate(45deg)",
  margin: "0 0 3px 5px",
});

export const topLeft = style({
  top: 0,
  left: 0,
  ":hover": {
    backgroundColor: "#E87D7D",
  },
});

export const topRight = style({
  top: 0,
  right: 0,
  ":hover": {
    backgroundColor: "#B37DE8",
  },
});

export const bottomLeft = style({
  bottom: 0,
  left: 0,
  ":hover": {
    backgroundColor: "#7DE8E8",
  },
});

export const bottomRight = style({
  bottom: 0,
  right: 0,
  ":hover": {
    backgroundColor: "#B3E87D",
  },
});

export const headingOne = style({
  fontSize: "2rem",
});

export const radStyle = style({
  background:
    "linear-gradient(to right, hsl(280, 100%, 70%), hsl(240, 100%, 70%), hsl(200, 100%, 70%))",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline",
});
