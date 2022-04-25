import * as React from "react";
import Link from "@mui/material/Link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

import Auth from "../../utils/auth";

let userInitials = () => {
  const token = Auth.loggedIn() ? Auth.getProfile() : null;
  if (token) {
    const initials =
      token.data.userFirstName.charAt(0).toUpperCase() +
      token.data.userLastName.charAt(0).toUpperCase();
    return initials;
  } else return "NO USER";
};

const navStyle = {
  navImage: {
    backgroundImage: 'url("/images/menu-stripes.png")',
    backgroundRepeat: "no-repeat",
    backgroundSize: "40%",
    backgroundPosition: "right",
  },
  navBackground: {
    backgroundColor: "#062740",
  },
};

const pages = [
  { id: 1, name: "Games", URL: "games" },
  { id: 2, name: "Teams", URL: "teams" },
  { id: 3, name: "Leagues", URL: "leagues" },
];

const settings = [
  { id: 1, name: "Account", URL: "account" },
  { id: 2, name: "My Leagues", URL: ":userId/leagues" },
  { id: 3, name: "My Teams", URL: ":userId/teams" },
  { id: 4, name: "My Seasons", URL: ":userId/seasons" },
  { id: 5, name: "Logout", URL: "logout" },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElHamburger, setAnchorHamburger] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenHamburgerMenu = (event) => {
    setAnchorHamburger(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseHamburgerMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" style={navStyle.navBackground}>
      <Grid
        maxWidth={false}
        container
        display="flex"
        style={navStyle.navImage}
        justify="between"
      >
        <Toolbar disableGutters>
          <Grid item>
            <Link
              variant="h1"
              noWrap
              underline="none"
              color="#ffffff"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", sm: "flex", md: "flex", lg: "flex" },
              }}
            >
              MyTeam Stats
            </Link>
          </Grid>
          <Grid item>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
              }}
            >
              {/* User icon appears when logged in, displaying user initials */}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              ></IconButton>
              {/* Menu items are displayed when screen is M or bigger */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Grid>
          <Grid item>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.id}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/${page.URL}`;
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Typography fontSize={20}>{page.name}</Typography>
                </Button>
              ))}
            </Box>
          </Grid>
          {/* Hamburger menu displays when screen is XS or S */}
          <Grid item>
            <Box>
              <Tooltip title="Open pages">
                <MenuIcon
                  onClick={handleOpenHamburgerMenu}
                  sx={{
                    anchorEl: "right",
                    display: {
                      xs: "flex",
                      sm: "flex",
                      md: "none",
                      lg: "none",
                    },
                  }}
                />
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="small-menu-appbar"
                anchorEl={anchorElHamburger}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElHamburger)}
                onClose={handleCloseHamburgerMenu}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.id}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/${page.URL}`;
                    }}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Grid>

          <Grid item>
            <Box sx={{ flexGrow: 0 }}>
              {Auth.loggedIn() ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar>{userInitials()}</Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.id}
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/${setting.URL}`;
                        }}
                      >
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <div></div>
              )}
            </Box>
          </Grid>
        </Toolbar>
      </Grid>
    </AppBar>
  );
};
export default Navbar;
