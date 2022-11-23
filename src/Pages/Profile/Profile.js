import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";

const Profile = () => {
  const [isEdittingAccount, setIsEdittingAccount] = useState(false);
  const [isEdittingPassword, setIsEdittingPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const user = JSON.parse(localStorage.getItem("myKitchenAppUser"));

  const handleEditAccountSubmit = (event) => {
    event.preventDefault();
    setIsEdittingAccount(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // if (event.target.value.length < 8) {
    //   setIsPasswordInvalid(true);
    //   setInvalidPasswordMessage("Password must be at least 8 characters.");
    // } else {
    //   setIsPasswordInvalid(false);
    //   setInvalidPasswordMessage("");
    // }
  };
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleEditPasswordSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/auth/changePassword";
    const data = {
      password: password,
      newPassword: newPassword,
    };

    const token = localStorage.getItem("myKitchenAppToken");

    axios
      .patch(url, data, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setIsEdittingPassword(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <AccountCircleIcon
        sx={{ fontSize: 120, color: "grey", alignSelf: "start", flex: 1 }}
      />
      <Box sx={{ flex: 4 }}>
        <Typography component="h1" variant="h3">
          Profile
        </Typography>
        {isEdittingAccount ? (
          <Box
            component="form"
            onSubmit={handleEditAccountSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              sx={{ width: "400px", display: "block" }}
              name="name"
              label="Full Name"
              type="text"
              id="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              sx={{ width: "400px", display: "block" }}
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
            />
            <Button
              type="submit"
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                display: "inline",
                height: "50px",
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "#5a5a5a",
                },
              }}
            >
              Save
            </Button>
          </Box>
        ) : isEdittingPassword ? (
          <Box
            component="form"
            onSubmit={handleEditPasswordSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              sx={{ width: "400px", display: "block" }}
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handlePasswordChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              sx={{ width: "400px", display: "block" }}
              id="new-password"
              label="New Password"
              name="new-password"
              type="password"
              onChange={handleNewPasswordChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              sx={{ width: "400px", display: "block" }}
              id="confirm-password"
              label="Confirm Password"
              name="confirm-password"
              type="password"
            />
            <Button
              type="submit"
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                display: "inline",
                height: "50px",
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "#5a5a5a",
                },
              }}
            >
              Save
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography sx={{ width: "400px" }}>Name: {user.name}</Typography>
            <Typography sx={{ width: "400px" }}>Email: {user.email}</Typography>
            <Button
              onClick={() => setIsEdittingAccount(true)}
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                display: "inline",
                height: "50px",
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "#5a5a5a",
                },
              }}
            >
              Edit Account
            </Button>
            <Button
              onClick={() => setIsEdittingPassword(true)}
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                ml: 2,
                display: "inline",
                height: "50px",
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "#5a5a5a",
                },
              }}
            >
              Change Password
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
