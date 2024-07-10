import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCountryDetails,
  getCountryAdditionalDetails,
} from "../Services/index";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Stack, Grid, Divider, Box } from "@mui/material";

export default function CountryDetails(props) {
  const { countryCode } = useParams();
  const [detail, setDetail] = useState({});
  const [additionalDetails, setAdditionalDetails] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const countryDetailResponse = await getCountryDetails(countryCode);
        setDetail(countryDetailResponse.data);

        const countryName = countryDetailResponse.data.name;
        const additionalDetailsResponse = await getCountryAdditionalDetails(
          countryName
        );
        const pageKey = Object.keys(
          additionalDetailsResponse.data.query.pages
        )[0];
        setAdditionalDetails(
          additionalDetailsResponse.data.query.pages[pageKey].extract
        );
      } catch (error) {
        console.error("Error fetching country details:", error);
      }
    }

    fetchData();
  }, [countryCode]);
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ mt: 10, mb: 2, padding: 2 }}
    >
      <Typography
        variant="h3"
        mt={7}
        sx={{ textTransform: "uppercase", fontWeight: "bold" }}
      >
        {detail.name}
      </Typography>
      <Typography variant="subtitle1" mt={1} sx={{ color: "text.secondary" }}>
        Country Overview
      </Typography>
      <Box sx={{ mt: 2, padding: { md: 2, sm: 0 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card className="countryDetailsWrapper">
              <CardMedia sx={{ m: 2 }}>
                <img
                  src={detail.flags?.png}
                  alt={detail.name}
                  style={{
                    width: "100%",
                    height: "356px",
                    borderRadius: "2px",
                  }}
                />
              </CardMedia>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{ background: "lightGrey", padding: "5px" }}
                >
                  Name: {detail.name || "N/A"}
                </Typography>
                <Typography gutterBottom variant="h5">
                  Capital: {detail.capital || "N/A"}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{ background: "lightGrey", padding: "5px" }}
                >
                  Region: {detail.region || "N/A"}
                </Typography>
                <Typography gutterBottom variant="h5">
                  Area: {detail.area?.toLocaleString() ?? "N/A"} km<sup>2</sup>
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{ background: "lightGrey", padding: "5px" }}
                >
                  Population: {detail.population?.toLocaleString() ?? "N/A"}
                </Typography>
                <Typography gutterBottom variant="h5">
                  Currencies:{" "}
                  {detail.currencies
                    ?.map((currency) => currency.name)
                    .join(", ") ?? "N/A"}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{ background: "lightGrey", padding: "5px" }}
                >
                  Languages:{" "}
                  {detail.languages
                    ?.map((language) => language.name)
                    .join(", ") ?? "N/A"}
                </Typography>
                <Typography gutterBottom variant="h5">
                  Timezones: {detail.timezones?.join(", ") ?? "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <CardContent>
              <Typography variant="h5" sx={{ mt: 2 }}>
                History
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="body1"
                paragraph
                sx={{ textAlign: "justify" }}
              >
                {additionalDetails || "No data Available"}
              </Typography>
              <Typography variant="h5" sx={{ mt: 2 }}>
                Economy
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1" paragraph></Typography>
              <Typography variant="h5" sx={{ mt: 2 }}>
                Geography
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1" paragraph></Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
