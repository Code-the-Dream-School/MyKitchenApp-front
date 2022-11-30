import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import FooterPrivate from "../Footer/FooterPrivate";
import NavBar from "../Navbar/NavBar";

const LayoutPrivate = ({ children, isAuthenticated, currentUser }) => {
  if (!isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <>
      <NavBar currentUser={currentUser} />
      <Container
        sx={{
          marginBottom: "200px",
        }}
      >
        <Outlet />
        <main>{children}</main>
      </Container>
      <FooterPrivate />
    </>
  );
};

export default LayoutPrivate;
