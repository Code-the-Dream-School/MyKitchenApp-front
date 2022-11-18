import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReusableCard from "../../components/ReusableCard/ReusableCard";
import Filter from "../../components/Filter/Filter";
import SearchForm from "./SearchForm";

const SearchResult = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [searchedRecipe, setSearchedRecipe] = useState([]);
  const url = "/api/v1/recipes";
  const { search } = useParams();
  console.log(search, "Search name");

  const token = localStorage.getItem("myKitchenAppToken");
  console.log(token, "TOKEN");

  const recipeResult = async (name) => {
    console.log("Search Term ", name);
    try {
      const data = await axios.get(
        `${url}?includeIngredients=${encodeURIComponent(name)}`,
        {
          headers: {
            Authorization: "Bearer" + token,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search) {
      recipeResult(search)
        .then((res) => {
          console.log("RES", res);
          setSearchedRecipe(res.data.results);
        })
        .catch((err) => console.log(err));
    }
  }, [search]);

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
          {searchedRecipe?.map((item) => {
            return (
              <ReusableCard
                key={item.id}
                title={item.title}
                data={item}
                image={item.image}
              />
            );
          })}
          {!searchedRecipe.length && (
            <div style={{display: "flex",  alignItems: "center",  flexDirection: 'column'}} >
            <Typography variant="h2">
              OOPS! No Results try again!
            </Typography>
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
