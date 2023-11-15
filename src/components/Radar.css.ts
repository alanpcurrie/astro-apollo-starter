import {
  style,
  styleVariants,
  createGlobalTheme,
  globalStyle,
  createTheme,
} from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

export const [darkTheme, darkThemeVars] = createTheme({
  color: {
    background: "#000",
    text: "#fff",
  },
});

export const buttonRecipe = recipe({
  base: {
    /* Base styles */
  },
  variants: {
    size: {
      small: {
        /* Small size styles */
      },
      large: {
        /* Large size styles */
      },
    },
    color: {
      primary: {
        /* Primary color styles */
      },
      secondary: {
        /* Secondary color styles */
      },
    },
  },
  // Define more variants and compound variants
});

const layoutProperties = defineProperties({
  properties: {
    display: ["none", "block", "flex", "grid"],
    flexDirection: ["row", "column"],
  },
});

export const layoutSprinkles = createSprinkles(layoutProperties);

export const colors = createGlobalTheme(":root", {
  primary: "#005f73",
  secondary: "#0a9396",
  accent: "#94d2bd",
  background: "#e9d8a6",
  text: "#3d405b",
});

export const typography = createGlobalTheme(":root", {
  fontSizes: {
    small: "0.8rem",
    medium: "1rem",
    large: "1.2rem",
  },
  fontWeights: {
    regular: "400",
    medium: "500",
    bold: "700",
  },
  fontFamily: "Arial, sans-serif",
});

export const spacing = createGlobalTheme(":root", {
  small: "8px",
  medium: "16px",
  large: "24px",
});

export const margin = {
  small: style({ margin: spacing.small }),
  medium: style({ margin: spacing.medium }),
};

export const size = styleVariants({
  small: { fontSize: 16 },
  medium: { fontSize: 24 },
  large: { fontSize: 32 },
});

export const root = style({
  fontFamily: "Comic Sans Ms",
  color: "blue",
});

globalStyle("body", {
  fontFamily: typography.fontFamily,
  color: colors.text,
  backgroundColor: colors.background,
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

export const responsiveStyle = style({
  "@media": {
    "screen and (min-width: 768px)": {
      padding: "24px",
    },
    "screen and (min-width: 1024px)": {
      padding: "48px",
    },
  },
});

export const position = style({
  position: "relative",
});

export const btn = style({
  margin: 0,
  textAlign: "center",
  border: "none",
  background: "#2f2f2f",
  color: "#888",
  padding: "0 4px",
  borderTop: "1px solid #0a0a0a",
});

export const btnLg = style({
  fontSize: "12px",
  lineHeight: 1,
  padding: "4px",
});

export const btnZoom = style({
  width: "26px",
  fontSize: "22px",
});

export const btnBottom = style({
  marginBottom: "1rem",
});

export const description = style({
  fontSize: "12px",
  marginRight: "0.25rem",
});

export const controls = style({
  position: "absolute",
  top: "15px",
  right: "15px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
});

export const miniMap = style({
  position: "absolute",
  bottom: "25px",
  right: "15px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
});

export const relative = style({
  position: "relative",
});

export const z = style({
  position: "relative",
  zIndex: 1000,
});
