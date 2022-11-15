import React from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ReusableCard from "../../components/ReusableCard/ReusableCard";

const SearchResult = () => {  
  
  return (
    <Container>
      <Box>
        <Typography align="center" variant="h2" mt={8}>
          Results
        </Typography>

        {/*These are temporary filter buttons. Later will improved*/}
        
        <Grid m={2} align="center">
          <Button variant="outlined" color="info" sx={{ margin: 1 }}>
            Vegetarian
          </Button>
          <Button variant="outlined" color="info" sx={{ margin: 1 }}>
            Beef
          </Button>
          <Button variant="outlined" color="info" sx={{ margin: 1 }}>
            Chicken
          </Button>
          <Button variant="outlined" color="info" sx={{ margin: 1 }}>
            Fish
          </Button>
        </Grid>

        <Box>
          <ReusableCard/>            
        </Box>
      </Box>
    </Container>
  );
};

export default SearchResult;
