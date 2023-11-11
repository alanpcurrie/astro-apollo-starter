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
  width: "50%",
  height: "50%",
  position: "relative",
  cursor: "pointer",
  transition: "background-color 0.3s",
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
});

export const topRight = style({
  top: 0,
  right: 0,
});

export const bottomLeft = style({
  bottom: 0,
  left: 0,
});

export const bottomRight = style({
  bottom: 0,
  right: 0,
});
