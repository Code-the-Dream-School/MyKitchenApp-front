import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function RecipeReviewCard(props) {
  const [favorite, setFavorite] = useState([]);
  const toggleFavorite = () => setFavorite((favorite) => !favorite);

  const updateFavorite = (id) => {
    let updatedFavorite = [...favorite];
    if (!updatedFavorite.includes(id)) {
      updatedFavorite = [...favorite, id];
    } else {
      updatedFavorite = updatedFavorite.filter(
        (favoriteItem) => id !== favoriteItem
      );
    }
    setFavorite(updatedFavorite);
  };

  const handleAddToFavorites = (id) => {
    props.handleAddFavorite((prevFavoriteRecipes) => [
      ...prevFavoriteRecipes,
      id,
    ]);
    // functional setState
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
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            updateFavorite(props.data.id);

            toggleFavorite(props.data.id);
          }}
        >
          {favorite.includes(props.data.id) ? (
            <FavoriteIcon onClick={() => handleAddToFavorites()} />
          ) : (
            <FavoriteBorderIcon onClick={() => handleAddToFavorites()} />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
}
