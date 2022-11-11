import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReusableCard from "../../components/ReusableCard/ReusableCard";

const SearchResult = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [searchedRecipe, setSearchedRecipe] = useState([]);
  const url = "/api/v1/recipes";
  let params = useParams();

  const recipeResult = async (name) => {
    console.log(name);
    const data = await axios.get(`${url}?includeIngredients=${name}`);
    return data;
  };

  useEffect(() => {
    recipeResult(params.search)
      .then((response) => {
        console.log(response.data.results);
        setSearchedRecipe(response.data.results);
      })
      .catch((err) => console.log(err));
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
        {/*These are temporary filter buttons. Later will be improved*/}
        
        <Grid m={2} align="center">
          <Button variant="outlined" color="info" sx={{ margin: 1 }}>
            Vegetarian
          </Button>
          <Button variant="outlined" color="info" sx={{ margin: 1 }}>
            Beef
          </Button>
          <Button variant="outlined" color="info" sx={{ margin: 1 }}>
            Chicken
          </Button>
          <Button variant="outlined" color="info" sx={{ margin: 1 }}>
            Fish
          </Button>
        </Grid>

        <Box>
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
