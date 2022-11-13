import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { ImSpoonKnife } from "react-icons/im";
import { HiClock } from "react-icons/hi";

const Recipe = () => {
  const [data, setData] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  let params = useParams();
  const url = `/api/v1/recipes/${params.id}`;

  const fetchRecipe = async () => {
    const recipes = await axios.get(url);
    return recipes;
  };

  useEffect(() => {
    fetchRecipe()
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setIngredients(response.data.ingredients);
        setInstructions(response.data.instructions);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="pageWrapper">
        <div className="topContainer">
          <img alt={data.title} src={data.image} />
          <div className="recipeInfo">
            <h1>{data.title}</h1>
            <ul>
              <li>
                <ImSpoonKnife />
                {data.servings} servings
              </li>
              <li>
                <HiClock />
                {data.readyInMinutes} mins
              </li>
            </ul>
          </div>
        </div>
        <div className="ingredientsTable"></div>

        <h2>Ingredients</h2>
        <ul>
          {ingredients.map((i) => {
            return <li key={i}>{i}</li>;
          })}
        </ul>
        <h2>Instructions</h2>
        <ul>
          {instructions.map((i) => {
            return <li key={i}>{i}</li>;
          })}
        </ul>
        <h2>Summary</h2>
        <Typography>{data.summary}</Typography>

        <h2>Source URL</h2>
        <Link href={data.sourceUrl} underline="none">
          {data.sourceUrl}
        </Link>
      </div>
    </>
  );
};

export default Recipe;
