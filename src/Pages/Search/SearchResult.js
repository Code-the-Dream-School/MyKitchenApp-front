import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";
import axios from "axios";
import ReusableCard from "../../components/ReusableCard/ReusableCard";
import Filter from "../../components/Filter/Filter";
import SearchForm from "./SearchForm";

const SearchResult = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [searchedRecipe, setSearchedRecipe] = useState([]);
  const url = "/api/v1/recipes";
  const params = useParams();
  console.log(params, "Search name");
  const token = localStorage.getItem("myKitchenAppToken");

  const recipeResult = async () => {
    console.log("Searching for:", params.search);
    try {
      const data = await axios.get(
        `${url}?includeIngredients=${encodeURIComponent(params.search)}&intolerances=${params.intolerances}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.search ) {
      recipeResult(params.search)
        .then((response) => {
          console.log("Response: ", response)
          setSearchedRecipe(response.data.results);
        })
        .catch((error) => console.log(error));
    }
  }, [params.search]);

  return (
    <Container>
      <Box>
        <Typography align="center" variant="h2" mt={8}>
          Results
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
            searchedRecipe?.map((item) => {
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
              <Typography variant="h3">No results for {params.search}!</Typography>
              <Typography variant="h4">Please try another search!</Typography>
              <SearchForm />
            </div>
          )}
        </Box>
        {/* </>
        )} */}
      </Box>
    </Container>
  );
};

export default SearchResult;
