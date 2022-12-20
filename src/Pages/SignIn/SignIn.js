import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Google from "./Google";

export default function SignIn({ setToggle, theme }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isPasswordInvalid, setIsPasswordInvalid] = useState(true);
  const [invalidPasswordMessage, setInvalidPasswordMessage] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(true);
  const [invalidEmailMessage, setInvalidEmailMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    getMyKitchenAppToken();
  };

  const getMyKitchenAppToken = () => {
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
        localStorage.setItem(
          "myKitchenAppUser",
          JSON.stringify(response.data.user)
        );
        localStorage.setItem("myKitchenAppToken", response.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response.status === 500) {
          setError(true);
          setErrorMessage(
            `${error.response.statusText}, please try again later!`
          );
          return;
        }
        setError(true);
        setErrorMessage(error.response.data.msg);
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!event.target.value.match(regex)) {
      setIsEmailInvalid(true);
      setInvalidEmailMessage("Please provide a valid email");
    } else {
      setIsEmailInvalid(false);
      setInvalidEmailMessage("");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < 8) {
      setIsPasswordInvalid(true);
      setInvalidPasswordMessage("Password must be at least 8 characters.");
    } else {
      setIsPasswordInvalid(false);
      setInvalidPasswordMessage("");
    }
  };

  return (
    <Grid
      component="main"
      xs={12}
      md={6}
      item
      sx={{
        opacity: "0.80",
        backgroundColor: "white",
        [theme.breakpoints.up("md")]: {
          paddingTop: "20vh",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          width: "70%",
          maxWidth: "800px",
        }}
      >
        <Typography component="h1" variant="h3" align="center">
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
            helperText={invalidEmailMessage}
            onChange={handleEmailChange}
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
            helperText={invalidPasswordMessage}
            onChange={handlePasswordChange}
          />
          {error && <p className="error-msg">{errorMessage}</p>}
          <Button
            type="submit"
            variant="outlined"
            disabled={isEmailInvalid || isPasswordInvalid}
            sx={{
              mt: 3,
              mb: 2,
              mr: 1,
              display: "inline",
              width: "100%",
              height: "50px",
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "#5a5a5a",
              },
              "&.Mui-disabled": {
                background: "white",
              },
            }}
          >
            Sign In
          </Button>
          <Google />
          <Typography component="p">
            Don't have an account?{" "}
            <span className="underline" onClick={() => setToggle(false)}>
              Sign up
            </span>
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
