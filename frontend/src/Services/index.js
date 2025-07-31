import axios from "axios";

const COUNTRY_API_ENDPOINT =
  "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population,area,cca3,currencies";
const WIKIPEDIA_API_ENDPOINT = "https://en.wikipedia.org/w/api.php";

// Get all countries with basic fields
export function getAllCountries() {
  return axios.get(COUNTRY_API_ENDPOINT);
}

//  Get details of a single country by 3-letter code (e.g., 'NOR')
export function getCountryDetails(countryCode) {
  return axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
}

// Get additional Wikipedia extract
export function getCountryAdditionalDetails(countryName) {
  return axios.get(WIKIPEDIA_API_ENDPOINT, {
    params: {
      action: "query",
      format: "json",
      prop: "extracts",
      explaintext: true,
      titles: countryName,
      origin: "*", // required for CORS
    },
  });
}
