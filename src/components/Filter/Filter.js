import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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

const filterData = [
  {
    name: "All",
    img: "/Images/all.png",
  },
  {
    name: "African",
    img: "/Images/african.png",
  },
  {
    name: "American",
    img: "/Images/american.png",
  },
  {
    name: "Chinese",
    img: "/Images/chinese.png",
  },
  {
    name: "European",
    img: "/Images/european.png",
  },
  {
    name: "French",
    img: "/Images/french.png",
  },
  {
    name: "Indian",
    img: "/Images/indian.png",
  },
  {
    name: "Italian",
    img: "/Images/italian.png",
  },
  {
    name: "Korean",
    img: "/Images/korean.png",
  },
  {
    name: "Mexican",
    img: "/Images/mexican.png",
  },
  {
    name: "Thai",
    img: "/Images/thai.png",
  },
];

const Filter = ({setfilterResult, search, params}) => {
  //const [filterResult, setfilterResult] = useState([]);
  // const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState("");

  const url = "/api/v1/recipes";
  let filter = useParams();
  const token = localStorage.getItem("myKitchenAppToken");
  //const perPage = 6; //number of recipes on each page
  const errorMessage = "A server error occurred.  Please try again later";

  useEffect(() => {
const cuisineType = async () => {
    try {
      const data = await axios.get(
        `${url}?includeIngredients=${encodeURIComponent(
          search
        )}&intolerances=${params.intolerances}&cuisine=${
          selected
        }&number=18`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data) {
        setfilterResult(data.data.results)
        //setIsLoading(false);
      }
      //return data;
    } catch (error) {
      console.log("Error", error.message);
      setError(errorMessage);
    }
  };

  cuisineType()
  }, [selected])
  

  // useEffect(() => {
  //   if (filter.type) {
  //     window.scroll(0, 0);
  //     cuisineType(filter.type)
  //       .then((response) => {
  //         setfilterResult(response.data.results);
  //       })
  //       .catch((error) => setError(errorMessage));
  //   }
  // }, [filter.type]);

  // const count = Math.ceil(filterResult.length / perPage);
  // const pageData = ReusablePagination(filterResult, perPage);

  // const handleChange = (event, p) => {
  //   setPage(p);
  //   pageData.jump(p);
  // };

  //let navigate = useNavigate();

  const handleFilter = (name) => {
    // if (name === "All") {
    //   navigate(`/searchresult/${filter.search}/${filter.intolerances}`, { replace: true });
    // } else {
    //   navigate(`/searchresult/${filter.search}/${filter.intolerances}/${name}`, { replace: true }
    //   );
    // }
    setSelected(name);
  };

  // useEffect(() => {
  //   handleFilter();
  // },[])
  
  return (
    <>
      {error ? (
        <h1 className="errorMsg">{error}</h1>
      ) : (
        <>
          {/* {isLoading ? (
            <Loading />
          ) : ( */}
            <Container>
              <h1 className="showElement">
                Search results for {selected}
              </h1>
              <Grid
                sx={{
                  margin: "2rem 0rem",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >

                {filterData.map((item) => (
                  <div
                    className="filterBtn"
                    key={item.name}
                    style={{
                      borderBottom: selected === item.name ? "1px solid" : "",
                    }}
                    onClick={() => {
                      handleFilter(item.name);
                    }}
                  >
                    <img
                      className="cuisineImg"
                      src={item.img}
                      alt={item.name}
                    />
                    <div className="cuisineName">{item.name}</div>
                  </div>
                ))}
              </Grid>

              {/* <Box
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
              </Box> */}
              {/* {filterResult.length ? (
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
                        marginBottom: "12%",
                        "& .MuiPaginationItem-root": {
                          fontSize: "1rem",
                          fontWeight: "800",
                          backgroundColor: "aliceblue",
                        },
                      }}
                    />
                  </Stack>
                </Box>
              ) : null} */}
            </Container>
          {/* )} */}
        </>
      )}
    </>
  );
};

export default Filter;
