import React from "react";
import { Container, Box, Link } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

const FooterPrivate = () => {
  return <footer>
  <Box 
    bgcolor="text.secondary" 
    color="white" 
    textAlign="center" 
    pt="5" 
    pb="0">
    <Container maxWidth="lg">
      <Link href="https://github.com/Code-the-Dream-School/MyKitchenApp-front">
        <GitHubIcon />
      </Link>
      My Kitchen App &#169; {new Date().getFullYear()}
    </Container>
  </Box>
</footer>
};

export default FooterPrivate;
