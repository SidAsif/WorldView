import React from "react";
import {
  Typography,
  Grid,
  Container,
  TextField,
  Button,
  Box,
  Link,
} from "@mui/material";
import {
  FaHome,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "black", color: "white", padding: "40px 0" }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              About WorldView
            </Typography>
            <Typography variant="body2">
              "Explore the world's insights with WorldView. Discover fascinating
              information about different countries, cultures, histories,
              economies, and more. Whether you're curious about geographical
              wonders, political landscapes, or cultural heritage, WorldView
              brings the world to your fingertips."
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box component="ul" style={{ listStyleType: "none", padding: 0 }}>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <FaHome style={{ marginRight: "10px" }} />
                Deoria, Uttar Pradesh
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <FaEnvelope style={{ marginRight: "10px" }} />{" "}
                stemp@098@gmail.com
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <FaPhone style={{ marginRight: "10px" }} /> +918604899882
              </li>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box display="flex" gap={2}>
              <Link
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                color="#008080"
              >
                <FaFacebook style={{ fontSize: "24px" }} />
              </Link>
              <Link
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                color="#008080"
              >
                <FaInstagram style={{ fontSize: "24px" }} />
              </Link>
              <Link
                href="https://github.com/SidAsif"
                target="_blank"
                rel="noopener noreferrer"
                color="#008080"
              >
                <FaGithub style={{ fontSize: "24px" }} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                color="#008080"
              >
                <FaTwitter style={{ fontSize: "24px" }} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/md-asif-siddiqui-157497208/"
                target="_blank"
                rel="noopener noreferrer"
                color="#008080"
              >
                <FaLinkedin style={{ fontSize: "24px" }} />
              </Link>
            </Box>
            <Box mt={2}>
              <Box display="flex" alignItems="center">
                <TextField
                  placeholder="xyz@gmail.com"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ bgcolor: "white", borderRadius: "5px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  style={{ marginLeft: "10px", backgroundColor: "#008080" }}
                >
                  Subscribe
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: "20px", color: "#008080" }}
        >
          &copy; {new Date().getFullYear()} CodeCraft. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
