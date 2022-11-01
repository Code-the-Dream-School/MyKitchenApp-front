import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../Navbar/ResponsiveAppBar";
import Container from "@mui/material/Container";
import FooterPrivate from "../Footer/FooterPrivate";

const LayoutPrivate = ({ children }) => {
  return (
    <>
      <ResponsiveAppBar />
      <Container>
        <Outlet />
        <main>{children}</main>
      </Container>
      <FooterPrivate />
    </>
  );
};

export default LayoutPrivate;
