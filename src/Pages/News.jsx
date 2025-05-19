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
  Pagination,
} from "@mui/material";

const CATEGORIES = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];
const ARTICLES_PER_PAGE = 15;
export default function News() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);

    axios
      .get(`\netlify\functions\newsProxy.js?q=${category}`)
      .then((response) => {
        setNews(response.data.articles);
        setLoading(false);
        setCurrentPage(1); // Reset to first page when category changes
      })
      .catch((error) => {
        console.error("Error fetching the news data:", error);
        setLoading(false);
      });
  }, [category]);

  const totalPages = Math.ceil(news.length / ARTICLES_PER_PAGE);
  const paginatedNews = news.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  return (
    <Box sx={{ pt: 12, mt: 3, pr: 3, pl: 3, pb: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setCategory(searchTerm.trim() || "general");
            }
          }}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
      </Box>

      {/* Category Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
          overflowX: "auto",
          flexWrap: "nowrap",
          px: 1,
        }}
      >
        <ButtonGroup
          sx={{
            backgroundColor: "#008080",
            "& .MuiButton-root": {
              color: "#fff",
              whiteSpace: "nowrap",
              "&:hover": { backgroundColor: "#004d4d" },
            },
            "& .MuiButton-contained": {
              backgroundColor: "#004d4d",
              "&:hover": { backgroundColor: "#004d4d" },
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

      {/* News Cards */}
      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(9)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <Skeleton variant="rectangular" height={180} />
                  <CardContent>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : paginatedNews.map((article, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    elevation={3}
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: 6,
                      },
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={
                        article.urlToImage || "https://via.placeholder.com/180"
                      }
                      alt={article.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          fontWeight: "bold",
                          color: "#333",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {article.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          mb: 1,
                        }}
                      >
                        {article.description}
                      </Typography>
                      <Button
                        size="small"
                        sx={{ mt: "auto", color: "#008080" }}
                      >
                        Read more →
                      </Button>
                    </CardContent>
                  </Card>
                </a>
              </Grid>
            ))}
      </Grid>

      {/* Pagination Controls */}
      {!loading && news.length > ARTICLES_PER_PAGE && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            padding: 2,
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            siblingCount={1}
            boundaryCount={1}
            shape="rounded"
            sx={{
              "& .Mui-selected": {
                backgroundColor: "#008080 !important",
                color: "white !important",
              },
              "& .Mui-selected:hover": {
                backgroundColor: "#218080 !important",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
