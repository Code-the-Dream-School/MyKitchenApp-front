import React from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Landing from "./Pages/Landing/Landing";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Landing />
      </div>
    </ThemeProvider>
  );
}

export default App;
