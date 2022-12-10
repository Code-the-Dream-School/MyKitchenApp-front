import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ReusableCard from "../../components/ReusableCard/ReusableCard";
import ReusablePagination from "../Pagination/ReusablePagination";
import Loading from "../Loading/Loading";
import "./Filter.css";
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
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const url = "/api/v1/recipes";
  let filter = useParams();
  const token = localStorage.getItem("myKitchenAppToken");
  const perPage = 6; //number of recipes on each page
  const errorMessage = "A server error occurred.  Please try again later";

  const cuisineType = async () => {
    try {
      const data = await axios.get(
        `${url}?includeIngredients=${encodeURIComponent(
          filter.search
        )}&intolerances=${filter.intolerances}&cuisine=${
          filter.type
        }&number=18`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      console.log("Error", error.message);
      setError(errorMessage);
    }
  };

  useEffect(() => {
    if (filter.type) {
      window.scroll(0, 0);
      cuisineType(filter.type)
        .then((response) => {
          setfilterResult(response.data.results);
        })
        .catch((error) => setError(errorMessage));
    }
  }, [filter.type]);

  const count = Math.ceil(filterResult.length / perPage);
  const pageData = ReusablePagination(filterResult, perPage);

  const handleChange = (event, p) => {
    setPage(p);
    pageData.jump(p);
  };

  return (
    <>
      {error ? (
        <h1 className="errorMsg">{error}</h1>
      ) : (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <Container>
              <h2 className="showElement">
                Search results for {filter.search}
              </h2>
              <Grid
                sx={{
                  margin: "2rem 0rem",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <div className="filterBtn">
                  <a
                    href={`/searchresult/${filter.search}/${filter.intolerances}`}
                  >
                    <img className="cuisineImg" src={All} alt="All" />
                    <div className="cuisineName">All</div>
                  </a>
                </div>
                <div className="filterBtn">
                  <a
                    href={`/searchresult/${filter.search}/${filter.intolerances}/African`}
                  >
                    <img className="cuisineImg" src={African} alt="African" />
                    <div className="cuisineName">African</div>
                  </a>
                </div>
                <div className="filterBtn">
                  <a
                    href={`/searchresult/${filter.search}/${filter.intolerances}/American`}
                  >
                    <img className="cuisineImg" src={American} alt="American" />
                    <div className="cuisineName">American</div>
                  </a>
                </div>
                <div className="filterBtn">
                  <a
                    href={`/searchresult/${filter.search}/${filter.intolerances}/Chinese`}
                  >
                    <img className="cuisineImg" src={Chinese} alt="Chinese" />
                    <div className="cuisineName">Chinese</div>
                  </a>
                </div>
                <div className="filterBtn">
                  <a
                    href={`/searchresult/${filter.search}/${filter.intolerances}/European`}
                  >
                    <img className="cuisineImg" src={European} alt="European" />
                    <div className="cuisineName">European</div>
                  </a>
                </div>
                <div className="filterBtn">
                  <a
                    href={`/searchresult/${filter.search}/${filter.intolerances}/French`}
                  >
                    <img className="cuisineImg" src={French} alt="French" />
                    <div className="cuisineName">French</div>
                  </a>
                </div>
                <div className="filterBtn">
                  <a
                    href={`/searchresult/${filter.search}/${filter.intolerances}/Indian`}
                  >
                    <img className="cuisineImg" src={Indian} alt="Indian" />
                    <div className="cuisineName">Indian</div>
                  </a>
                </div>
                <div className="filterBtn">
                  <a
                    href={`/searchresult/${filter.search}/${filter.intolerances}/Italian`}
                  >
                    <img className="cuisineImg" src={Italian} alt="Italian" />
                    <div className="cuisineName">Italian</div>
                  </a>
                </div>
                <div className="filterBtn">
                  <a
                    href={`/searchresult/${filter.search}/${filter.intolerances}/Korean`}
                  >
                    <img className="cuisineImg" src={Korean} alt="Korean" />
                    <div className="cuisineName">Korean</div>
                  </a>
                </div>
                <div className="filterBtn">
                  <a
                    href={`/searchresult/${filter.search}/${filter.intolerances}/Mexican`}
                  >
                    <img className="cuisineImg" src={Mexican} alt="Mexican" />
                    <div className="cuisineName">Mexican</div>
                  </a>
                </div>
                <div className="filterBtn">
                  <a
                    href={`/searchresult/${filter.search}/${filter.intolerances}/Thai`}
                  >
                    <img className="cuisineImg" src={Thai} alt="Thai" />
                    <div className="cuisineName">Thai</div>
                  </a>
                </div>
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
                        <Link
                          to={"/recipe/" + item.id}
                          key={item.id}
                          style={{ textDecoration: "none" }}
                        >
                          <ReusableCard
                            key={item.id}
                            title={item.title}
                            data={item}
                            image={item.image}
                          />
                        </Link>
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
          )}
        </>
      )}
    </>
  );
};

export default Filter;
