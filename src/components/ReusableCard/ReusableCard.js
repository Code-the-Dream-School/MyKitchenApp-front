import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
//import IconButton from "@mui/material/IconButton";
//import FavoriteIcon from "@mui/icons-material/Favorite";
//import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function RecipeReviewCard(props) {
  // const [favorite, setFavorite] = useState([]);
  //const toggleFavorite = () => setFavorite((favorite) => !favorite);
  const handleAddToFavorites = (recipe) => {
    props.updateFavoriteRecipes((prevFavoriteRecipes) => [
      ...prevFavoriteRecipes,
      recipe,
    ]);
    // functional setState
  };
  const handleRemoveFromFavorites = (recipe) => {
    console.log(props.updateFavoriteRecipes);
    // remove the recipe from  existing favorites array and update favoriteRecipes state
    props.updateFavoriteRecipes((prevFavoriteRecipes) =>
      prevFavoriteRecipes.filter(
        (favoriteRecipe) => favoriteRecipe.title !== recipe.title
      )
    );
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        minWidth: 345,
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}
    >
      <CardHeader title={props.title} />
      <CardMedia
        component="img"
        height="194"
        image={props.image}
        alt={`Recipe img for ${props.title}`}
      />

      <CardActions disableSpacing>
        {props.favorite ? (
          <button onClick={() => handleRemoveFromFavorites(props.title)}>
            Remove from favorites
          </button>
        ) : (
          <button onClick={() => handleAddToFavorites(props.title)}>
            Add to favorites
          </button>
        )}
      </CardActions>
    </Card>
  );
}
