import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutPublic from "./components/Layout/LayoutPublic";
import Landing from "./Pages/Landing/Landing";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";
import LayoutPrivate from "./components/Layout/LayoutPrivate";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Search from "./Pages/Search/Search";
import Favorite from "./Pages/Favorite/Favorite";
import Profile from "./Pages/Profile/Profile";
import History from "./Pages/History/History";
import LogOut from "./Pages/LogOut/LogOut";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <div>
          <Routes>
            <Route path="/" element={<LayoutPublic />}>
              <Route index element={<Landing />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="logout" element={<LogOut />} />
            </Route>
            <Route path="/" element={<LayoutPrivate />}>
              <Route path="profile" element={<Profile />} />
              <Route path="history" element={<History />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="search" element={<Search />} />
              <Route path="favorite" element={<Favorite />} />
            </Route>
          </Routes>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
