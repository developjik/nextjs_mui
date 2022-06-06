import "../styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@material-ui/core";
import theme from "styles/theme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default MyApp;
