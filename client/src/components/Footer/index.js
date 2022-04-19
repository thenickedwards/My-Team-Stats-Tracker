import * as React from "react";
import Container from "@mui/material/Container";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import HomeIcon from "@mui/icons-material/Home";

const Footer = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Container
      xs={12}
      sx={{ width: 500, position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Homepage" href="/" icon={<HomeIcon />} />
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
    </Container>
  );
};

export default Footer;
