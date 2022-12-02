import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImSpoonKnife } from "react-icons/im";
import { HiClock } from "react-icons/hi";
import { ImLeaf } from "react-icons/im";
import { GiMuscleUp, GiCow } from "react-icons/gi";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { CiWheat } from "react-icons/ci";
import { FaCarrot } from "react-icons/fa";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import "./Recipe.css";
import NutritionModal from "../../components/NutritionModal/NutritionModal";
import DOMPurify from "dompurify";
import Loading from "../../components/Loading/Loading";

const Recipe = () => {
  const [data, setData] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [favorite, setFavorite] = useState(true);
  const [isFav, setIsFav] = useState("");
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let params = useParams();
  const url = `/api/v1/recipes/${params.id}`;

  const token = localStorage.getItem("myKitchenAppToken");

  const fetchRecipe = async () => {
    const recipe = await axios.get(url, {
      headers: { Authorization: "Bearer " + token },
    });
    return recipe;
  };

  useEffect(() => {
    setIsLoading(true); // Set loading before sending API request
    fetchRecipe()
      .then((response) => {
        setData(response.data);
        setIngredients(response.data.ingredients);

        setInstructions(response.data.instructions);
        setIsFav(response.data.isFavorite);
        setIsLoading(false); //Hide loading
      })
      .catch((error) => console.log(error));
  }, []);

  const add = async () => {
    const favRecipe = {
      recipeId: data.id,
      userId: "",
      title: data.title,
      image: data.image,
    };

    try {
      const { recipe } = await axios.post("/api/v1/recipes/list/", favRecipe, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setFavorite(favRecipe);
      setIsFav(true);
    } catch (err) {
      setErr(err.message);
    }
  };

  const remove = async () => {
    try {
      const { recipe } = await axios.delete(
        `/api/v1/recipes/${params.id}`,

        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setIsFav(false);
    } catch (err) {
      setErr(err.message);
    }
  };

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(data.summary),
  });
  console.log(data);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="pageWrapper">
          <div className="topContainer">
            <img alt={data.title} src={data.image} />
            <div className="recipeInfo">
              <h1>{data.title}</h1>
              <ul>
                <li>
                  <ImSpoonKnife className="icon" />
                  {data.servings} servings.
                </li>
                <li>
                  <HiClock className="icon" />
                  ready in {data.readyInMinutes} mins.
                </li>
              </ul>
              <div>
                {isFav ? (
                  <Button
                    color="error"
                    type="submit"
                    size="large"
                    onClick={remove}
                  >
                    <FavoriteIcon /> Saved
                  </Button>
                ) : (
                  <Button
                    color="error"
                    type="submit"
                    size="large"
                    onClick={add}
                  >
                    <FavoriteBorderIcon /> Save to favorite
                  </Button>
                )}
                <NutritionModal />
              </div>
            </div>
          </div>

          <ul className="diets">
            <li className="squareVeg" style={{ background: " #33b5e5" }}>
              Health {data.healthScore}%
              <GiMuscleUp />
            </li>
            {data.veryPopular ? (
              <li className="squareVeg" style={{ background: " #ff4444" }}>
                Popular
                <BsFillArrowUpCircleFill />
              </li>
            ) : null}
            {data.glutenFree ? (
              <li className="squareVeg" style={{ background: " #ffbb33" }}>
                Gluten-free
                <CiWheat />
              </li>
            ) : null}
            {data.dairyFree ? (
              <li className="squareVeg" style={{ background: " #ffbb33" }}>
                Diary-free
                <GiCow />
              </li>
            ) : null}
            {data.vegetarian ? (
              <li className="squareVeg" style={{ background: " #99cc00" }}>
                Vegetarian
                <FaCarrot />
              </li>
            ) : null}
            {data.vegan ? (
              <li className="squareVeg" style={{ background: " #99cc00" }}>
                Vegan
                <ImLeaf />
              </li>
            ) : null}
          </ul>

          <div className="ingredientsTable"></div>
          <h2>Ingredients</h2>
          <div className="nutrition">
            <ul>
              {ingredients.map((i) => {
                return (
                  <div className="ingredients" key={i}>
                    <li>{i}</li>
                  </div>
                );
              })}
            </ul>
          </div>
          <h2>Instructions</h2>
          <ul>
            {instructions.map((i) => {
              return (
                <div className="ingredients" key={i}>
                  <li>{i}</li>
                </div>
              );
            })}
          </ul>
          <h2>Summary</h2>
          <Typography dangerouslySetInnerHTML={sanitizedData()}></Typography>
          <h2>Source URL</h2>
          <Link href={data.sourceUrl} target="_blank" underline="none">
            {data.sourceUrl}
          </Link>
        </div>
      )}
    </>
  );
};

export default Recipe;
