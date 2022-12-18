import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
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

const Filter = ({ setFilteredResults, search, params, selectedFilterTerm,  setSelectedFilterTerm }) => {
  const [error, setError] = useState(false);

  const url = "/api/v1/recipes";
  const token = localStorage.getItem("myKitchenAppToken");
  const errorMessage = "A server error occurred.  Please try again later";

  useEffect(() => {
    const cuisineType = async () => {
      try {
        const data = await axios.get(
          `${url}?includeIngredients=${encodeURIComponent(
            search
          )}&intolerances=${params.intolerances}&cuisine=${selectedFilterTerm}&number=18`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (data) {
          setFilteredResults(data.data.results);
        }
      } catch (error) {
        console.log("Error", error.message);
        setError(errorMessage);
      }
    };
    cuisineType();
  }, [selectedFilterTerm]);

  const handleFilter = (name) => {
    setSelectedFilterTerm(name);
  };

  return (
    <>
      {error ? (
        <h1 className="errorMsg">{error}</h1>
      ) : (
        <>
          <Container>
            <h1 className="showElement">Search results for {selectedFilterTerm}</h1>
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
                    borderBottom: selectedFilterTerm === item.name ? "1px solid" : "",
                  }}
                  onClick={() => {
                    handleFilter(item.name);
                  }}
                >
                  <img className="cuisineImg" src={item.img} alt={item.name} />
                  <div className="cuisineName">{item.name}</div>
                </div>
              ))}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default Filter;
