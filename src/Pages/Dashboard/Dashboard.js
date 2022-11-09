import React, { useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import ReusableCard from "../../components/ReusableCard/ReusableCard";
import SearchForm from "../Search/SearchForm";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const url = "/api/v1/recipes";
  //const params = { params: { params: "Dashboard" } };
  const fetchRecipes = async () => {
    const recipes = await axios.get(url);
    console.log(recipes);
    return recipes;
  };

  React.useEffect(() => {
    fetchRecipes()
      .then((response) => {
        console.log(response.data.results);

        setData(response.data.results);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log({ favoriteRecipes });
  return (
    <>
      <h1>Welcome user!</h1>
      <SearchForm />
      <h1>Discover recipes for the day</h1>

      <div>
        Recipes
        {data || data.length ? (
          <div className="trending">
            {data.map((recipe) => {
              return (
                <ReusableCard
                  key={recipe.id}
                  title={recipe.title}
                  recipe={recipe}
                  image={recipe.image}
                  updateFavoriteRecipes={setFavoriteRecipes}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
}
