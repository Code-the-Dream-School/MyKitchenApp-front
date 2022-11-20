import React, { useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import ReusableCard from "../../components/ReusableCard/ReusableCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
//import Parse from "parse/dist/parse.min.js";

import SearchForm from "../Search/SearchForm";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [breakfast, setBreakfast] = useState([]);
  const [salad, setSalad] = useState([]);
  const [drink, setDrink] = useState([]);

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
  } else if (currentTime > 12 && currentTime <= 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }
  return (
    <>
      <h1>
        {greeting} {userName.name}!
      </h1>

      <SearchForm />
      <h1>Discover recipes for the day</h1>

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
      {/* <div>
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
