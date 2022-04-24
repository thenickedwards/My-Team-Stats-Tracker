import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import HomeIcon from "@mui/icons-material/Home";

const footerStyle = {
  container: {
    backgroundColor: "secondary.main"
  },
  // footerComponents: {
  //   backgroundColor: "#062740",
  //   color: "#FFFFFF",
  // },
};

const Footer = () => {
  const [value, setValue] = React.useState(0);
  const footerText = [
    "The myTeam Stats was created by Juanita Samborski, Christina Bohn. Nick Edwards, and Chandra Holt. All rights reserved.",
  ];

  return (
    <Container sx={footerStyle.container}>
      <Grid container >

    <Grid item>
      
        <Box>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Homepage"
              href="/"
            
            />
            <BottomNavigationAction
              label="Admin Login"
              href="login"
              
            />
            <BottomNavigationAction
              label="Admin Signup"
              href="signup"
            
            />
          </BottomNavigation>
        </Box>

      </Grid>

    <Grid item>
        <Box
          sx={{
            textAlign: "center",
            mt: 2,
            mb: 2,
            display: "flex",
          }}
        >
          <Typography>{footerText}</Typography>
        </Box>
      </Grid>

    <Grid item>
      
    </Grid>


      </Grid>
    </Container>
  );
};

export default Footer;
