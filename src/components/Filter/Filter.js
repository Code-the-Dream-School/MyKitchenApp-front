import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ReusableCard from "../../components/ReusableCard/ReusableCard";
import styled from "styled-components";

const Filter = () => {
  const [filterResult, setfilterResult] = useState([]);
  const url = "/api/v1/recipes";
  let filter = useParams();
  console.log(filter, "filter by cuisine")
  const token = localStorage.getItem("myKitchenAppToken");

  const cuisineType = async () => {
    console.log(filter.search, "we got here");
    console.log(`${url}?includeIngredients=${encodeURIComponent(filter.search)}&cuisine=${filter.type}`);
    try {
    const data = await axios.get(
      `${url}?includeIngredients=${encodeURIComponent(filter.search)}&cuisine=${filter.type}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    if (filter.type) {
      console.log(filter.type);
      cuisineType(filter.type)
        .then((response) => {
          console.log("Response: ", response.data.results);
          setfilterResult(response.data.results);
        })
        .catch((error) => console.log(error));
    }
  }, [filter.type]);

  return (
    <Container>
      <Grid
        sx={{
          margin: "2rem 0rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <StyledLink to={`/searchresult/${filter.search}`}>
          All
        </StyledLink>
        <StyledLink to={`/searchresult/${filter.search}/African`}>
          African
        </StyledLink>
        <StyledLink to={`/searchresult/${filter.search}/American`}>
          American
        </StyledLink>
        <StyledLink to={`/searchresult/${filter.search}/Chinese`}>
          Chinese
        </StyledLink>
        <StyledLink to={`/searchresult/${filter.search}/French`}>
          French
        </StyledLink>
        <StyledLink to={`/searchresult/${filter.search}/Indian`}>
          Indian
        </StyledLink>
        <StyledLink to={`/searchresult/${filter.search}/Italian`}>
          Italian
        </StyledLink>
        <StyledLink to={`/searchresult/${filter.search}/Korean`}>
          Korean
        </StyledLink>
        <StyledLink to={`/searchresult/${filter.search}/Thai`}>
          Thai
        </StyledLink>
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {filterResult.length ? (
          filterResult?.map((item) => {
            return (
              <ReusableCard
                key={item.id}
                title={item.title}
                data={item}
                image={item.image}
              />
            );
          })
        ) : null}
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
