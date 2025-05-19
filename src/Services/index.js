import axios from "axios";

const COUNTRY_API_ENDPOINT = "https://restcountries.com/v2";
const WIKIPEDIA_API_ENDPOINT = "https://en.wikipedia.org/w/api.php";
// const BASE_URL = "https://saurav.tech/NewsAPI/";
export function getAllCountries() {
  return axios.get(`${COUNTRY_API_ENDPOINT}/all`);
}

export function getCountryDetails(countryCode) {
  return axios.get(`${COUNTRY_API_ENDPOINT}/alpha/${countryCode}`);
}

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
