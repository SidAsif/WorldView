import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCountryDetails } from "../Services/index";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Paper, Stack, Grid } from "@mui/material";
// import "./Country.css";
export default function CountryDetails(props) {
  const { countryCode } = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    getCountryDetails(countryCode).then((result) => {
      console.log(result.data);
      setDetail(result.data);
    });
  }, [countryCode]);
  console.log("CountryCode: ", countryCode);

  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ mt: 10, mb: 2 }}
    >
      <Typography variant="h4" mt={7} sx={{ textTransform: "uppercase" }}>
        about {detail.name}
      </Typography>
      <Paper sx={{ mt: 2, maxWidth: 1000 }}>
        <Card className="countryDetailsWrapper">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent style={{ marginLeft: "20px" }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ background: "lightGrey", padding: "5px" }}
                >
                  Name: {detail.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Capital: {detail.capital}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{ background: "lightGrey", padding: "5px" }}
                >
                  Region: {detail.region}
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
            </Grid>
          </Grid>
        </Card>
      </Paper>
    </Stack>
  );
}
