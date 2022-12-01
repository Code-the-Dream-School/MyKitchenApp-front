import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";
import axios from "axios";
import ReusableCard from "../../components/ReusableCard/ReusableCard";
import Filter from "../../components/Filter/Filter";
import SearchForm from "./SearchForm";
import ReusablePagination from "../../components/Pagination/ReusablePagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const SearchResult = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [searchedRecipe, setSearchedRecipe] = useState([]);
  const [page, setPage] = useState(1);

  const url = "/api/v1/recipes";
  const { search } = useParams();
  const params = useParams();
  console.log("Search name", search);
  const token = localStorage.getItem("myKitchenAppToken");
  const perPage = 6;

  const recipeResult = async (name) => {
    console.log("Searching for:", name);
    try {
      const data = await axios.get(
        `${url}?includeIngredients=${encodeURIComponent(name)}&intolerances=${params.intolerances}&number=18`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search) {
      window.scroll(0, 0);
      recipeResult(search)
        .then((response) => {
          console.log("Response: ", response)
          setSearchedRecipe(response.data.results);
        })
        .catch((error) => console.log(error));
    }
  }, [search]);

  const count = Math.ceil(searchedRecipe.length / perPage);
  console.log("Total recipes", searchedRecipe.length);
  console.log("Recipes per page", count);
  const pageData = ReusablePagination(searchedRecipe, perPage);

  const handleChange = (event, p) => {
    setPage(p);
    pageData.jump(p);
  };

  return (
    <Container>
      <Box>
        <Typography align="center" variant="h2" mt={8}>
          Results for {search}
        </Typography>
        {/* {isLoading ? (
                <img></img>
                <p>Loading...</p>
              ) : (
                <> */}

        <Filter />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >

          {searchedRecipe.length ? (
            pageData.currentData().map((item) => {
              return (
                <ReusableCard
                  key={item.id}
                  title={item.title}
                  data={item}
                  image={item.image}
                />
              );
            })
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h3">No results for {search}!</Typography>
              <Typography variant="h4">Please try another search!</Typography>
              <SearchForm />
            </div>
          )}
        </Box>
        {/* </>
        )} */}
      </Box>
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
              marginBottom: "5rem",
            }}
          />
        </Stack>
        {/* )} */}
      </Box>
    </Container>
  );
};

export default SearchResult;
