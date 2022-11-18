import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

import FooterPublic from "../Footer/FooterPublic";
const LayoutPublic = ({ children, isAuthenticated}) => {
  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} replace />;
  }
  return (
    <>
      <Container>
        <Outlet />
        <main>{children}</main>
      </Container>
      <FooterPublic />
    </>
  );
};
export default LayoutPublic;
