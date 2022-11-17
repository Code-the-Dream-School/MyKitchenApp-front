import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImSpoonKnife } from "react-icons/im";
import { HiClock } from "react-icons/hi";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
//import Typography from "@mui/material/Typography";
//import Link from "@mui/material/Link";
import "./Recipe.css";
import NutritionModal from "../../components/NutritionModal/NutritionModal";

const Recipe = () => {
  const [data, setData] = useState("");
  // const [ingredients, setIngredients] = useState([]);
  // const [instructions, setInstructions] = useState([]);
  //const [isSaved, setIsSaved] = useState(false);
  const [favoriteList, setFavoriteList] = useState();
  const [err, setErr] = useState("");
  let params = useParams();
  const url = `/api/v1/recipes/${params.id}`;
  const token = localStorage.getItem("myKitchenAppToken");
  //console.log(token, "Token here....");
  const fetchRecipe = async () => {
    const recipe = await axios.get(url, {
      headers: { Authorization: "Bearer " + token },
    });
    return recipe;
  };

  useEffect(() => {
    fetchRecipe()
      .then((response) => {
        setData(response.data);
        //setIngredients(response.data.ingredients);
        //setInstructions(response.data.instructions);
        //console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const add = async () => {
    const favRecipe = {
      recipeId: data.id,
      userId: "",
      title: data.title,
    };
    try {
      const { recipe } = await axios.post("/api/v1/recipes/list", favRecipe, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      setFavoriteList(favRecipe);
    } catch (err) {
      setErr(err.message);
    }
  };

  console.log(favoriteList);

  const label = { inputProps: { "aria-label": "Checkbox" } };

  return (
    <>
      <div className="pageWrapper">
        <div className="topContainer">
          <img alt={data.title} src={data.image} />
          <div className="recipeInfo">
            <h1>{data.title}</h1>
            <ul>
              <li>
                <ImSpoonKnife className="icon" />
                {data.servings} servings
              </li>
              <li>
                <HiClock className="icon" />
                {data.readyInMinutes} mins
              </li>
            </ul>
            <div>
              <Checkbox
                {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite color="error" />}
              />
              <button onClick={add}>Make request</button>
              {/* <Button variant="contained" >
                {isSaved ? (
                  <>
                    <FaHeartBroken /> Remove
                  </>
                ) : (
                  <>
                    <FaHeart /> Favorite this
                  </>
                )}
              </Button> */}
              <NutritionModal />
            </div>
          </div>
        </div>
        {/* <div className="ingredientsTable"></div>
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
        </Link> */}
      </div>
    </>
  );
};

export default Recipe;
