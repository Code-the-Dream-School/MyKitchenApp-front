import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import FooterPublic from "../Footer/FooterPublic";

const LayoutPublic = ({ children, theme }) => {
  const isAuthenticated = localStorage.getItem("myKitchenAppToken");

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} replace />;
  }
  
  return (
    <>
      <Container
        sx={{
          [theme.breakpoints.up("xs")]: {
            padding: 0,
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
