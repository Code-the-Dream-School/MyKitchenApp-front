import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp({ setToggle, theme }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isNameInvalid, setIsNameInvalid] = useState(true);
  const [invalidNameMessage, setInvalidNameMessage] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(true);
  const [invalidPasswordMessage, setInvalidPasswordMessage] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(true);
  const [invalidEmailMessage, setInvalidEmailMessage] = useState("");
  const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] =
    useState(true);
  const [invalidConfirmPasswordMessage, setInvalidConfirmPasswordMessage] =
    useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    getMyKitchenAppToken();
  };

  const getMyKitchenAppToken = () => {
    const url = "/api/v1/auth/register";
    const data = {
      name: name,
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

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (event.target.value.length === 0) {
      setIsNameInvalid(true);
      setInvalidNameMessage("Please provide a valid name");
    } else {
      setIsNameInvalid(false);
      setInvalidNameMessage("");
    }
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

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    if (event.target.value.length < 8) {
      setIsConfirmPasswordInvalid(true);
      setInvalidConfirmPasswordMessage(
        "Password must be at least 8 characters."
      );
    } else {
      setIsConfirmPasswordInvalid(false);
      setInvalidConfirmPasswordMessage("");
    }
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      setIsConfirmPasswordInvalid(true);
      setInvalidConfirmPasswordMessage("Passwords do not match");
    } else {
      setIsConfirmPasswordInvalid(false);
      setInvalidConfirmPasswordMessage("");
    }
  }, [password, confirmPassword]);
  
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
        paddingBottom: "11rem",
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
          Welcome!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            helperText={invalidNameMessage}
            onChange={handleNameChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="confirm-password"
            helperText={invalidConfirmPasswordMessage}
            onChange={handleConfirmPasswordChange}
          />
          {error && <p className="error-msg">{errorMessage}</p>}
          <Button
            disabled={
              isNameInvalid ||
              isEmailInvalid ||
              isPasswordInvalid ||
              isConfirmPasswordInvalid
            }
            type="submit"
            variant="outlined"
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
            Create Account
          </Button>
          <Typography component="p">
            Already have an account?{" "}
            <span className="underline" onClick={() => setToggle(true)}>
              Sign in
            </span>
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
