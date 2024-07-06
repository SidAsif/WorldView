import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { TravelExplore } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function Nav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const appBarStyle = {
    backgroundColor: "black",
    height: "65px",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    marginLeft: "20px",
  };
  const smallScreenStyle = {
    color: "black",
    textDecoration: "none",
    marginLeft: "20px",
  };

  if (isSmallScreen) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={appBarStyle}>
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
            >
              <MenuItem onClick={handleClose}>
                <Link to="/" style={smallScreenStyle}>
                  Home
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/news" style={smallScreenStyle}>
                  News
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/contact" style={smallScreenStyle}>
                  Contact Us
                </Link>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={appBarStyle}>
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

            <Typography>
              <Link to="/" style={linkStyle}>
                Home
              </Link>
              <Link to="/news" style={linkStyle}>
                News
              </Link>
              <Link to="/contact" style={linkStyle}>
                Contact Us
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
