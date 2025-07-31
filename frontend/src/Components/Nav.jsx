import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { TravelExplore } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import CustomUserMenu from "../Components/CustomUserMenu";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

export default function Nav() {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const openMenu = Boolean(menuAnchor);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // Nav links -- only use icons for small screen!
  const navLinks = [
    {
      label: "Home",
      to: "/",
      icon: <HomeIcon fontSize="small" sx={{ mr: 1 }} />,
    },
    {
      label: "GeoCompare",
      to: "/compare",
      icon: <CompareArrowsIcon fontSize="small" sx={{ mr: 1 }} />,
    },
    {
      label: "News",
      to: "/news",
      icon: <NewspaperIcon fontSize="small" sx={{ mr: 1 }} />,
    },
    {
      label: "Stories",
      to: "/stories",
      icon: <TipsAndUpdatesIcon fontSize="small" sx={{ mr: 1 }} />,
    },
  ];

  // Nav link style for both mobile+desktop
  const navLinkStyle = {
    display: "flex",
    alignItems: "center",
    color: "#1e293b",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1rem",
    marginLeft: "12px",
    padding: "6px 0",
    borderRadius: "6px",
    transition: "background 0.2s,color 0.2s",
    "&:hover": {
      color: "#0f766e",
      background: "#F1F5F9",
    },
  };

  // Open/close mobile menu
  const handleMenuOpen = (e) => setMenuAnchor(e.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  // Signup button action
  const handleSignupClick = () => navigate("/signup");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #e2e8f0",
          px: { xs: 2, sm: 4 },
        }}
      >
        <Toolbar
          disableGutters
          sx={{ height: "65px", justifyContent: "space-between" }}
        >
          {/* Logo section */}
          <Stack direction="row" alignItems="center">
            <IconButton
              color="inherit"
              size="large"
              edge="start"
              sx={{ mr: 1 }}
            >
              <TravelExplore sx={{ color: "#0f766e", fontSize: "2rem" }} />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                letterSpacing: "1px",
                color: "#1e293b",
              }}
            >
              World
              <Box
                component="span"
                sx={{ color: "#0f766e", fontWeight: "bold" }}
              >
                View
              </Box>
            </Typography>
          </Stack>

          {/* Responsive navigation logic */}
          {isSmallScreen ? (
            // --- SMALL SCREEN: ---
            <Stack direction="row" alignItems="center" gap={0.5}>
              <SignedIn>
                <UserButton showName={false} afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <IconButton onClick={handleSignupClick}>
                  <PersonAddAltIcon sx={{ color: "#0f766e", fontSize: 26 }} />
                </IconButton>
              </SignedOut>
              <IconButton
                size="large"
                onClick={handleMenuOpen}
                sx={{ color: "#334155" }}
                aria-label="Open navigation"
              >
                <MenuIcon sx={{ fontSize: 28 }} />
              </IconButton>

              <Menu
                anchorEl={menuAnchor}
                open={openMenu}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: {
                    width: "95vw",
                    left: 0,
                    right: 0,
                    borderRadius: "16px",
                    mt: 1,
                  },
                  elevation: 3,
                }}
              >
                <Box sx={{ py: 1.5 }}>
                  {navLinks.map((link) => (
                    <MenuItem
                      key={link.label}
                      onClick={handleMenuClose}
                      sx={{ px: 2 }}
                    >
                      {/* For mobile, include icon and label */}
                      <RouterLink to={link.to} style={navLinkStyle}>
                        {link.icon}
                        {link.label}
                      </RouterLink>
                    </MenuItem>
                  ))}
                  {/* No Signup button here! */}
                </Box>
              </Menu>
            </Stack>
          ) : (
            // --- DESKTOP: ---
            <Stack direction="row" alignItems="center" spacing={2.5}>
              {navLinks.map((link) => (
                <RouterLink to={link.to} style={navLinkStyle} key={link.label}>
                  {/* For desktop, ONLY text label */}
                  {link.label}
                </RouterLink>
              ))}
              <SignedIn>
                <CustomUserMenu />
              </SignedIn>
              <SignedOut>
                <Button
                  onClick={handleSignupClick}
                  variant="outlined"
                  sx={{
                    borderColor: "#0f766e",
                    color: "#0f766e",
                    textTransform: "none",
                    fontWeight: "bold",
                    px: 2,
                    ml: 0.5,
                    "&:hover": {
                      backgroundColor: "#0f766e",
                      color: "#fff",
                    },
                  }}
                  startIcon={<PersonAddAltIcon />}
                >
                  Signup
                </Button>
              </SignedOut>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
