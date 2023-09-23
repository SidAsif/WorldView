import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCountryDetails } from "../Services/index";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Country.css";

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
    <Card className="countryDetailsWrapper  " sx={{ maxWidth: 345, mt: 4 }}>
      <CardMedia sx={{ mb: 2 }}>
        <img src={detail.flags?.png} alt={detail.name} />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Name : {detail.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Capital : {detail.capital}
        </Typography>
        <Typography gutterBottom variant="h5">
          Population : {detail.population}
        </Typography>
        <Typography gutterBottom variant="h5">
          {" "}
          Currency :{" "}
          {detail.currencies?.map((currency) => currency.name).join(",")}{" "}
        </Typography>
      </CardContent>
    </Card>
  );
}
