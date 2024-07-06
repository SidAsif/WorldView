import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  ButtonGroup,
  Skeleton,
} from "@mui/material";

const BASE_URL = "https://saurav.tech/NewsAPI/";
const CATEGORIES = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

export default function News() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const TOP_HEADLINES_API = `${BASE_URL}top-headlines/category/${category}/in.json`;

    setLoading(true);
    axios
      .get(TOP_HEADLINES_API)
      .then((response) => {
        setNews(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the news data:", error);
        setLoading(false);
      });
  }, [category]);

  return (
    <Box sx={{ pt: 12, mt: 3, pr: 3, pl: 3, pb: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
          "@media (max-width: 600px)": {
            display: "none",
          },
        }}
      >
        <ButtonGroup
          sx={{
            backgroundColor: "#008080",
            "& .MuiButton-root": {
              color: "#fff",
              "&:hover": {
                backgroundColor: "#004d4d",
              },
            },
            "& .MuiButton-contained": {
              backgroundColor: "#004d4d",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#004d4d",
              },
            },
          }}
        >
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={cat === category ? "contained" : "outlined"}
              onClick={() => setCategory(cat)}
              sx={{ margin: "0 1px" }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(9)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <Skeleton variant="rectangular" height={140} />
                  <CardContent>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : news.map((article, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={article.title}
                    height="140"
                    image={
                      article.urlToImage || "https://via.placeholder.com/140"
                    }
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
}
