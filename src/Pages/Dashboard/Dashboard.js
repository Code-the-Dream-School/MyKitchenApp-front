import React, { useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import ReusableCard from "../../components/ReusableCard/ReusableCard";
import SearchForm from "../Search/SearchForm";

export default function Dashboard() {
  const [breakfast, setBreakfast] = useState([]);
  const [salad, setSalad] = useState([]);
  const [drink, setDrink] = useState([]);

  const urlBreakfast = "/api/v1/recipes?type=breakfast&number=3";
  const urlSalad = "/api/v1/recipes?type=salad&number=3";
  const urlDrink = "/api/v1/recipes?type=drink&number=3";

  const requestBreakfast = axios.get(urlBreakfast);
  const requestSalad = axios.get(urlSalad);
  const requestDrink = axios.get(urlDrink);

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

  return (
    <>
      <h1>Welcome user!</h1>
      <SearchForm />
      <h1>Discover recipes for the day</h1>

      <div>
        <h2>Breakfast</h2>
        {breakfast || breakfast.length ? (
          <div className="trending">
            {breakfast.map((recipe) => {
              return (
                <ReusableCard
                  key={recipe.id}
                  title={recipe.title}
                  data={recipe}
                  image={recipe.image}
                />
              );
            })}
          </div>
        ) : null}
      </div>
      <div>
        <h2>Salad</h2>
        {salad || salad.length ? (
          <div className="trending">
            {salad.map((recipe) => {
              return (
                <ReusableCard
                  key={recipe.id}
                  title={recipe.title}
                  data={recipe}
                  image={recipe.image}
                />
              );
            })}
          </div>
        ) : null}
      </div>
      <div>
        <h2>Drink</h2>
        {drink || drink.length ? (
          <div className="trending">
            {drink.map((recipe) => {
              return (
                <ReusableCard
                  key={recipe.id}
                  title={recipe.title}
                  data={recipe}
                  image={recipe.image}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
}
