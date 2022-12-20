import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [isEdittingAccount, setIsEdittingAccount] = useState(false);
  const [isEdittingPassword, setIsEdittingPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isNewPasswordInvalid, setIsNewPasswordInvalid] = useState(true);
  const [invalidNewPasswordMessage, setInvalidNewPasswordMessage] =
    useState("");
  const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] =
    useState(true);
  const [invalidConfirmPasswordMessage, setInvalidConfirmPasswordMessage] =
    useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("myKitchenAppUser"));

  const handleEditAccountSubmit = (event) => {
    event.preventDefault();
    setIsEdittingAccount(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    if (event.target.value.length < 8) {
      setIsNewPasswordInvalid(true);
      setInvalidNewPasswordMessage("Password must be at least 8 characters.");
    } else {
      setIsNewPasswordInvalid(false);
      setInvalidNewPasswordMessage("");
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
    setError(false);
    if (newPassword !== confirmPassword) {
      setIsConfirmPasswordInvalid(true);
      setInvalidConfirmPasswordMessage("Passwords do not match");
    } else {
      setIsConfirmPasswordInvalid(false);
      setInvalidConfirmPasswordMessage("");
    }
  }, [newPassword, confirmPassword]);

  const handleCancelPasswordChange = () => {
    setIsEdittingPassword(false);
    setPassword("");
    setNewPassword("");
    setIsNewPasswordInvalid(true);
    setConfirmPassword("");
    setIsConfirmPasswordInvalid(true);
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
        if (response.status === 200) {
          setIsEdittingPassword(false);
          setPassword("");
          setNewPassword("");
          setIsNewPasswordInvalid(true);
          setConfirmPassword("");
          setIsConfirmPasswordInvalid(true);
          alert("Password changed successfully!");
        }
      })
      .catch((error) => {
        if (error.response.status) {
          setError(true);
          setErrorMessage(
            `${error.response.statusText}. 
            Please try again later with correct password!`
          );
          return;
        }
      });
  };

  return (
    <Box
      className="profile-card"
      sx={{
        marginTop: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Box sx={{ flex: 4, marginBottom: "50vh" }}>
        <Typography
          component="h1"
          variant="h3"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          My Profile
        </Typography>

        {isEdittingPassword ? (
          <Box
            component="form"
            onSubmit={handleEditPasswordSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Card
              sx={{
                maxWidth: 500,
                margin: "auto",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  className="profile-input"
                  margin="normal"
                  required
                  fullWidth
                  sx={{ display: "block" }}
                  name="password"
                  label="Current Password"
                  type="password"
                  id="password"
                  onChange={handlePasswordChange}
                  autoFocus
                />
                <TextField
                  className="profile-input"
                  margin="normal"
                  required
                  fullWidth
                  sx={{ display: "block" }}
                  id="new-password"
                  label="New Password"
                  name="new-password"
                  type="password"
                  helperText={invalidNewPasswordMessage}
                  onChange={handleNewPasswordChange}
                />
                <TextField
                  className="profile-input"
                  margin="normal"
                  required
                  fullWidth
                  sx={{ display: "block" }}
                  id="confirm-password"
                  label="Confirm New Password"
                  name="confirm-password"
                  type="password"
                  helperText={invalidConfirmPasswordMessage}
                  onChange={handleConfirmPasswordChange}
                />
                {error && (
                  <p className="error-msg profile-input">{errorMessage}</p>
                )}
              </CardContent>

              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  className="update-profile"
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
                    "&.Mui-disabled": {
                      background: "white",
                    },
                  }}
                  onClick={handleCancelPasswordChange}
                >
                  Cancel
                </Button>
                <Button
                  className="update-profile"
                  disabled={
                    !password ||
                    isNewPasswordInvalid ||
                    isConfirmPasswordInvalid
                  }
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
                    "&.Mui-disabled": {
                      background: "white",
                    },
                  }}
                >
                  Save
                </Button>
              </CardActions>
            </Card>
          </Box>
        ) : (
          <Box>
            <Card
              sx={{
                maxWidth: 500,
                margin: "auto",
              }}
            >
              <AccountCircleIcon
                sx={{
                  fontSize: 120,
                  color: "grey",
                  width: "100%",
                  margin: "auto",
                }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                  Name: {user.name}
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                  Email: {user.email}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  className="update-profile"
                  onClick={() => setIsEdittingPassword(true)}
                  variant="outlined"
                  sx={{
                    mt: 3,
                    mb: 2,
                    ml: 1,
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
              </CardActions>
            </Card>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
