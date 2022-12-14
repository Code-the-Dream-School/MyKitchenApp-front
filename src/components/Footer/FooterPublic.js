import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

const FooterPublic = () => {
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
          right: 0,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} mt={2}>
            We express special gratitude to our mentors Vaidehi and John for their invaluable help at every stage of creating this application
          </Grid>
          <Grid item xs={12} md={12}>
            My Kitchen App &#169; {new Date().getFullYear()} 
          </Grid>
          <Grid item xs={12} md={12}>
            Powered by {" "}
            <Link color="inherit" underline="hover" href="https://spoonacular.com/food-api">
              Spoonacular API
            </Link>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
};

export default FooterPublic;
