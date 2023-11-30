import CountryCard from "../Components/CountryCard";
import "./Home.css";
import * as React from "react";

import { useEffect, useState } from "react";
import { getAllCountries } from "../Services/index";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
// import { Button } from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

function Home() {
  const [countdata, setCountData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(15);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v2/all");
        setCountData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Make sure to provide an empty dependency array to run the effect only once

  const [allCountriesList, setCountriesList] = useState([]);
  const [filteredCoutriesList, setFilteredCountriesList] = useState([]);
  const [region, setRegion] = useState("");
  const [countryName, setCountryName] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const [sortCriteria, setSortCriteria] = useState("name"); // "name" or "region"

  // const handleSearch = () => {
  //   const filteredCountries = allCountriesList.filter((country) => {
  //     const isMatchingName = country.name
  //       .toLowerCase()
  //       .includes(countryName.toLowerCase());
  //     const isMatchingRegion = region === "" || country.region === region;
  //     return isMatchingName && isMatchingRegion;
  //   });

  //   setFilteredCountriesList(filteredCountries);
  // };

  const handleSort = (criteria) => {
    // Toggle sort order if clicking on the same criteria
    setSortOrder((prevOrder) =>
      sortCriteria === criteria ? (prevOrder === "asc" ? "desc" : "asc") : "asc"
    );
    setSortCriteria(criteria);
  };

  const sortedCountries = () => {
    const copy = [...filteredCoutriesList];
    return copy.sort((a, b) => {
      const comparison = a[sortCriteria].localeCompare(b[sortCriteria]);
      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
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
    console.log("Region or country name changed: ", region, countryName);
    if (region === "" && countryName === "") {
      setFilteredCountriesList(allCountriesList);
    } else {
      let filteredCoutries = allCountriesList;

      // Filtering based on the region
      if (region.length) {
        filteredCoutries = filteredCoutries.filter(
          (country) => country.region === region
        );
      }

      // Filtering based on country name
      if (countryName.length) {
        const lowercaseCountryName = countryName.toLowerCase();
        filteredCoutries = filteredCoutries.filter((country) =>
          country.name.toLowerCase().includes(lowercaseCountryName)
        );
      }

      setFilteredCountriesList(filteredCoutries);
    }
  }, [region, allCountriesList, countryName]);

  return (
    <div className="App">
      <div className="filters-wrapper">
        <TextField
          // sx={{ mt: 2, minWidth: 400, ml: 2 }}
          id="outlined-basic"
          labeld="outlined-basic-label"
          label="Filter by Name"
          variant="outlined"
          onChange={(e) => setCountryName(e.target.value)}
          value={countryName}
        />
        <FormControl sx={{ m: 2 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Filter by Region
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={region}
            label="Filter by Region"
            onChange={(e) => setRegion(e.target.value)}
            // onChange={handleRegionChange}
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"Africa"}>Africa</MenuItem>
            <MenuItem value={"Americas"}>Americas</MenuItem>
            <MenuItem value={"Asia"}>Asia</MenuItem>
            <MenuItem value={"Europe"}>Europe</MenuItem>
            <MenuItem value={"Oceania"}>Oceania</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="sorting">
        <button
          onClick={() => handleSort("name")}
          style={{ marginRight: "10px", width: "100px" }}
        >
          Sort by Name
        </button>
        <button onClick={() => handleSort("region")} style={{ width: "100px" }}>
          Sort by Region
        </button>
      </div>

      <div className="country-card">
        {currentPosts.map((country) => (
          <Link
            to={`/countries/${country.alpha3Code}`}
            key={country.alpha3Code}
            style={{ textDecoration: "none" }}
          >
            <CountryCard
              countdata={countdata}
              name={country.name}
              capital={country.capital}
              population={country.population}
              flagUrl={country.flags.png}
            />
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{ width: "60px" }}
        >
          Prev
        </button>
        <span style={{ paddingRight: "10px", paddingLeft: "10px" }}>
          {currentPage}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPosts.length < postsPerPage}
          style={{ width: "60px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
