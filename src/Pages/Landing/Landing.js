import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function SignInSide() {
  const handleSubmit = () => {
    console.log("Get Started");
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} square elevation={0}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "120px auto",
            maxWidth: "300px",
          }}
        >
          <img src="/MyKitchenLogoNoName.jpeg" alt="My Kitchen" />
          <Typography component="h1" variant="h4" sx={{ marginTop: "60px" }}>
            My Kitchen
          </Typography>
          <Typography component="p" variant="body1" sx={{ marginTop: "60px" }}>
            Description
          </Typography>
          <Typography component="p" variant="body1" align="center">
            Do you know what meal your going to prepare today? Just tell us what
            you have, and we will tell you what to prepare. Enjoy!
          </Typography>
          <Button
            variant="text"
            onClick={handleSubmit}
            sx={{
              mt: 3,
              mb: 2,
              ml: 1,
              display: "inline",
              width: "63%",
              height: "50px",
              backgroundColor: "black",
              color: "white",
            }}
          >
            Get Started
          </Button>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        sx={{
          backgroundImage:
            "url(https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "480px",
          margin: "auto",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
}
