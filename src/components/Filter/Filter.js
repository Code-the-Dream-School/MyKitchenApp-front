import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ReusableCard from "../../components/ReusableCard/ReusableCard";
import styled from "styled-components";

const Filter = () => {
  const [cuisine, setCuisine] = useState([]);
  const url = "/api/v1/recipes";

  let params = useParams();

  const cuisineType = async () => {
    console.log(params.search, "we got here");
    console.log(`${url}?includeIngredients=${encodeURIComponent(params.search)}&cuisine=${params.type}`);
    const data = await axios.get(`${url}?includeIngredients=${encodeURIComponent(params.search)}&cuisine=${params.type}`);
    return data;
  };

  useEffect(() => {

    if (params.type) {
        console.log(params.type);
      cuisineType(params.type)
        .then((response) => {
          console.log(response.data.results);
          setCuisine(response.data.results);
        })
        .catch((err) => console.log(err));
    }
  }, [params.type]);

  return (
    <Container>
      <Grid
        sx={{
          margin: "2rem 0rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <StyledLink to={`/searchresult/${params.search}/African`}>African</StyledLink>
        <StyledLink to={`/searchresult/${params.search}/American`}>American</StyledLink>
        <StyledLink to={`/searchresult/${params.search}/Chinese`}>Chinese</StyledLink>
        <StyledLink to={`/searchresult/${params.search}/European`}>European</StyledLink>
        <StyledLink to={`/searchresult/${params.search}/Indian`}>Indian</StyledLink>
      </Grid>
      <Box>
        {cuisine.map((item) => {
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
    </Container>
  );
};

const StyledLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-decoration: none;
  background: linear-gradient(35deg, #848484, #313131);
  width: 5rem;
  height: 5rem;
  cursor: pointer;
  transform: scale(0.8);
  color: white;
  font-size: 1rem;

  &.active {
    background: linear-gradient(to right, #e6e926, #e98e26);
    color: grey;
  }
`;

export default Filter;
