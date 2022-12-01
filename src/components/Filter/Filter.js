import React, { useState, useEffect } from "react";
import { useParams, NavLink, Link } from "react-router-dom";
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
  console.log(filter)
  const token = localStorage.getItem("myKitchenAppToken");

  const cuisineType = async () => {
    console.log(filter.intolerances, "we got here");
    console.log(`${url}?includeIngredients=${encodeURIComponent(filter.search)}&intolerances=${filter.intolerances}&cuisine=${filter.type}&number=9`);
    try {
    const data = await axios.get(
      `${url}?includeIngredients=${encodeURIComponent(filter.search)}&intolerances=${filter.intolerances}&cuisine=${filter.type}&number=9`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    if (filter.type) {
      window.scroll(0, 0);
      console.log("Cuisine", filter.type);
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
        <StyledLink
          to={`/searchresult/${filter.search}/${filter.intolerances}`}
        >
          All
        </StyledLink>
        <StyledLink
          to={`/searchresult/${filter.search}/${filter.intolerances}/African`}
        >
          African
        </StyledLink>
        <StyledLink
          to={`/searchresult/${filter.search}/${filter.intolerances}/American`}
        >
          American
        </StyledLink>
        <StyledLink
          to={`/searchresult/${filter.search}/${filter.intolerances}/Chinese`}
        >
          Chinese
        </StyledLink>
        <StyledLink
          to={`/searchresult/${filter.search}/${filter.intolerances}/European`}
        >
          European
        </StyledLink>
        <StyledLink
          to={`/searchresult/${filter.search}/${filter.intolerances}/French`}
        >
          French
        </StyledLink>
        <StyledLink
          to={`/searchresult/${filter.search}/${filter.intolerances}/Indian`}
        >
          Indian
        </StyledLink>
        <StyledLink
          to={`/searchresult/${filter.search}/${filter.intolerances}/Italian`}
        >
          Italian
        </StyledLink>
        <StyledLink
          to={`/searchresult/${filter.search}/${filter.intolerances}/Korean`}
        >
          Korean
        </StyledLink>
        <StyledLink
          to={`/searchresult/${filter.search}/${filter.intolerances}/Mexican`}
        >
          Mexican
        </StyledLink>
        <StyledLink
          to={`/searchresult/${filter.search}/${filter.intolerances}/Thai`}
        >
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
        {filterResult.length
          ? filterResult?.map((item) => {
              return (
                <ReusableCard
                  key={item.id}
                  title={item.title}
                  data={item}
                  image={item.image}
                />
              );
            })
          : null}
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
