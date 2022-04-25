import * as React from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  Link,
} from "@mui/material";

const footerStyle = {
  container: {
    backgroundColor: "secondary.main",
  },
  listText: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "1em",
    fontFamily: "Helvetica, sans-serif",
    lineHeight: '1.6em',
    fontWeight: 100
  },
  // footerComponents: {
  //   backgroundColor: "#062740",
  //   color: "#FFFFFF",
  // },
};

const Footer = () => {


  return (
    <Container sx={footerStyle.container} maxWidth={false}>
      <Grid container spacing={9} sx={{padding: 5, mt:.2}}>

        <Grid item xs={12} sm={12} md={6} lg={6} >
          <Box>


          <Typography variant="h1" color="primary.contrastText" s>
            MyTeam Stats
          </Typography>
          <Typography variant="p" color="primary.contrastText" sx={footerStyle.listText}>
          Never lose track of your team stats again! Users can view their favorite leagues, teams, and players. Signup to be an admin of your own league so you can add players, teams, leagues, and select the season. Add games to keep score and see where your team stands in the running!
          </Typography>

          </Box>
        </Grid>

        <Grid item xs={6} sm={6} md={3} lg={3}>
        <Typography variant="h3" color="primary.contrastText">
            Meet the Team
          </Typography>

          <List>
            <Link
              href="https://github.com/jsamborski310"
              // passhref
              sx={footerStyle.listText}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ListItem button component="a" disableGutters>
                Juanita Samborski
              </ListItem>
            </Link>

            <Link
              href="https://github.com/thenickedwards"
              // passhref
              sx={footerStyle.listText}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ListItem button component="a" disableGutters>
                Nick Edwards
              </ListItem>
            </Link>

            <Link
              href="https://github.com/ChristinaBohn"
              // passhref
              sx={footerStyle.listText}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ListItem button component="a" disableGutters>
                Christina Bohn
              </ListItem>
            </Link>

            <Link
              href="https://github.com/chandrapanda"
              // passhref
              sx={footerStyle.listText}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ListItem button component="a" disableGutters>
                Chandra Holt
              </ListItem>
            </Link>
          </List>
        </Grid>


        {/* QUICK LINKS */}
        <Grid item xs={6} sm={6} md={3} lg={3}>
          <Typography variant="h3" color="primary.contrastText">
           Quick Links
          </Typography>

          <List>
            <Link
              href="/"
              passHref
              sx={footerStyle.listText}
            >
              <ListItem button component="a" disableGutters>
                Home
              </ListItem>
            </Link>

            <Link
              href="/login"
              passHref
              sx={footerStyle.listText}
            >
              <ListItem button component="a" disableGutters>
                Login
              </ListItem>
            </Link>

            <Link
              href="/signup"
              passHref
              sx={footerStyle.listText}
            >
              <ListItem button component="a" disableGutters>
                Signup
              </ListItem>
            </Link>

          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
