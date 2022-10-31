import React from "react";
import SignIn from "./Pages/SignIn/SignIn";
import "./App.css";
import ResponsiveAppBar from "./components/Navbar/ResponsiveAppBar";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <SignIn />
    </div>
  );
}

export default App;
