import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchForm from "../../Pages/Search/SearchForm";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GridViewIcon from "@mui/icons-material/GridView";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";

const pages = [
  { page: "Dashboard", link: "/dashboard", icon: <GridViewIcon /> },
  { page: "Favorite", link: "/favorite", icon: <FavoriteBorderIcon /> },
];
const settings = [
  { page: "My Profile", link: "/profile", icon: <PermIdentityIcon /> },
  { page: "Logout", link: "/", icon: <LogoutIcon /> },
];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("myKitchenAppUser"));

  const handleLogout = () => {
    localStorage.removeItem("myKitchenAppToken");
    localStorage.removeItem("myKitchenAppUser");
    navigate("/", { replace: true });
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <AppBar sx={{ bgcolor: "rgb(0, 0, 0)" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              marginRight: "20px",
            }}
            component="a"
            href="/dashboard"
            alt="logo"
            src="/MyKitchenLogoNoName.jpeg"
          />

          {/* Mobile left dropdown Menu */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "rgb(255, 255, 255)",
              textDecoration: "none",
            }}
          >
            MyKitchen
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem onClick={handleCloseNavMenu} key={page.page}>
                  <Typography textAlign="center">
                    <NavLink
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        fontSize: "1rem",
                        color: "rgb(0, 0, 0)",
                      }}
                      to={page.page}
                    >
                      {page.icon}
                      {page.page}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink
                  onClick={handleClickOpen}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    fontSize: "1rem",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  <SearchIcon />
                  Search
                </NavLink>
                <SearchForm open={open} setOpen={setOpen} />
              </MenuItem>
            </Menu>
          </Box>

          {/* desktop navbar links */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MyKitchen
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "flex-end",
                marginRight: 50,
                alignItems: "center",
              },
            }}
          >
            <Button
              onClick={handleClickOpen}
              sx={{
                fontSize: "1.2rem",
                backgroundColor: "black",
                color: "white",
              }}
            >
              <SearchIcon />
              Search
            </Button>
            <SearchForm open={open} setOpen={setOpen} />

            {pages.map((page) => (
              <Button
                key={page.page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <NavLink
                  style={{
                    fontSize: "1.2rem",
                    textDecoration: "none",
                    color: "rgb(255, 255, 255)",
                  }}
                  to={page.link}
                >
                  {page.page}
                </NavLink>
              </Button>
            ))}
            <Button
              style={{
                fontSize: "1.2rem",
                textDecoration: "none",
                color: "rgb(255, 255, 255)",
                paddingLeft: "8px",
              }}
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
            <SearchForm open={open} setOpen={setOpen} />
          </Box>

          {/* User initial drop down */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Name">{currentUser.name.charAt(0)}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.page}
                  onClick={() => {
                    handleCloseUserMenu();
                    setting.page === "Logout" && handleLogout();
                  }}
                  style={{
                    fontSize: "1rem",
                  }}
                >
                  {setting.icon}
                  {setting.page !== "Logout" ? (
                    <NavLink
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "rgb(0, 0, 0)",
                        fontSize: "1rem",
                      }}
                      to={setting.link}
                    >
                      {setting.page}
                    </NavLink>
                  ) : (
                    setting.page
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
