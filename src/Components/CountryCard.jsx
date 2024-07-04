import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function CountryCard(props) {
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
        image={props.flagUrl}
        alt={props.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.capital} | {props.population.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
