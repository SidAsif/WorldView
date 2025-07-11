import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AccountCircle, TravelExplore } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

export default function Nav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Simulating auth state; replace with your actual auth context
  const isLoggedIn = false; // Change to true to test logged-in state

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const appBarStyle = {
    backgroundColor: "rgb(252 252 252)",
    height: "65px",
    color: "Black",
  };

  const linkStyle = {
    color: "Black",
    textDecoration: "none",
    marginLeft: "20px",
    fontSize: "1.4rem",
    fontWeight: "semibold",
    letterSpacing: "1px",
    "&:hover": {
      color: "#008080",
      textDecoration: "underline",
    },
  };
  const smallScreenStyle = {
    color: "black",
    textDecoration: "none",
    marginLeft: "20px",
  };

  if (isSmallScreen) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={appBarStyle} elevation={0}>
          <Toolbar variant="dense" style={{ paddingTop: "10px" }}>
            <IconButton size="large" edge="start" color="inherit">
              <TravelExplore />
            </IconButton>
            <Typography
              variant="h5"
              color="inherit"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                letterSpacing: "2px",
              }}
            >
              World
              <Typography
                component="span"
                variant="h5"
                sx={{
                  color: "#008080",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                }}
              >
                View
              </Typography>
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  width: "100%",
                  left: 0,
                  right: 0,
                  top: 56,
                  position: "absolute",
                },
              }}
            >
              <MenuItem onClick={handleClose}>
                <RouterLink to="/" style={smallScreenStyle}>
                  Home
                </RouterLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <RouterLink to="/compare" style={smallScreenStyle}>
                  GeoCompare
                </RouterLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <RouterLink to="/news" style={smallScreenStyle}>
                  News
                </RouterLink>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={appBarStyle} elevation={0}>
          <Toolbar variant="dense" style={{ paddingTop: "10px" }}>
            <IconButton size="large" edge="start" color="inherit">
              <TravelExplore sx={{ fontSize: "2.5rem", ml: 2 }} />
            </IconButton>
            <Typography
              variant="h5"
              color="inherit"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                letterSpacing: "2px",
                fontSize: "1.8rem",
              }}
            >
              World
              <Typography
                component="span"
                variant="h5"
                sx={{
                  color: "#008080",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  fontSize: "1.8rem",
                }}
              >
                View
              </Typography>
            </Typography>

            <Typography>
              <RouterLink to="/" style={linkStyle}>
                Home
              </RouterLink>
              <RouterLink to="/compare" style={linkStyle}>
                GeoCompare
              </RouterLink>
              <RouterLink to="/news" style={linkStyle}>
                News
              </RouterLink>
            </Typography>

            {/* Conditionally render Signup or Profile */}
            {isLoggedIn ? (
              <IconButton>
                <AccountCircle
                  sx={{ fontSize: "2.5rem", ml: 2, color: "black" }}
                />
              </IconButton>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                sx={{ ml: 2, fontWeight: "bold" }}
                onClick={handleSignupClick}
              >
                Signup
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
