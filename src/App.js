import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import LayoutPrivate from "./components/Layout/LayoutPrivate";
import Dashboard from "./Pages/Dashboard/Dashboard";
import SearchResult from "./Pages/Search/SearchResult";
import Favorite from "./Pages/Favorite/Favorite";
import Profile from "./Pages/Profile/Profile";
import History from "./Pages/History/History";
import Recipe from "./Pages/Recipe/Recipe";
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
          <Route index element={<Landing />} />
          <Route element={<LayoutPrivate isAuthenticated={isAuthenticated} />}>
            <Route path="profile" element={<Profile />} />
            <Route path="history" element={<History />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="searchresult/:search/:type" element={<Filter />} />
            <Route path="searchresult/:search" element={<SearchResult />} />
            <Route path="favorite" element={<Favorite />} />
            <Route path="recipe/:id" element={<Recipe />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
