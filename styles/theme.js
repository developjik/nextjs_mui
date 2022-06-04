import { createTheme } from "@material-ui/core";

const theme = createTheme({
  layout: {
    appHeader: {
      height: 72,
    },
    appNavigation: {
      height: 60,
    },
    appBody: {
      tabNavigationHeight: 60,
      minWidth: 1680,
      sideTabWidth: 120,
      sideTabItemWidth: 120,
    },
    appFullScreenHeader: {
      height: 72,
    },
  },
  typography: {
    heading: "24px",
    subHeading: "",
    body1: "",
    body2: "",
    caption: "",
    fontWeight: {
      thin: 100,
      extraLight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
      heavy: 900,
    },
  },
  colors: {
    white: "#fff",
    black: "#222222",
    primary: "#083a90",
    primaryDarken: "#062f77",
    darkGray: "#ebebeb",
    gray: "#ebecf0",
    lightGray: "#fafbfc",
    disabledGray: "#a4a4a4",
    hoverBlue: "#deebff",
    border: "#c1c6cf",
    error: "#dc2c2e",
  },
});

export default theme;
