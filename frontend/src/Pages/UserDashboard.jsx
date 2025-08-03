import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import SavedCountries from "./SavedCountries";
import axios from "axios";
import { API_CONFIG } from "../config/api";

// UserStories Component: Fetch and show stories uploaded by the current user
function UserStories() {
  const { user } = useUser();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (id, e) => {
    e.stopPropagation(); // Optional, prevents parent click if needed
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    if (!user) return;
    // Compose the robust author string as per your tips submit logic
    const author =
      user.username ||
      (user.firstName || user.lastName
        ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
        : "") ||
      user.email ||
      (user.primaryEmailAddress && user.primaryEmailAddress.emailAddress) ||
      "Anonymous";

    // GET stories by author -- assumes your API supports author param; otherwise filter client-side
    axios
      .get(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.getAllStories}`)
      .then((res) => {
        // Show only the stories that this user authored
        setStories(res.data.filter((story) => story.author === author));
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <Typography>Loading your stories...</Typography>;
  if (!stories.length)
    return <Typography>You have not uploaded any stories yet.</Typography>;

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {stories.map(({ _id, country, text, images }) => (
        <Grid key={_id} item xs={12} sm={6} md={4}>
          <Card>
            {images && images.length > 0 && (
              <Box
                component="img"
                src={images[0]}
                alt="Thumbnail"
                sx={{ width: "100%", height: 150, objectFit: "cover" }}
              />
            )}
            <CardContent>
              <Typography variant="subtitle2" color="primary">
                {country}
              </Typography>
              <Typography
                variant="body2"
                sx={
                  expandedCards[_id]
                    ? {
                        whiteSpace: "break-spaces",
                        wordBreak: "break-word",
                      }
                    : {
                        display: "-webkit-box",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        whiteSpace: "normal",
                      }
                }
              >
                {text}
              </Typography>
              <Button
                size="small"
                onClick={(e) => toggleExpand(_id, e)}
                sx={{ mt: 1 }}
              >
                {expandedCards[_id] ? "Show Less" : "Read More"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

const UserDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  return (
    <Box sx={{ p: 4, mt: 8 }}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Stories" />
        <Tab label="Saved Countries" />
      </Tabs>

      {/* Stories Tab */}
      {tabIndex === 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Your Uploaded Stories
          </Typography>
          <UserStories />
        </Box>
      )}

      {/* Saved Countries Tab */}
      {tabIndex === 1 && (
        <Box sx={{ mt: 4 }}>
          <SavedCountries />
        </Box>
      )}
    </Box>
  );
};

export default UserDashboard;
