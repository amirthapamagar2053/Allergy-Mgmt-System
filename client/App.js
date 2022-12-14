import React from "react";
import Router from "./components/Router";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  primary: { main: "#2ecc71" },
  secondary: { main: "#102b7b" },
  text: {
    main: [
      "MarkOT",
      "-apple-system",
      "BlinkMacSystemFont",
      "avenir next",
      "avenir",
      "helvetica neue",
      "helvetica",
      "Ubuntu",
      "roboto",
      "noto",
      "segoe ui",
      "arial",
      "sans-serif",
    ],
  },
});

const App = () => (
  <>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </>
);

export default App;

// #2ecc71
