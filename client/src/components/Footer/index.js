import * as React from "react";

// MUI Imports
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import HomeIcon from "@mui/icons-material/Home";


const Footer = () => {
  const [value, setValue] = React.useState(0);
  const footerText = [
    "The myTeam Stats was created by Juanita Samborski, Christina Bohn. Nick Edwards, and Chandra Holt. All rights reserved.",
  ];

  return (
    <Container
      xs={12}
      sx={{ width: 500, position: "relative", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
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
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="Admin Login"
            href="login"
            icon={<AdminPanelSettingsIcon />}
          />
          <BottomNavigationAction
            label="Admin Signup"
            href="signup"
            icon={<AddModeratorIcon />}
          />
          
        </BottomNavigation>
      </Box>
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
    </Container>
  );
};

export default Footer;
