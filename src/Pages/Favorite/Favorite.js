import React, { useState, useEffect } from "react";
import axios from "axios";
import ReusableCard from "../../components/ReusableCard/ReusableCard";
import { Link } from "react-router-dom";
import "./Favorite.css";
import ReusablePagination from "../../components/Pagination/ReusablePagination";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function Favorite({ currentUser, theme }) {
  const [favorites, setFavorites] = useState([]);
  const [err, setErr] = useState(null);
  const [page, setPage] = useState(1);

  const urlFavorites = "/api/v1/recipes/list";
  const perPage = 6; //number of recipes on each page
  const token = localStorage.getItem("myKitchenAppToken");
  const errorMessage = "A server error occurred. Please try again later. ";
  const getFavorites = () => {
    axios
      .get(urlFavorites, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const favoriteRecipes = response.data;
        setFavorites(favoriteRecipes);
      })
      .catch((e) => setErr(errorMessage));
  };

  useEffect(() => {
    getFavorites();
  }, [token]);
  const count = Math.ceil(favorites.length / perPage);
  const pageData = ReusablePagination(favorites, perPage);

  const handleChange = (event, p) => {
    setPage(p);
    pageData.jump(p);
  };
  return (
    <>
      {err ? (
        <h1 className="greet">{err}</h1>
      ) : (
        <>
          <div>
            <h1 className="favoriteHead">Favorite recipes</h1>
          </div>

          {favorites || favorites.length ? (
            <div className="favorites">
              {pageData.currentData().map((recipe) => {
                return (
                  <Link
                    to={"/recipe/" + recipe.recipeId}
                    key={recipe.recipeId}
                    style={{ textDecoration: "none" }}
                  >
                    <ReusableCard
                      key={recipe.recipeId}
                      title={recipe.title}
                      data={recipe}
                      image={recipe.image}
                    />
                  </Link>
                );
              })}
            </div>
          ) : null}

          <Box>
            <Stack spacing={2}>
              <Pagination
                count={count}
                page={page}
                onChange={handleChange}
                showFirstButton
                showLastButton
                variant="outlined"
                shape="rounded"
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  marginTop: "2rem",
                  marginBottom: "15%",
                  "& .MuiPaginationItem-root": {
                    fontSize: "1rem",
                    fontWeight: "800",
                    backgroundColor: "aliceblue",
                  },
                  [theme.breakpoints.down("md")]: {
                    marginBottom: "15rem",
                  },
                  [theme.breakpoints.down("sm")]: {
                    marginBottom: "15rem",
                  },
                }}
              />
            </Stack>
          </Box>
        </>
      )}
    </>
  );
}
