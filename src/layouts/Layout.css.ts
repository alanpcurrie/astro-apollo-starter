import { createContainer, style, styleVariants } from "@vanilla-extract/css";

export const root = style({
  fontFamily: "Comic Sans Ms",
  color: "blue",
});

export const breakPoints = {
  mobile: "only screen and (max-width: 600px)",
  tablet: "only screen and (min-width: 601px) and (max-width: 900px)",
  desktop: "only screen and (min-width: 901px) and (max-width: 1200px)",
  desktopXl: "only screen and (min-width: 1200px)",
};

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
  gap: "1rem",
  background: "#0E1218",
  "@media": {
    [breakPoints.mobile]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto 3fr",
    },
    [breakPoints.tablet]: {
      gridTemplateColumns: "1fr 3fr",
    },
    [breakPoints.desktop]: {
      gridTemplateColumns: "200px 1fr",
    },
    [breakPoints.desktopXl]: {
      gridTemplateColumns: "200px 1fr",
    },
  },
});

export const sideColumn = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  "@media": {
    [breakPoints.mobile]: {
      order: -1,
    },
  },
});
export const radarColumn = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  position: "relative",
  marginLeft: "4rem",
  zIndex: 0,
});

export const sidebarContainer = createContainer();

export const sidebar = style({
  containerName: sidebarContainer,
});
