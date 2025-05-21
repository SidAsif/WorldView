import React, { useState, useEffect } from "react";
import {
  Box,
  Autocomplete,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Stack,
  Divider,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const CompareCountries = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setAllCountries(data);
      } catch (err) {
        console.error("Failed to fetch countries", err);
      }
    };
    fetchAllCountries();
  }, []);

  useEffect(() => {
    if (selectedCountries.length === 0) {
      setComparisonData([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          selectedCountries.map(async (country) => {
            const res = await fetch(
              `https://restcountries.com/v3.1/name/${country}?fullText=true`
            );
            const data = await res.json();
            return data[0];
          })
        );
        setComparisonData(results);
      } catch (err) {
        console.error("Failed to fetch comparison data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCountries]);

  // Prepare chart data
  const chartData = comparisonData.map((country) => ({
    name: country.name.common,
    population: country.population,
    area: country.area,
  }));

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        mb={3}
        mt={10}
        textAlign="center"
        fontWeight="bold"
      >
        Global Insights Dashboard
      </Typography>

      <Box display="flex" justifyContent="center" mb={4}>
        <Autocomplete
          multiple
          limitTags={3}
          options={allCountries.map((c) => c.name.common)}
          value={selectedCountries}
          onChange={(e, value) => {
            if (value.length <= 5) {
              setSelectedCountries(value);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select up to 5 Countries"
              variant="outlined"
              helperText={
                selectedCountries.length >= 5
                  ? "Limit reached: max 5 countries"
                  : ""
              }
            />
          )}
          sx={{
            width: "100%",
            maxWidth: 600,
            minWidth: 300,
            mb: 4,
          }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : comparisonData.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="50vh"
          textAlign="center"
        >
          <Typography variant="h6" gutterBottom>
            No countries selected
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth="500px">
            Use the search bar above to select two or more countries you'd like
            to compare. You’ll see details like population, area, capital,
            currency and more.
          </Typography>
        </Box>
      ) : (
        <>
          {/* Chart Section */}
          <Box mb={5}>
            <Typography variant="h5" mb={2}>
              📊 Comparative Analytics
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => value.toLocaleString()} />
                <Legend />
                <Bar dataKey="population" fill="#1976d2" name="Population" />
                <Bar dataKey="area" fill="#ff9800" name="Area (km²)" />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          {/* Cards Section */}
          <Grid container spacing={3}>
            {comparisonData.map((country) => (
              <Grid item xs={12} sm={6} md={4} key={country.cca3}>
                <Card
                  elevation={6}
                  sx={{
                    borderRadius: 3,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 12px 20px rgba(0,0,0,0.15)",
                    },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      mb={2}
                    >
                      <Box
                        component="img"
                        src={country.flags.png}
                        alt={`${country.name.common} flag`}
                        sx={{
                          width: 60,
                          height: 40,
                          borderRadius: 1,
                          objectFit: "cover",
                          boxShadow: 1,
                        }}
                      />
                      <Typography
                        variant="h6"
                        fontWeight="700"
                        color="primary.main"
                        noWrap
                      >
                        {country.name.common}
                      </Typography>
                    </Stack>

                    <Divider sx={{ mb: 2 }} />

                    <Typography variant="body2" color="text.secondary" mb={0.7}>
                      <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={0.7}>
                      <strong>Region:</strong> {country.region}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={0.7}>
                      <strong>Population:</strong>{" "}
                      {country.population.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={0.7}>
                      <strong>Area:</strong> {country.area.toLocaleString()} km²
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={0}>
                      <strong>Currency:</strong>{" "}
                      {Object.values(country.currencies || {})[0]?.name ||
                        "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default CompareCountries;
