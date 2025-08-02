import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { API_CONFIG } from "../config/api";
import toast from "react-hot-toast";
const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await axios.post(
        `${API_CONFIG.baseURL}${API_CONFIG.endpoints.subscribe}`,
        { email }
      );

      toast.success(res.data.msg || "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      console.error("Subscribe error:", err);
      const errorMsg = err.response?.data?.msg || "Something went wrong.";
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer
      style={{
        backgroundImage: "url('map.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        position: "relative",
        width: "100%",
        padding: "60px 0 30px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          background: "rgba(0,0,0,0.6)",
          zIndex: 0,
        }}
      />
      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6}>
          {/* About */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              🌍 WorldView
            </Typography>
            <Typography variant="body2">
              Discover the world—countries, cultures, insights, and data—at your
              fingertips. WorldView brings the globe closer through bite-sized
              knowledge.
            </Typography>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <FaEnvelope style={{ marginRight: 10 }} />
              <Typography variant="body2">stemp0981@gmail.com</Typography>
            </Box>
            <Box display="flex" mt={1}>
              <TextField
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  bgcolor: "white",
                  borderRadius: 1,
                  input: { padding: "10px" },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSubscribe}
                disabled={submitting}
                sx={{
                  ml: 2,
                  backgroundColor: "#00bfa5",
                  px: 3,
                  "&:hover": { backgroundColor: "#009e88" },
                }}
              >
                {submitting ? "Submitting..." : "Subscribe"}
              </Button>
            </Box>
          </Grid>

          {/* Socials */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Connect with Me
            </Typography>
            <Box display="flex" gap={2} mt={1}>
              <SocialIcon
                href="https://www.facebook.com"
                icon={<FaFacebook />}
              />
              <SocialIcon
                href="https://www.instagram.com"
                icon={<FaInstagram />}
              />
              <SocialIcon
                href="https://github.com/SidAsif"
                icon={<FaGithub />}
              />
              <SocialIcon href="https://twitter.com" icon={<FaTwitter />} />
              <SocialIcon
                href="https://www.linkedin.com/in/md-asif-siddiqui-157497208/"
                icon={<FaLinkedin />}
              />
            </Box>
          </Grid>
        </Grid>

        <Typography variant="body2" align="center" sx={{ mt: 6, opacity: 0.8 }}>
          &copy; {new Date().getFullYear()} WorldView — Made with ❤️ by Asif
          Siddiqui.
        </Typography>
      </Container>
    </footer>
  );
};

// Reusable Social Icon
const SocialIcon = ({ href, icon }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    color="inherit"
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "rgba(255,255,255,0.1)",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#00bfa5",
        color: "#fff",
      },
    }}
  >
    {icon}
  </Link>
);

export default Footer;
