import {
  createGlobalTheme,
  createTheme,
  globalStyle,
  style,
} from "@vanilla-extract/css";

globalStyle("body", {
  fontFamily: "Satoshi, Arial, sans-serif",
  lineHeight: 1.5,
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
});

export const lightThemeVars = createGlobalTheme(":root", {
  color: {
    background: "#FFFFFF",
    text: "#1F1F1F",
    primary: "#0056D2",
    secondary: "#707070",
    border: "#E0E0E0",
  },
});

export const darkThemeVars = createGlobalTheme(":root", {
  color: {
    background: "#121212",
    text: "#EAEAEA",
    primary: "#4F8EF7",
    secondary: "#A0A0A0",
    border: "#333333",
  },
});

export const baseStyle = style({
  // Common base styles
});

export const [lightTheme, lightThemeSelectorVars] = createTheme({
  color: {
    background: "#f0e68c",
    text: "#333",
  },
});

export const [darkTheme, darkThemeelectorVars] = createTheme({
  color: {
    background: "#556b2f",
    text: "#fff",
  },
});

export const lightThemeStyle = style({
  backgroundColor: lightThemeVars.color.background,
  color: lightThemeVars.color.text,
  selectors: {
    [`${lightTheme} &`]: {
      backgroundColor: lightThemeVars.color.background,
      color: lightThemeVars.color.text,
    },
  },
});

export const darkThemeStyle = style({
  backgroundColor: darkThemeVars.color.background,
  color: darkThemeVars.color.text,
  selectors: {
    [`${darkTheme} &`]: {
      backgroundColor: darkThemeVars.color.background,
      color: darkThemeVars.color.text,
    },
  },
});

export const sunStyle = style({
  fill: "black",
});

export const moonStyle = style({
  fill: "white",
});

globalStyle(".dark .sun", {
  fill: "transparent",
});

globalStyle(".dark .moon", {
  fill: "white",
});
