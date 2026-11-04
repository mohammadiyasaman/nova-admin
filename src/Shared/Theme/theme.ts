import type { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  mode: "light",
  colors: {
    primary: "#142B4A",
    secondary: "#25476E",
    accent: "#F58220",
    background: "#F3F5F8",
    surface: "#FFFFFF",
    text: "#202B3C",
    textSecondary: "#778196",
    border: "#E5E9F0",
    success: "#2E7D32",
    danger: "#D32F2F",
    warning: "#ED9B24",
  },
};

export const darkTheme: DefaultTheme = {
  mode: "dark",
  colors: {
    primary: "#8EADD1",
    secondary: "#25476E",
    accent: "#F58220",
    background: "#101B2B",
    surface: "#19283B",
    text: "#F1F5F9",
    textSecondary: "#A7B3C5",
    border: "#304157",
    success: "#66BB6A",
    danger: "#EF5350",
    warning: "#FFB74D",
  },
};
