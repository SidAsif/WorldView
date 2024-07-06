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
      exintro: true,
      explaintext: true,
      titles: countryName,
      origin: "*",
    },
  });
}

// export function getTopHeadlines(category, countryCode) {
//   return axios.get(
//     `${BASE_URL}/top-headlines/category/${category}/${countryCode}.json`
//   );
// }

// export function getEverything(sourceId) {
//   return axios.get(`${BASE_URL}/everything/${sourceId}.json`);
// }
