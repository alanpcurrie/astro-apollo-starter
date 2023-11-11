import { style, styleVariants } from "@vanilla-extract/css";

export const root = style({
  fontFamily: "Comic Sans Ms",
  color: "blue",
});

export const size = styleVariants({
  small: { fontSize: 16 },
  medium: { fontSize: 24 },
  large: { fontSize: 32 },
});

export const text = style({
  fontFamily: "Comic Sans Ms",
  color: "blue",
});

export const twStyle = style(["text-[hsl(280,100%,70%)]"]);

export const container = style({
  display: "grid",
  gridTemplateColumns: "1fr 3fr 1fr",
  gap: "1rem",
  // background: "papayawhip",
  position: "relative",
  zIndex: -2,
});

export const sideColumn = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const radarColumn = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "60vh",
});

export const hoverStyle = {
  ":hover": {
    fill: "#ff0000",
    r: "15",
  },
};
