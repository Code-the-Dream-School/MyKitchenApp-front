import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";
import ReusableCard from "../../components/ReusableCard/ReusableCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import SearchForm from "../Search/SearchForm";
import { Link } from "react-router-dom";

export default function Dashboard({ currentUser }) {
  const [breakfast, setBreakfast] = useState([]);
  const [salad, setSalad] = useState([]);
  const [drink, setDrink] = useState([]);

  const urlBreakfast = "/api/v1/recipes?sort=random&type=breakfast&number=6";
  const urlSalad = "/api/v1/recipes?sort=random&type=salad&number=6";
  const urlDrink = "/api/v1/recipes?sort=random&type=drink&number=6";

  const token = localStorage.getItem("myKitchenAppToken");

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
      });
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
      });
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
      });
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
  return (
    <>
      <h1 className="greet">
        {greeting} {currentUser.name}!
      </h1>
      <div className="searchContainer">
        <h1>Recommended recipes</h1>
        <SearchForm />
      </div>
      <div>
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
      </div>
    </>
  );
}
