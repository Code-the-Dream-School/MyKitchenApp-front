import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid"
import GitHubIcon from '@mui/icons-material/GitHub';

const FooterPrivate = () => {
  return <footer>
  
  <Box 
    bgcolor="text.secondary" 
    color="white" 
    textAlign="center" 
    sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
    <Container maxWidth="lg" >
      <Grid>
        <Link href="https://github.com/Code-the-Dream-School/MyKitchenApp-front">
          <GitHubIcon />
        </Link>
        My Kitchen App &#169; {new Date().getFullYear()}
      </Grid>
      <Grid>
        Powered by{" "}
        <Link color="inherit" underline="hover" href="https://spoonacular.com/food-api">
          Spoonacular API
        </Link>           
      </Grid>
    </Container>
  </Box>
  
</footer>
};

export default FooterPrivate;
