import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { AccountCircle, TravelExplore } from "@mui/icons-material";
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
    backgroundColor: "rgb(252 252 252)",
    height: "65px",
    color: "Black",
  };

  const linkStyle = {
    color: "Black",
    textDecoration: "none",
    marginLeft: "20px",
    fontSize: "1.5rem",
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
            >
              <MenuItem onClick={handleClose}>
                <RouterLink to="/" style={smallScreenStyle}>
                  Home
                </RouterLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <RouterLink to="/news" style={smallScreenStyle}>
                  News
                </RouterLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ScrollLink
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  style={smallScreenStyle}
                >
                  Contact Us
                </ScrollLink>
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
              <RouterLink to="/news" style={linkStyle}>
                News
              </RouterLink>
              <ScrollLink
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                style={linkStyle}
              >
                Contact Us
              </ScrollLink>
            </Typography>
            <IconButton>
              <AccountCircle
                sx={{ fontSize: "2.5rem", ml: 2, color: "black" }}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
