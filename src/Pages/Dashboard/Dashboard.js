import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import ReusableCard from "../../components/ReusableCard/ReusableCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import SearchForm from "../Search/SearchForm";

export default function Dashboard({ currentUser }) {
  const [breakfast, setBreakfast] = useState([]);
  const [salad, setSalad] = useState([]);
  const [drink, setDrink] = useState([]);

  const urlBreakfast = "/api/v1/recipes?sort=random&type=breakfast&number=9";
  const urlSalad = "/api/v1/recipes?sort=random&type=salad&number=9";
  const urlDrink = "/api/v1/recipes?sort=random&type=drink&number=9";

  const token = localStorage.getItem("myKitchenAppToken");

  const requestBreakfast = async () => {
    await axios.get(urlBreakfast, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const requestSalad = async () => {
    axios.get(urlSalad, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const requestDrink = async () => {
    axios.get(urlDrink, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // useEffect(() => {
  //   axios
  //     .all([requestBreakfast, requestSalad, requestDrink])
  //     .then(
  //       axios.spread((...responses) => {
  //         const responseBreakfast = responses[0];
  //         const responseSalad = responses[1];
  //         const responseDrink = responses[2];

  //         setBreakfast(responseBreakfast.data.results);
  //         setSalad(responseSalad.data.results);
  //         setDrink(responseDrink.data.results);
  //       })
  //     )
  //     .catch((error) => console.log(error));
  // }, []);

  useEffect(() => {
    try {
      const responseBreakfast = requestBreakfast();
      const responseSalad = requestSalad();
      const responseDrink = requestDrink();
      if ((responseBreakfast.data, responseSalad.data, responseDrink.data)) {
        setBreakfast(responseBreakfast?.data.results);
        setSalad(responseSalad?.data.results);
        setDrink(responseDrink?.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  return (
    <>
      <h1>Welcome {currentUser.name}!</h1>

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
                    <ReusableCard
                      key={recipe.id}
                      title={recipe.title}
                      data={recipe}
                      image={recipe.image}
                    />
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
                    <ReusableCard
                      key={recipe.id}
                      title={recipe.title}
                      data={recipe}
                      image={recipe.image}
                    />
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
                  <ReusableCard
                    key={recipe.id}
                    title={recipe.title}
                    data={recipe}
                    image={recipe.image}
                  />
                </SplideSlide>
              );
            })}
          </Splide>
        ) : null}
      </div>
    </>
  );
}
