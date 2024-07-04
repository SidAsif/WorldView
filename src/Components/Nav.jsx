import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../Components/Nav.css";
import { TravelExplore } from "@mui/icons-material";

export default function Nav() {
  const appBarStyle = {
    backgroundColor: "#1976d2",
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={appBarStyle}>
        <Toolbar variant="dense">
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <TravelExplore />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{
              flexGrow: 1,

              fontWeight: "bold",
              letterSpacing: "2px",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            WORLDVIEW
          </Typography>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
