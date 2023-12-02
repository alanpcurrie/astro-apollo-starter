import { style } from "@vanilla-extract/css";

export const breakPoints = {
  mobile: "only screen and (max-width: 600px)",
  tablet: "only screen and (min-width: 601px) and (max-width: 900px)",
  desktop: "only screen and (min-width: 901px)",
};

export const radarWrapper = style({
  width: "280px",
  height: "100vh",
  maxWidth: "1200px",
  minHeight: "100vh",
  margin: "auto",
  background: "black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "1rem",
  "@media": {
    [breakPoints.mobile]: {
      flexDirection: "row", // Change to row on mobile
      minHeight: "250px",
      height: "250px",
      width: "100%",
    },
  },
});

export const quadrantsOverlay = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  "@media": {
    [breakPoints.mobile]: {
      flexDirection: "row", // Change to row on mobile
      height: "150px",
      // width: "100%",
    },
  },
});

export const firstQuadrant = style({
  justifyContent: "flex-start",
  flex: "1",
});

export const quadrant = style({
  "@media": {
    [breakPoints.mobile]: {
      flex: "1", // Each quadrant takes equal space on mobile
      height: "150px",
      // width: "100%",
    },
  },
  ":first-child": firstQuadrant,
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  transition: "background-color 0.3s",
  padding: "1rem",
  background: "black",
  color: "rgba(175, 238, 238, 1)",
  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "black",
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
  padding: "1rem",
});

export const radStyle = style({
  background:
    "linear-gradient(to right, hsl(280, 100%, 70%), hsl(240, 100%, 70%), hsl(200, 100%, 70%))",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline",
});
