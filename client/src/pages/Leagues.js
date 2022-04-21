import * as React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_LEAGUES } from "../utils/queries";
import Auth from "../utils/auth";

// Material UI Imports
import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Styles
const leaguesStyle = {
  leaguePaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 4,
    height: "200px",
    margin: "auto",
    pt: 3,
  },
  leaguePaperText: {
    width: "70%",
    margin: "auto",
    textAlign: "center",
  },
};

export default function Leagues() {
  // Functionality for Add League Modal
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // Get leagues
  const { loading, data } = useQuery(QUERY_LEAGUES);
  const leagues = data?.allLeagues || [];
  console.log(leagues);

  return (
    <>
      <Container alignItems="center" justifyContent="center">
        <Grid container sx={{ py: 8, px: 5 }} position="relative">
          {/* Header and "Add" button */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "20px",
              mb: 5,
            }}
          >
            <Typography variant="h1">Leagues</Typography>

            <IconButton
              onClick={handleOpen}
              aria-label="Add League"
              size="medium"
              sx={{
                backgroundColor: "secondary.accent",
                borderRadius: 10,
                "&:hover": {
                  backgroundColor: "primary.main",
                },
              }}
            >
              <AddIcon fontSize="inherit" sx={{ color: "#ffffff" }} />
            </IconButton>
          </Box>

          {/* League Cards - Map Over Seeds */}

          <Grid container sx={{ justifyContent: "space-around" }}>
            {leagues.map((league) => {
              return (
                <Grid item key={league._id}>
                  <Paper elevation={5} sx={leaguesStyle.leaguePaper}>
                    <img
                      src={league.leaguePic}
                      alt="logo"
                      loading="lazy"
                      height={100}
                    />
                    <Typography
                      variant="p"
                      gutterBottom
                      component="div"
                      sx={leaguesStyle.leaguePaperText}
                    >
                      {leagues.leagueName}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        {/* Page styling */}
        <Box sx={{ position: "absolute", top: 100, right: 15 }}>
          <img
            src="images/abstract-up-arrows.png"
            alt="Abstract graphic with arrows."
            width="60px"
          />
        </Box>

        <Box sx={{ position: "absolute", bottom: 40, left: 40 }}>
          <img
            src="images/abstract-corner-dots-lines.png"
            alt="Abstract graphic with dots and lines."
            width="250px"
          />
        </Box>
      </Container>
    </>
  );
}
