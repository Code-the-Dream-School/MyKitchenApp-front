import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import LayoutPrivate from "./components/Layout/LayoutPrivate";
import Dashboard from "./Pages/Dashboard/Dashboard";
import SearchResult from "./Pages/Search/SearchResult";
import Favorite from "./Pages/Favorite/Favorite";
import Profile from "./Pages/Profile/Profile";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Filter from "./components/Filter/Filter";

const theme = createTheme();

function App() {
  const isAuthenticated = localStorage.getItem("myKitchenAppToken");
  const currentUser = JSON.parse(localStorage.getItem("myKitchenAppUser"))
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route index element={<Landing />} />
          <Route element={<LayoutPrivate isAuthenticated={isAuthenticated} currentUser={currentUser}/>}>
            <Route path="profile" element={<Profile />} />
            <Route path="dashboard" element={<Dashboard currentUser={currentUser}/>} />
            <Route path="searchresult/:search/:type" element={<Filter />} />
            <Route path="searchresult/:search" element={<SearchResult />} />
            <Route path="favorite" element={<Favorite />} />
          </Route>
          </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
