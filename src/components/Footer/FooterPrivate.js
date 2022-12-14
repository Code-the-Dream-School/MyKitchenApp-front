import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import GitHubIcon from "@mui/icons-material/GitHub";

const FooterPrivate = () => {
  return (
    <footer>
      <Box
        bgcolor="text.secondary"
        color="white"
        textAlign="center"
        sx={{ 
          position: "fixed", 
          bottom: 0, 
          left: 0, 
          right: 0 
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} mt={2}>
            We express special gratitude to our mentors Vaidehi and John for their invaluable help at every stage of creating this application
          </Grid>
          <Grid item xs={12} md={12}>
            <Link
              href="https://github.com/Code-the-Dream-School/MyKitchenApp-front"
              target="_blank"
              color="inherit"
              mr={1}
            >
              <GitHubIcon />
            </Link>
            My Kitchen App &#169; {new Date().getFullYear()}
          </Grid>
          <Grid item xs={12} md={12}>
            Powered by{" "}
            <Link              
              href="https://spoonacular.com/food-api"
              target="_blank"
              color="inherit"
              underline="hover"
            >
              Spoonacular API
            </Link>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
};

export default FooterPrivate;
