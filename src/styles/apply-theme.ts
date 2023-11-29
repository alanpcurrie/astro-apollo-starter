import { match } from "ts-pattern";
import { lightThemeStyle, darkThemeStyle } from "./theme.css";

type ThemeOptions = "light" | "dark";

export const applyTheme = (theme: ThemeOptions = "light") => {
  return match(theme)
    .with("light", () => lightThemeStyle)
    .with("dark", () => darkThemeStyle)
    .exhaustive();
};
