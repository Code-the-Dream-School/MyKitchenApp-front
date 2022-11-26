import React from "react";

import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

import FooterPublic from "../Footer/FooterPublic";
const LayoutPublic = ({ children, theme }) => {
  return (
    <>
      <Container
        sx={{
          [theme.breakpoints.up("xs")]: {
            padding: 0,
            height: "100vh",
            maxWidth: "100%",
          },
        }}
      >
        <Outlet />
        <main>{children}</main>
      </Container>
      <FooterPublic />
    </>
  );
};
export default LayoutPublic;
