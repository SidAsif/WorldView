import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      alert("Logged in!");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <Card
        sx={{ maxWidth: 400, width: "100%", boxShadow: 3, borderRadius: 2 }}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            fontWeight="bold"
          >
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
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
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
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
            Don't have an account?{" "}
            <RouterLink
              to="/signup"
              style={{
                color: "#007BFF",
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Signup
            </RouterLink>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;
