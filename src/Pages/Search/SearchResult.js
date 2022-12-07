import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ReusableCard from "../../components/ReusableCard/ReusableCard";
import Filter from "../../components/Filter/Filter";
import SearchForm from "./SearchForm";
import ReusablePagination from "../../components/Pagination/ReusablePagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

const SearchResult = () => {
  const [searchedRecipe, setSearchedRecipe] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const url = "/api/v1/recipes";
  const { search } = useParams();
  const params = useParams();
  console.log("Search name", search);
  const token = localStorage.getItem("myKitchenAppToken");
  const perPage = 6; //number of recipes on each page
  const errorMessage = "A server error occurred.  Please try again later";

  const recipeResult = async (name) => {
    console.log("Searching for:", name);
    try {
      const data = await axios.get(
        `${url}?includeIngredients=${encodeURIComponent(name)}&intolerances=${params.intolerances}&number=18`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      // console.log(`An error occured ${error}`);
      setError(errorMessage)
    }
  };

  useEffect(() => {
    if (search) {
      window.scroll(0, 0);
      recipeResult(search)
        .then((response) => {
          // console.log("Response: ", response);
          setSearchedRecipe(response.data.results);
        })
        .catch((error) => setError(errorMessage));
    }
  }, [search]);

  const count = Math.ceil(searchedRecipe.length / perPage);
  const pageData = ReusablePagination(searchedRecipe, perPage);

  const handleChange = (event, p) => {
    setPage(p);
    pageData.jump(p);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen();
  };

  return (
    <>
      {error ? (
        <StyledError>{error}</StyledError>
      ) : (
        <Container className="background">
          <Box>
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
                    <Link to={"/recipe/" + item.id} key={item.id}>
                      <ReusableCard
                        key={item.id}
                        title={item.title}
                        data={item}
                        image={item.image}
                      />
                    </Link>
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
                  <Typography variant="h4">
                    Please try another search!
                  </Typography>
                  <StyledButton open={open} onClick={handleClickOpen}>
                    <SearchIcon />
                    Search new recipe
                  </StyledButton>
                  <SearchForm open={open} onClose={handleClose} />
                </div>
              )}
            </Box>
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
          </Box>
        </Container>
      )}
    </>
  );
};

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5%;
  text-decoration: none;
  background: linear-gradient(35deg, #f6d365 0%, #fda085 51%, #f6d365 100%);
  background-position: right center;
  padding: 20px;
  text-transform: uppercase;
  width: 10rem;
  height: 5rem;
  cursor: pointer;
  transform: scale(0.8);
  color: black;
  font-size: 1rem;
  box-shadow: 4px 4px 3px #446930, 1px 1px 0 #223716;

  &:active {
    box-shadow: 1px 1px 0 black, 1px 1px 0 black;
  }
`;

const StyledError = styled.h1`
  text-align: center;
  margin-top: 20rem;
`

export default SearchResult;
