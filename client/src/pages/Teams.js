import * as React from "react";
import AddTeam from "../components/Forms/AddTeam";

import { useQuery } from "@apollo/client";
import { QUERY_SOCCERTEAMS } from "../utils/queries";

// Material UI Imports
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Modal,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Styles
const teamsStyle = {
  teamPaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 4,
    height: "200px",
    margin: "auto",
    pt: 3,
  },
  teamPaperText: {
    width: "70%",
    margin: "auto",
    textAlign: "center",
  },
  addTeamModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  },
};

export default function Teams() {
  // Functionality for Dropdowns
  const [league, setLeague] = React.useState("");
  const handleLeagueChange = (event) => {
    setLeague(event.target.value);
  };

  // Functionality for Add Team Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Get teams
  const { loading, data } = useQuery(QUERY_SOCCERTEAMS);
  const teams = data?.allSoccerTeams || [];

  if (loading) {
    return <div>LOADING</div>;
  }

  return (
    <Container alignItems="center" justifyContent="center">
      {/* Abstract Images */}
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

      <Grid container sx={{ py: 8, px: 5 }} position="relative">
        {/* Container for the two top columns. */}
        <Grid container alignItems={"center"}>
          {/* PAGE HEADING. Left column. */}
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <Grid container sx={{ display: "flex", flexDirection: "column" }}>
              <Grid
                container
                item
                direction={{ xs: "row" }}
                alignItems={{ xs: "start" }}
                sx={{ gap: "20px", mb: 5 }}
              >
                <Typography variant="h1" color="secondary.contrastText">
                  Teams
                </Typography>

                <IconButton
                  onClick={handleOpen}
                  aria-label="Add Game"
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
              </Grid>
            </Grid>
          </Grid>

          {/* Dropdown. League Selector. */}
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <FormControl
              size="small"
              sx={{
                m: 1,
                minWidth: "100%",
                mb: 5,
                ml: 0,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "secondary.main",
                },
              }}
            >
              <InputLabel id="select-league">League</InputLabel>
              <Select
                labelId="select-league"
                id="select-league"
                value={league}
                label="League"
                onChange={handleLeagueChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Team Cards - Map Over Seeds */}
        <Grid container spacing={{ xs: 4 }}>
          {teams.map((team) => {
            return (
              <Grid item key={team._id} xs={6} s={6} md={3} lg={3}>
                <Paper elevation={5} sx={teamsStyle.teamPaper}>
                  <img
                    src={team.teamPic}
                    alt="logo"
                    loading="lazy"
                    height={100}
                  />
                  <Link
                    variant="p"
                    gutterBottom
                    // component="div"
                    sx={teamsStyle.teamPaperText}
                    href="/team"
                    color="inherit"
                  >
                    {team.teamName}
                  </Link>
                </Paper>

                {/* Edit | Delete buttons under team cards */}
                <ButtonGroup variant="text" aria-label="text button group" sx={{pt: 2}} color="inherit">
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </ButtonGroup>

              </Grid>
            );
          })}
        </Grid>

        {/* Add Team Modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={teamsStyle.addTeamModal}>
            <Typography id="modal-modal-title" variant="h1" sx={{ mb: 4 }}>
              Add Team
            </Typography>

            {/* ADD TEAM FORM */}
            <AddTeam handleClose={handleClose} />
          </Box>
        </Modal>
      </Grid>
    </Container>
  );
}
