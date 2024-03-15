import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCountryDetails } from "../Services/index";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Country.css";
import { Paper, Stack } from "@mui/material";

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
    <Stack justifyContent={"center"} alignItems={"center"}>
      <Typography variant="h4" mt={7}>
        COUNTRY DETAILS
      </Typography>
      <Paper elevation={6} sx={{ mt: 2 }}>
        <Card className="countryDetailsWrapper  " sx={{ maxWidth: 800, mt: 4 }}>
          <CardMedia sx={{ m: 2 }}>
            <img src={detail.flags?.png} alt={detail.name} />
          </CardMedia>
          <CardContent style={{ marginLeft: "20px" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ background: "lightGrey" }}
            >
              Name : {detail.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Capital : {detail.capital}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              style={{ background: "lightGrey" }}
            >
              Region : {detail.region}
            </Typography>
            <Typography gutterBottom variant="h5">
              Area : {detail.area} km<sup>2</sup>
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              style={{ background: "lightGrey" }}
            >
              Population : {detail.population}
            </Typography>
            <Typography gutterBottom variant="h5">
              {" "}
              Currencies :{" "}
              {detail.currencies
                ?.map((currency) => currency.name)
                .join(",")}{" "}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              style={{ background: "lightGrey" }}
            >
              Languages :{" "}
              {detail.languages?.map((language) => language.name).join(",")}{" "}
            </Typography>
            <Typography gutterBottom variant="h5">
              Timezone : {detail.timezones}
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Stack>
  );
}
