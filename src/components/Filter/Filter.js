import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import ReusableCard from "../../components/ReusableCard/ReusableCard";
import ReusablePagination from "../Pagination/ReusablePagination";
import All from "../../assets/Images/all.png";
import African from "../../assets/Images/african.png";
import American from "../../assets/Images/american.png";
import Chinese from "../../assets/Images/chinese.png";
import European from "../../assets/Images/european.png";
import French from "../../assets/Images/french.png";
import Indian from "../../assets/Images/indian.png";
import Italian from "../../assets/Images/italian.png";
import Korean from "../../assets/Images/korean.png";
import Mexican from "../../assets/Images/mexican.png";
import Thai from "../../assets/Images/thai.png";

const Filter = () => {
  const [filterResult, setfilterResult] = useState([]);
  const [page, setPage] = useState(1);

  const url = "/api/v1/recipes";
  let filter = useParams();
  console.log(filter);
  const token = localStorage.getItem("myKitchenAppToken");
  const perPage = 6;

  const cuisineType = async () => {
    console.log(filter.intolerances, "we got here");
    console.log(
      `${url}?includeIngredients=${encodeURIComponent(
        filter.search
      )}&intolerances=${filter.intolerances}&cuisine=${filter.type}&number=9`
    );
    try {
      const data = await axios.get(
        `${url}?includeIngredients=${encodeURIComponent(
          filter.search
        )}&intolerances=${filter.intolerances}&cuisine=${filter.type}&number=9`,
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

  const count = Math.ceil(filterResult.length / perPage);
  console.log("Total filtered recipes", filterResult.length);
  console.log("Total pages", count);
  const pageData = ReusablePagination(filterResult, perPage);

  const handleChange = (event, p) => {
    setPage(p);
    pageData.jump(p);
  };

  return (
    <Container>
      <Typography
        className="showElement"
        align="center"
        variant="h2"
        mt={9}
        mb={5}
      >
        Search results for {filter.search}
      </Typography>
      <Grid
        sx={{
          margin: "2rem 0rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <StyledFilterBtn>
          <a href={`/searchresult/${filter.search}/${filter.intolerances}`}>
            <StyledImage src={All} alt="All" />
            <StyledCuisineName>All</StyledCuisineName>
          </a>
        </StyledFilterBtn>
        <StyledFilterBtn>
          <a
            href={`/searchresult/${filter.search}/${filter.intolerances}/African`}
          >
            <StyledImage src={African} alt="African" />
            <StyledCuisineName>African</StyledCuisineName>
          </a>
        </StyledFilterBtn>
        <StyledFilterBtn>
          <a
            href={`/searchresult/${filter.search}/${filter.intolerances}/American`}
          >
            <StyledImage src={American} alt="American" />
            <StyledCuisineName>American</StyledCuisineName>
          </a>
        </StyledFilterBtn>
        <StyledFilterBtn>
          <a
            href={`/searchresult/${filter.search}/${filter.intolerances}/Chinese`}
          >
            <StyledImage src={Chinese} alt="Chinese" />
            <StyledCuisineName>Chinese</StyledCuisineName>
          </a>
        </StyledFilterBtn>
        <StyledFilterBtn>
          <a
            href={`/searchresult/${filter.search}/${filter.intolerances}/European`}
          >
            <StyledImage src={European} alt="European" />
            <StyledCuisineName>European</StyledCuisineName>
          </a>
        </StyledFilterBtn>
        <StyledFilterBtn>
          <a
            href={`/searchresult/${filter.search}/${filter.intolerances}/French`}
          >
            <StyledImage src={French} alt="French" />
            <StyledCuisineName>French</StyledCuisineName>
          </a>
        </StyledFilterBtn>
        <StyledFilterBtn>
          <a
            href={`/searchresult/${filter.search}/${filter.intolerances}/Indian`}
          >
            <StyledImage src={Indian} alt="Indian" />
            <StyledCuisineName>Indian</StyledCuisineName>
          </a>
        </StyledFilterBtn>
        <StyledFilterBtn>
          <a
            href={`/searchresult/${filter.search}/${filter.intolerances}/Italian`}
          >
            <StyledImage src={Italian} alt="Italian" />
            <StyledCuisineName>Italian</StyledCuisineName>
          </a>
        </StyledFilterBtn>
        <StyledFilterBtn>
          <a
            href={`/searchresult/${filter.search}/${filter.intolerances}/Korean`}
          >
            <StyledImage src={Korean} alt="Korean" />
            <StyledCuisineName>Korean</StyledCuisineName>
          </a>
        </StyledFilterBtn>
        <StyledFilterBtn>
          <a
            href={`/searchresult/${filter.search}/${filter.intolerances}/Mexican`}
          >
            <StyledImage src={Mexican} alt="Mexican" />
            <StyledCuisineName>Mexican</StyledCuisineName>
          </a>
        </StyledFilterBtn>
        <StyledFilterBtn>
          <a
            href={`/searchresult/${filter.search}/${filter.intolerances}/Thai`}
          >
            <StyledImage src={Thai} alt="Thai" />
            <StyledCuisineName>Thai</StyledCuisineName>
          </a>
        </StyledFilterBtn>
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
          ? pageData.currentData().map((item) => {
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
      {filterResult.length ? (
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
        </Box>
      ) : null}
    </Container>
  );
};

const StyledImage = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 7rem;
  height: 7rem;
  cursor: pointer;
  transform: scale(0.8);
`;

const StyledCuisineName = styled.div`
  margin: auto;
  text-align: center;
  color: black;
`;

const StyledFilterBtn = styled.div`
  &:hover {
    opacity: 0.8;
  }
`;

export default Filter;
