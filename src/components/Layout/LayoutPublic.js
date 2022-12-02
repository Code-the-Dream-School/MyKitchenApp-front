import React from "react";

import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

import FooterPublic from "../Footer/FooterPublic";
const LayoutPublic = ({ children, theme }) => {
  return (
    <>
      <Container
        sx={{
          marginBottom: "200px",
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
