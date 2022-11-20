import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const Profile = () => {
  const [isEdittingAccount, setIsEdittingAccount] = useState(false);

  const user = JSON.parse(localStorage.getItem("myKitchenAppUser"));

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEdittingAccount(false);
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AccountCircleIcon sx={{ fontSize: 120, color: "grey" }} />
        <Button
          variant="outlined"
          sx={{
            display: "inline",
            height: "50px",
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#5a5a5a",
            },
          }}
        >
          Upload
        </Button>
      </Box>
      <Box>
        <Typography component="h1" variant="h3">
          Profile
        </Typography>
        {isEdittingAccount ? (
          <Box
            component="form"
            onSubmit={handleSubmit}
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
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
