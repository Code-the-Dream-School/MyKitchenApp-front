import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import FooterPrivate from "../Footer/FooterPrivate";
import NavBar from "../Navbar/NavBar";

const LayoutPrivate = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("myKitchenAppToken");

  if (!isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div id="root">
      <NavBar />
      <Container>
        <Outlet />
        <main>{children}</main>
      </Container>
      <FooterPrivate />
    </div>
  );
};

export default LayoutPrivate;
