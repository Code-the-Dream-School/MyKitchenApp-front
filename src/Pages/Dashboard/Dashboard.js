import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import ReusableCard from "../../components/ReusableCard/ReusableCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import SearchForm from "../Search/SearchForm";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

export default function Dashboard({ currentUser }) {
  const [breakfast, setBreakfast] = useState([]);
  const [salad, setSalad] = useState([]);
  const [drink, setDrink] = useState([]);
  const [open, setOpen] = useState(false);

  const urlBreakfast = "/api/v1/recipes?sort=random&type=breakfast&number=9";
  const urlSalad = "/api/v1/recipes?sort=random&type=salad&number=9";
  const urlDrink = "/api/v1/recipes?sort=random&type=drink&number=9";

  const token = localStorage.getItem("myKitchenAppToken");
  const name = localStorage.getItem("myKitchenAppUser");

  let userName = JSON.parse(name);

  const requestBreakfast = axios.get(urlBreakfast, {
    headers: { Authorization: "Bearer " + token },
  });
  const requestSalad = axios.get(urlSalad, {
    headers: { Authorization: "Bearer " + token },
  });
  const requestDrink = axios.get(urlDrink, {
    headers: { Authorization: "Bearer " + token },
  });

  React.useEffect(() => {
    axios
      .all([requestBreakfast, requestSalad, requestDrink])
      .then(
        axios.spread((...responses) => {
          const responseBreakfast = responses[0];
          const responseSalad = responses[1];
          const responseDrink = responses[2];

          setBreakfast(responseBreakfast.data.results);
          setSalad(responseSalad.data.results);
          setDrink(responseDrink.data.results);
        })
      )

      .catch((error) => console.log(error));
  }, []);
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

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <>
      <h1 className="greet">
        {greeting} {currentUser.name}!
      </h1>
      <div className="searchContainer">
        <h1>Recommended recipes</h1>
        <Button
          onClick={handleClickOpen}
          sx={{
            mt: 3,
            mb: 2,
            mr: 1,
            fontSize: "1rem",
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#5a5a5a",
            },
            "&.Mui-disabled": {
              background: "white",
            },
          }}
        >
          <SearchIcon />
          Search new recipe
        </Button>
        <SearchForm open={open} onClose={handleClose} />
      </div>

      {/* <div>
        <h2>Breakfast</h2>

        {breakfast || breakfast.length ? (
          <div className="trending">
            <Splide
              options={{
                perPage: 4,
                gap: "5",
                drag: true,
              }}
            >
              {breakfast.map((recipe) => {
                return (
                  <SplideSlide key={recipe.id}>
                    <Link to={"/recipe/" + recipe.id} key={recipe.id}>
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
                perPage: 4,
                gap: "5",
              }}
            >
              {salad.map((recipe) => {
                return (
                  <SplideSlide key={recipe.id}>
                    <Link to={"/recipe/" + recipe.id} key={recipe.id}>
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
          <Splide
            options={{
              perPage: 4,
              gap: "5",
            }}
          >
            {drink.map((recipe) => {
              return (
                <SplideSlide key={recipe.id}>
                  <Link to={"/recipe/" + recipe.id} key={recipe.id}>
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
        ) : null}
      </div> */}
    </>
  );
}
