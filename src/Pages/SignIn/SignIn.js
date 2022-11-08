import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  // variable to check if component is rendered for the first time
  const didComponentMount = useRef(false);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    if (!data.get("email") || !data.get("password")) {
      setError(true);
      setErrorMessage("Please Enter an Email and a Password");
      return;
    }

    setEmail(data.get("email"));
    setPassword(data.get("password"));
  };

  const getUserToken = () => {
    const url = "/api/v1/auth/login";
    const data = {
      email: email,
      password: password,
    };

    axios
      .post(url, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response);
        setToken(response.data.token);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setErrorMessage(error.response.data.msg);
      });
  };

  useEffect(() => {
    // if component renders for the first time,
    // we do not make the axios call
    if (didComponentMount.current) {
      getUserToken();
    }
    didComponentMount.current = true;
  }, [email, password]);

  useEffect(() => {
    localStorage.setItem("token", token);
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

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
          {error && <p className="error-msg">{errorMessage}</p>}
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
