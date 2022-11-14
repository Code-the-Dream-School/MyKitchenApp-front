import React, { useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";

export default function Landing() {
  const [toggle, setToggle] = useState(true);
  return (
    <Grid container component="main">
      <Grid item xs={12} sm={8} md={5} component={Paper} square elevation={0}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src="/MyKitchenLogoNoName.jpeg" alt="My Kitchen" />
          <Typography component="h1" variant="h4" sx={{ marginTop: "60px" }}>
            My Kitchen
          </Typography>
          <Typography
            component="h6"
            variant="h6"
            align="center"
            sx={{ padding: "24px" }}
          >
            Do you know what meal your going to prepare today? Just tell us what
            you have, and we will tell you what to prepare. Enjoy!
          </Typography>
        </Box>
      </Grid>
      {toggle ? (
        <SignIn setToggle={setToggle} />
      ) : (
        <SignUp setToggle={setToggle} />
      )}
    </Grid>
  );
}
