import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

export default function CountryCard(props) {
  const { name, capital, population, flagUrl } = props;
  // console.log("CountryCard props:", props);

  return (
    <Card
      sx={{
        width: "100%",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardMedia
        sx={{ height: 140, borderRadius: "2px 2px 0 0" }}
        image={flagUrl}
        alt={name || "Flag"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name || "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {capital || "No Capital"} |{" "}
          {typeof population === "number"
            ? population.toLocaleString()
            : typeof population === "string"
            ? Number(population).toLocaleString()
            : "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
}
CountryCard.propTypes = {
  name: PropTypes.string.isRequired,
  capital: PropTypes.string,
  population: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  flagUrl: PropTypes.string.isRequired,
};
