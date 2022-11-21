import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LayoutPublic from "./components/Layout/LayoutPublic";
import Landing from "./Pages/Landing/Landing";
import LayoutPrivate from "./components/Layout/LayoutPrivate";
import Dashboard from "./Pages/Dashboard/Dashboard";
import SearchResult from "./Pages/Search/SearchResult";
import Favorite from "./Pages/Favorite/Favorite";
import Profile from "./Pages/Profile/Profile";
import History from "./Pages/History/History";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Filter from "./components/Filter/Filter";

const theme = createTheme();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("myKitchenAppToken")
  );
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />        
        <Routes>
          <Route path="/" element={<LayoutPublic />}>
            <Route index element={<Landing />} />
          </Route>
          <Route element={<LayoutPrivate isAuthenticated={isAuthenticated} />}>
            <Route path="profile" element={<Profile />} />
            <Route path="history" element={<History />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="searchresult/:search/:intolerances/:type" element={<Filter />} />
            <Route path="searchresult/:search/:intolerances" element={<SearchResult />} />
            <Route path="searchresult/:search" element={<SearchResult />} />
            <Route path="favorite" element={<Favorite />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
