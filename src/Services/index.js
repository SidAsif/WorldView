import axios from "axios";

const COUNTRY_API_ENDPOINT = "https://restcountries.com/v2";
const WIKIPEDIA_API_ENDPOINT = "https://en.wikipedia.org/w/api.php";
const NEWS_API_ENDPOINT = "https://newsapi.org/v2";
const NEWS_API_KEY = "d27c5da8cd694545a29e751a7297e194";

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
      exintro: true,
      explaintext: true,
      titles: countryName,
      origin: "*",
    },
  });
}

export function getTopHeadlines(country) {
  return axios.get(`${NEWS_API_ENDPOINT}/top-headlines`, {
    params: {
      apiKey: NEWS_API_KEY,
      country: country,
    },
  });
}

export function getEverything(query) {
  return axios.get(`${NEWS_API_ENDPOINT}/everything`, {
    params: {
      apiKey: NEWS_API_KEY,
      q: query,
    },
  });
}

export function getSources() {
  return axios.get(`${NEWS_API_ENDPOINT}/sources`, {
    params: {
      apiKey: NEWS_API_KEY,
    },
  });
}
