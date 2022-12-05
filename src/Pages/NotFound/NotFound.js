import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h3">UH OH!</Typography>
      <Typography variant="h3">Page not found!</Typography>
      <img
        src="https://img.freepik.com/premium-photo/crying-cute-baby-tucked-inside-pot-with-chef-s-hat-cooking-utensils-yellow-background_181624-59803.jpg?w=2000"
        alt="crying baby chef"
        style={{ width: "480px", margin: "12px 0" }}
      />
      <Link to={"/dashboard"}>Back to dashboard</Link>
    </Box>
  );
}
