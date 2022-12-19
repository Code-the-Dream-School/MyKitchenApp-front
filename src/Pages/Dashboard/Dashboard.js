import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import SearchForm from "../Search/SearchForm";
import ReusableCard from "../../components/ReusableCard/ReusableCard";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

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
export default function Dashboard() {
  const [breakfast, setBreakfast] = useState([]);
  const [salad, setSalad] = useState([]);
  const [drink, setDrink] = useState([]);
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("myKitchenAppUser"));

  const urlBreakfast = "/api/v1/recipes?sort=random&type=breakfast&number=6";
  const urlSalad = "/api/v1/recipes?sort=random&type=salad&number=6";
  const urlDrink = "/api/v1/recipes?sort=random&type=drink&number=6";

  const token = localStorage.getItem("myKitchenAppToken");
  const errorMessage = "A server error occurred. Please try again later. ";
  const getBreakfast = () => {
    axios
      .get(urlBreakfast, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const breakfastRecipes = response.data.results;
        setBreakfast(breakfastRecipes);
      })
      .catch((e) => setErr(errorMessage));
  };
  const getSalad = () => {
    axios
      .get(urlSalad, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const saladRecipes = response.data.results;
        setSalad(saladRecipes);
      })
      .catch((e) => setErr(errorMessage));
  };
  const getDrink = () => {
    axios
      .get(urlDrink, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const saladRecipes = response.data.results;
        setDrink(saladRecipes);
      })
      .catch((e) => setErr(errorMessage));
  };
  useEffect(() => {
    getBreakfast();
    getSalad();
    getDrink();
  }, [token]);

  const date = new Date();
  const currentTime = date.getHours();

  let greeting;

  if (currentTime >= 0 && currentTime <= 12) {
    greeting = "Good Morning";
  } else if (currentTime > 12 && currentTime <= 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {err ? (
        <h1 className="greet">{err}</h1>
      ) : (
        <>
          <h1 className="greet">
            {greeting} {currentUser.name}!
          </h1>

          <div className="searchContainer">
            <h1>Recommended recipes</h1>
            <StyledButton open={open} onClick={handleClickOpen}>
              <SearchIcon />
              Search new recipe
            </StyledButton>
            <SearchForm open={open} setOpen={setOpen} />
          </div>

          <div className="recipeContainer">
            <div>
              <h2>Breakfast</h2>

              {breakfast || breakfast.length ? (
                <div className="trending">
                  <Splide
                    options={{
                      perPage: 3,
                      gap: "5",
                      drag: true,

                      breakpoints: {
                        900: {
                          perPage: 2,
                        },
                        600: {
                          perPage: 1,
                        },
                      },
                    }}
                  >
                    {breakfast.map((recipe) => {
                      return (
                        <SplideSlide key={recipe.id}>
                          <Link
                            to={"/recipe/" + recipe.id}
                            key={recipe.id}
                            style={{ textDecoration: "none" }}
                          >
                            <ReusableCard
                              key={recipe.id}
                              title={recipe.title}
                              data={recipe}
                              image={recipe.image}
                            />
                          </Link>
                        </SplideSlide>
                      );
                    })}
                  </Splide>
                </div>
              ) : null}
            </div>
            <div>
              <h2>Salad</h2>
              {salad || salad.length ? (
                <div className="trending">
                  <Splide
                    options={{
                      perPage: 3,
                      gap: "5",
                      breakpoints: {
                        900: {
                          perPage: 2,
                        },
                        600: {
                          perPage: 1,
                        },
                      },
                    }}
                  >
                    {salad.map((recipe) => {
                      return (
                        <SplideSlide key={recipe.id}>
                          <Link
                            to={"/recipe/" + recipe.id}
                            key={recipe.id}
                            style={{ textDecoration: "none" }}
                          >
                            <ReusableCard
                              key={recipe.id}
                              title={recipe.title}
                              data={recipe}
                              image={recipe.image}
                            />
                          </Link>
                        </SplideSlide>
                      );
                    })}
                  </Splide>
                </div>
              ) : null}
            </div>
            <div>
              <h2>Drink</h2>
              {drink || drink.length ? (
                <div className="trending">
                  <Splide
                    options={{
                      perPage: 3,
                      gap: "5",
                      breakpoints: {
                        900: {
                          perPage: 2,
                        },
                        600: {
                          perPage: 1,
                        },
                      },
                    }}
                  >
                    {drink.map((recipe) => {
                      return (
                        <SplideSlide key={recipe.id}>
                          <Link
                            to={"/recipe/" + recipe.id}
                            key={recipe.id}
                            style={{ textDecoration: "none" }}
                          >
                            <ReusableCard
                              key={recipe.id}
                              title={recipe.title}
                              data={recipe}
                              image={recipe.image}
                              underline="none"
                            />
                          </Link>
                        </SplideSlide>
                      );
                    })}
                  </Splide>
                </div>
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
}
