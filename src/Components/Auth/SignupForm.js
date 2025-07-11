import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
const SignupForm = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (password !== confirmPass) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    setLoading(true);
    try {
      await signup(email, password);
      setMessage({
        type: "success",
        text: "Signup successful! You can now login.",
      });
      setEmail("");
      setPassword("");
      setConfirmPass("");
    } catch (error) {
      setMessage({ type: "error", text: "Signup failed. Try again." });
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card
        sx={{ maxWidth: 400, width: "100%", boxShadow: 3, borderRadius: 2 }}
      >
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Signup
          </Typography>

          {message.text && (
            <Alert severity={message.type} sx={{ mb: 2 }}>
              {message.text}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
              autoComplete="email"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
              autoComplete="new-password"
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              fullWidth
              required
              margin="normal"
              autoComplete="new-password"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
          <Typography
            sx={{
              mt: 2,
              textAlign: "center",
              color: "#007BFF",
              cursor: "default",
            }}
          >
            Already have an account?{" "}
            <RouterLink
              to="/login"
              style={{
                color: "#007BFF",
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Login
            </RouterLink>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignupForm;
