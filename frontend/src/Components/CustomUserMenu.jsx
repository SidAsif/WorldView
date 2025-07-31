import { useUser } from "@clerk/clerk-react";
import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Divider,
  ListItemIcon,
  Typography,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

const CustomUserMenu = () => {
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { openUserProfile } = useClerk();
  const { signOut } = useClerk();

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  if (!user) return null;

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ p: 0 }}>
        <Avatar
          src={user.imageUrl}
          alt={user.fullName || "User"}
          sx={{
            width: 36,
            height: 36,
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1,
            borderRadius: 3,
            minWidth: 250,
            py: 0.5,
            px: 0,
          },
        }}
      >
        {/* User Info Section */}
        <Box display="flex" alignItems="center" px={2} py={1}>
          <Avatar
            src={user.imageUrl}
            alt={user.fullName}
            sx={{ width: 42, height: 42, mr: 1 }}
          />
          <Box>
            <Typography fontWeight={600} fontSize="0.95rem">
              {user.fullName}
            </Typography>
            <Typography fontSize="0.8rem" color="text.secondary">
              {user.primaryEmailAddress?.emailAddress}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Dashboard */}
        <MenuItem
          onClick={() => {
            navigate("/dashboard");
            handleClose();
          }}
        >
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>

        {/* Manage Account */}
        <MenuItem
          onClick={() => {
            openUserProfile(); // ← This opens the Clerk account settings box
            handleClose();
          }}
        >
          <ListItemIcon>
            <ManageAccountsIcon fontSize="small" />
          </ListItemIcon>
          Manage account
        </MenuItem>

        {/* Sign Out */}
        <MenuItem
          onClick={() => {
            handleClose();
            signOut(() => navigate("/"));
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            Sign out
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default CustomUserMenu;
