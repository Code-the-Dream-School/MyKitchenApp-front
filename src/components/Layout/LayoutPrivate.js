import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import Container from "@mui/material/Container";
import FooterPrivate from "../Footer/FooterPrivate";

const LayoutPrivate = ({ children, isAuthenticated, currentUser }) => {
  if (!isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <>
      <NavBar currentUser={currentUser}/>
      <Container>
        <Outlet />
        <main>{children}</main>
      </Container>
      <FooterPrivate />
    </>
  );
};

export default LayoutPrivate;
