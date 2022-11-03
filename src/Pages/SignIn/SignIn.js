import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography component="h1" variant="h3">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            variant="outlined"
            sx={{
              mt: 3,
              mb: 2,
              mr: 1,
              display: "inline",
              width: "32%",
              height: "50px",
            }}
          >
            Sign In
          </Button>
          <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
            <Button
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                ml: 1,
                display: "inline",
                width: "63%",
                height: "50px",
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "#5a5a5a",
                },
              }}
            >
              Create Account
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
