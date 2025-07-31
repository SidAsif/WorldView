import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
} from "@mui/material";
import { API_CONFIG } from "../config/api";
import { getCountryDetails } from "../Services";
import toast from "react-hot-toast";

const fetchCountryDetails = async (countryCode) => {
  try {
    const res = await getCountryDetails(countryCode);
    const countryData = res.data[0]; // safely access data
    console.log("Country:", countryData.name.common); // example usage
    return countryData;
  } catch (error) {
    toast.error("Failed to fetch country details.");
    console.error(error);
    return null;
  }
};
const SavedCountries = () => {
  const { user } = useUser();
  const [bookmarks, setBookmarks] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookmarksAndDetails() {
      if (!user) return;
      try {
        const res = await axios.get(
          `${API_CONFIG.baseURL}${API_CONFIG.endpoints.getBookmarks}`,
          {
            headers: { "x-user-id": user.id },
          }
        );
        setBookmarks(res.data);

        // Fetch full country details for each saved country code
        const countryDetailsPromises = res.data.map((bookmark) =>
          fetchCountryDetails(bookmark.countryCode)
            .then((data) => ({
              ...bookmark,
              name: data.name.common,
              capital: data.capital?.[0] || "No Capital",
              population: data.population,
              flagUrl: data.flags?.svg || data.flags?.png || "",
            }))
            .catch(() => ({
              ...bookmark,
              name: bookmark.countryCode,
              capital: "N/A",
              population: "N/A",
              flagUrl: "",
            }))
        );

        const countriesData = await Promise.all(countryDetailsPromises);
        setCountries(countriesData);
      } catch (error) {
        console.error("Error loading saved countries:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookmarksAndDetails();
  }, [user]);

  if (!user)
    return <Typography>Please sign in to view saved countries.</Typography>;
  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Box sx={{ p: 4 }}>
      {countries.length === 0 ? (
        <Typography>No countries saved yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {countries.map((country) => (
            <Grid item key={country._id} xs={12} sm={6} md={3}>
              <Card sx={{ height: "100%" }}>
                {country.flagUrl && (
                  <CardMedia
                    sx={{ height: 140, borderRadius: "2px 2px 0 0" }}
                    image={country.flagUrl}
                    alt={country.name || "Flag"}
                  />
                )}
                <CardContent>
                  <Typography variant="h5" component="div">
                    <Link to={`/countries/${country.countryCode}`}>
                      {country.name || country.countryCode}
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {country.capital} |{" "}
                    {typeof country.population === "number"
                      ? country.population.toLocaleString()
                      : "N/A"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Saved on {new Date(country.savedAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SavedCountries;
