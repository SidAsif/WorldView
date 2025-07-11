import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCountryDetails,
  getCountryAdditionalDetails,
} from "../Services/index";
import PropTypes from "prop-types";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Tabs,
  Tab,
  Divider,
  useTheme,
} from "@mui/material";
function splitSections(text) {
  const lowerText = text.toLowerCase();

  const economyIndex = lowerText.indexOf("economy");
  const geographyIndex = lowerText.indexOf("geography");

  const history = economyIndex !== -1 ? text.slice(0, economyIndex) : text;

  const economy =
    economyIndex !== -1 && geographyIndex !== -1
      ? text.slice(economyIndex, geographyIndex)
      : economyIndex !== -1
      ? text.slice(economyIndex)
      : "";

  const geography = geographyIndex !== -1 ? text.slice(geographyIndex) : "";

  return { history, economy, geography };
}

export default function CountryDetails() {
  const theme = useTheme();
  const { countryCode } = useParams();
  const [detail, setDetail] = useState(null);
  const [sections, setSections] = useState({
    history: "",
    economy: "",
    geography: "",
  });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const countryDetailResponse = await getCountryDetails(countryCode);
        const country = countryDetailResponse.data;
        const selectedCountry = Array.isArray(country) ? country[0] : country;
        setDetail(selectedCountry);

        const countryName = selectedCountry?.name?.common;
        const wikiRes = await getCountryAdditionalDetails(countryName);
        // console.log("Wiki response:", JSON.stringify(wikiRes.data, null, 2));

        const pageData = wikiRes?.data?.query?.pages;

        if (!pageData || Object.keys(pageData).length === 0) {
          console.warn("Wikipedia page not found for:", countryName);
          setSections({
            history: "No Wikipedia data available.",
            economy: "",
            geography: "",
          });
          return;
        }

        const extract =
          pageData[Object.keys(pageData)[0]].extract || "No info found.";
        const parsed = splitSections(extract);
        setSections(parsed);
      } catch (err) {
        console.error("Error fetching data:", err);
        setSections({
          history: "Failed to load additional data.",
          economy: "",
          geography: "",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [countryCode]);

  const handleTabChange = (e, newValue) => setTab(newValue);

  return (
    <Box sx={{ mt: 10, px: { xs: 2, sm: 4 } }}>
      {loading ? (
        <Skeleton variant="text" height={60} width={300} sx={{ mx: "auto" }} />
      ) : (
        <Typography
          variant="h3"
          align="center"
          sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
            mb: 4,
            letterSpacing: 2,
            color: theme.palette.primary.main,
          }}
        >
          {detail?.name?.common ?? "No Name"}
        </Typography>
      )}

      <Grid container spacing={4}>
        {/* Left Card */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={6}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={300} />
            ) : (
              <CardMedia
                component="img"
                height="300"
                image={detail?.flags?.png}
                alt={
                  detail?.flags?.alt || detail?.name?.common || "Country Flag"
                }
                sx={{
                  objectFit: "cover",
                  filter: "brightness(0.95)",
                  transition: "0.3s",
                }}
              />
            )}
            <CardContent>
              {loading ? (
                <Skeleton height={200} />
              ) : (
                <>
                  <InfoItem
                    label="Capital"
                    value={detail?.capital?.join(", ") ?? "N/A"}
                  />
                  <InfoItem label="Region" value={detail?.region ?? "N/A"} />
                  <InfoItem
                    label="Area"
                    value={
                      detail?.area
                        ? `${detail.area.toLocaleString()} km²`
                        : "N/A"
                    }
                  />
                  <InfoItem
                    label="Population"
                    value={
                      detail?.population
                        ? detail.population.toLocaleString()
                        : "N/A"
                    }
                  />
                  <InfoItem
                    label="Currencies"
                    value={
                      detail?.currencies
                        ? Object.values(detail.currencies)
                            .map((c) => c.name)
                            .join(", ")
                        : "N/A"
                    }
                  />
                  <InfoItem
                    label="Languages"
                    value={
                      detail?.languages
                        ? Object.values(detail.languages).join(", ")
                        : "N/A"
                    }
                  />
                  <InfoItem
                    label="Timezones"
                    value={detail?.timezones?.join(", ") ?? "N/A"}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Right Card with Tabs */}
        <Grid item xs={12} md={8} sx={{ paddingBottom: 4 }}>
          <Card elevation={6} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              centered
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              sx={{ backgroundColor: theme.palette.grey[100] }}
            >
              <Tab label="History" />
              <Tab label="Economy" />
              <Tab label="Geography" />
            </Tabs>

            <Divider />
            <CardContent>
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={300} />
              ) : (
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    textAlign: "justify",
                    whiteSpace: "pre-line",
                    fontSize: "1rem",
                    lineHeight: 1.8,
                    color: theme.palette.text.secondary,
                  }}
                >
                  {tab === 0 && sections.history}
                  {tab === 1 && sections.economy}
                  {tab === 2 && sections.geography}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

// Reusable info row component
const InfoItem = ({ label, value }) => (
  <Typography
    variant="subtitle1"
    sx={{
      mb: 1,
      color: "text.primary",
      "& span.label": {
        fontWeight: "bold",
        color: "primary.main",
      },
    }}
  >
    <span className="label">{label}:</span>{" "}
    <span>
      {typeof value === "string" || typeof value === "number" ? value : "N/A"}
    </span>
  </Typography>
);

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node,
};
