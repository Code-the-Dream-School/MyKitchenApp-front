import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutPublic from "./components/Layout/LayoutPublic";
import LayoutPrivate from "./components/Layout/LayoutPrivate";
import Filter from "./components/Filter/Filter";
import Landing from "./Pages/Landing/Landing";
import Dashboard from "./Pages/Dashboard/Dashboard";
import SearchResult from "./Pages/Search/SearchResult";
import Favorite from "./Pages/Favorite/Favorite";
import Profile from "./Pages/Profile/Profile";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme();

function App() {
  const removeLocalStorageData = (hours) => {
    const currentTime = new Date().getTime();
    const lastLoginTime = Number(localStorage.getItem("lastLoginTime"));

    if (lastLoginTime === null) {
      localStorage.setItem("lastLoginTime", currentTime);
    } else {
      if (currentTime - lastLoginTime > hours * 60 * 60 * 1000) {
        localStorage.removeItem("myKitchenAppUser");
        localStorage.removeItem("myKitchenAppToken");
        localStorage.setItem("lastLoginTime", currentTime);
      }
    }
  };

  removeLocalStorageData(24);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LayoutPublic />}>
            <Route index element={<Landing />} />
          </Route>
          <Route element={<LayoutPrivate />}>
            <Route path="profile" element={<Profile />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route
              path="searchresult/:search/:intolerances/:type"
              element={<Filter />}
            />
            <Route
              path="searchresult/:search/:intolerances"
              element={<SearchResult />}
            />
            <Route
              path="searchresult/:search/:intolerances/:type"
              element={<Filter />}
            />
            <Route
              path="searchresult/:search/:intolerances"
              element={<SearchResult />}
            />
            <Route path="searchresult/:search" element={<SearchResult />} />
            <Route path="favorite" element={<Favorite />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
