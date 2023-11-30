import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../Components/Nav.css";

export default function Nav() {
  const appBarStyle = {
    backgroundColor: "#009EDB", // Change this to the color you want
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: "2rem",
              fontWeight: "bold",
              letterSpacing: "2px",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            THE WORLDVIEW
          </Typography>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
