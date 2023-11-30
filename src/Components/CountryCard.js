import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Country_card.css";

export default function CountryCard(props) {
  return (
    <div>
      <Card id="country-card">
        <CardMedia
          sx={{ height: 140 }}
          image={props.flagUrl}
          alt={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.capital} | {props.population}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
