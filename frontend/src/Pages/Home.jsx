import * as React from "react";
import CountryCard from "../Components/CountryCard";
import { useEffect, useState } from "react";
import { getAllCountries } from "../Services/index";
import { Link } from "react-router-dom";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Grid,
  Box,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";

function Home() {
  const [countdata, setCountData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(28);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCountries();
        setCountData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [allCountriesList, setCountriesList] = useState([]);
  const [filteredCoutriesList, setFilteredCountriesList] = useState([]);
  const [region, setRegion] = useState("");
  const [countryName, setCountryName] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortCriteria, setSortCriteria] = useState("name");

  const handleSort = (criteria) => {
    setSortOrder((prevOrder) =>
      sortCriteria === criteria ? (prevOrder === "asc" ? "desc" : "asc") : "asc"
    );
    setSortCriteria(criteria);
  };

  const sortedCountries = () => {
    const copy = [...filteredCoutriesList];
    return copy.sort((a, b) => {
      const aValue = String(a[sortCriteria] ?? "");
      const bValue = String(b[sortCriteria] ?? "");
      const comparison = aValue.localeCompare(bValue);
      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = sortedCountries().slice(firstPostIndex, lastPostIndex);

  useEffect(() => {
    getAllCountries().then((result) => {
      const coutries = result.data;
      setCountriesList(coutries);
      setFilteredCountriesList(coutries);
    });
  }, []);

  useEffect(() => {
    if (region === "" && countryName === "") {
      setFilteredCountriesList(allCountriesList);
    } else {
      let filteredCoutries = allCountriesList;

      if (region.length) {
        filteredCoutries = filteredCoutries.filter(
          (country) => country.region === region
        );
      }

      if (countryName.length) {
        const lowercaseCountryName = countryName.toLowerCase();
        filteredCoutries = filteredCoutries.filter((country) =>
          country.name?.common?.toLowerCase().includes(lowercaseCountryName)
        );
      }

      setFilteredCountriesList(filteredCoutries);
    }
  }, [region, allCountriesList, countryName]);

  const totalPages = Math.ceil(filteredCoutriesList.length / postsPerPage);

  return (
    <>
      <Box sx={{ pt: 12, mt: 3, pr: 3, pl: 3, pb: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: "2rem",
                md: "3.5rem",
              },
              color: "black",
              fontWeight: 600,
              marginBottom: {
                xs: "1rem",
                md: "1rem",
              },
              marginTop: {
                md: "2rem",
              },

              textAlign: "center",
            }}
            gutterBottom
          >
            Explore the World with WorldView
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.125rem",
              color: "black",
              fontWeight: 300,
            }}
            gutterBottom
          >
            Discover detailed information and news from countries around the
            globe on a single platform.
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mt: 3 }} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Find Your Country"
              variant="outlined"
              onChange={(e) => setCountryName(e.target.value)}
              value={countryName}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Select Your Region
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={region}
                label="Select Your Region"
                onChange={(e) => setRegion(e.target.value)}
              >
                <MenuItem value={""}>All</MenuItem>
                <MenuItem value={"Africa"}>Africa</MenuItem>
                <MenuItem value={"Americas"}>Americas</MenuItem>
                <MenuItem value={"Asia"}>Asia</MenuItem>
                <MenuItem value={"Europe"}>Europe</MenuItem>
                <MenuItem value={"Oceania"}>Oceania</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => handleSort("name")}
            sx={{
              mr: 1,
              bgcolor: "#008080",
              "&:hover": {
                bgcolor: "#218080",
              },
            }}
          >
            Sort by Name
          </Button>
          <Button
            variant="contained"
            onClick={() => handleSort("region")}
            sx={{
              bgcolor: "#008080",
              "&:hover": {
                bgcolor: "#218080",
              },
            }}
          >
            Sort by Region
          </Button>
        </Box>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {loading
            ? Array.from(new Array(15)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Skeleton variant="rectangular" height={200} />
                </Grid>
              ))
            : currentPosts.map((country, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={country.cca3}
                  sx={{
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Link
                    to={`/countries/${country.cca3}`}
                    style={{ textDecoration: "none" }}
                  >
                    <CountryCard
                      countdata={countdata}
                      name={country.name?.common}
                      capital={country.capital?.[0]}
                      population={country.population}
                      flagUrl={country.flags?.png}
                    />
                  </Link>
                </Grid>
              ))}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            padding: 2,
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            siblingCount={1}
            boundaryCount={1}
            shape="rounded"
            sx={{
              "& .Mui-selected": {
                backgroundColor: "#008080 !important",
                color: "white !important",
              },
              "& .Mui-selected:hover": {
                backgroundColor: "#218080 !important",
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
}

export default Home;
