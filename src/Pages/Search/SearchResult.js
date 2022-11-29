import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";
import axios from "axios";
import ReusableCard from "../../components/ReusableCard/ReusableCard";
import Filter from "../../components/Filter/Filter";

const SearchResult = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [searchedRecipe, setSearchedRecipe] = useState([]);
  const url = "/api/v1/recipes";

  let params = useParams();

  const recipeResult = async (name) => {
    console.log(name);
    const data = await axios.get(`${url}?includeIngredients=${encodeURIComponent(name)}`);
    return data;
  };

  useEffect(() => {
    if(params.search) {
    recipeResult(params.search)
      .then((response) => {
        setSearchedRecipe(response.data.results);
      })
      .catch((err) => console.log(err));
    }
  }, [params.search])

  return (
    <Container>
      <Box>
        <Typography 
          align="center" 
          variant="h2" 
          mt={8}>
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
          {searchedRecipe.map((item) => {
            return (
              <ReusableCard 
              key={item.id}
              title={item.title}
              data={item}
              image={item.image}
              />
            );
          })}          
        </Box>
          {/* </>
        )} */}
      </Box>
    </Container>
  );
};

export default SearchResult;
