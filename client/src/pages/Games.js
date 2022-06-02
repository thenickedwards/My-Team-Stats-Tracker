import React from "react";
import { QUERY_SOCCERGAMES } from "../utils/queries";
import { QUERY_SOCCERTEAMS } from "../utils/queries";
import { QUERY_LEAGUES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";

// MUI Imports
import {
  Container,
  CssBaseline,
  Grid,
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  OutlinedInput,
  Button,
  TextField,
  Modal,
  Link,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Columns for Games Table
const columns = [
  {
    field: "homeTeam",
    headerName: "Home Team",
    width: 250,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <img
          src={params.value.homeTeamPic}
          alt="Team Logo"
          height="auto"
          width="40px"
          objectFit="contain"
        />
        <Link
          href={`/team/${params.value.homeTeamLink}`}
          variant="p"
          underline="none"
          color="inherit"
        >
          {params.value.homeTeamName}
        </Link>
      </Box>
    ),
  },
  {
    field: "awayTeam",
    headerName: "Away Team",
    width: 250,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <img
          src={params.value.awayTeamPic}
          alt="Team Logo"
          height="auto"
          width="40px"
          objectFit="contain"
        />
        <Link
          href={`/team/${params.value.awayTeamLink}`}
          variant="p"
          underline="none"
          color="inherit"
        >
          {params.value.awayTeamName}
        </Link>
      </Box>
    ),
  },
  { field: "gameDate", headerName: "Game Date", width: 250 },
  {
    field: "viewScore",
    headerName: "View Score",
    sortable: false,
    width: 250,
    renderCell: (params) => (
      <Link href={`/game/${params.id}`} variant="h3" underline="none">
        View Game
      </Link>
    ),
  },
];

// Styles
const gamesStyle = {
  addGameModal: {
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
  formButton: {
    height: 50,
    backgroundColor: "secondary.main",
    "&:hover": {
      backgroundColor: "primary.main",
    },
  },
};

export default function Games() {
  // Get all soccer Games
  const { data } = useQuery(QUERY_SOCCERGAMES);
  const games = data?.allSoccerGames || [];

  //Get all teams for modal
  const { data: teamData } = useQuery(QUERY_SOCCERTEAMS);
  const teams = teamData?.allSoccerTeams || [];

  // Get All League data for modal
  const { data: leagueData } = useQuery(QUERY_LEAGUES);
  const leagues = leagueData?.allLeagues || [];

  console.log(data);
  console.log(leagueData);
  console.log(teamData);
  console.log(leagues);

  // Functionality for Dropdown
  const [league, setLeague] = React.useState("");
  const handleLeagueChange = (event) => {
    setLeague(event.target.value);
  };

  // Functionality for Add Season Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Functionality for Select Home Team Dropdown
  const [homeTeam, setHomeTeam] = React.useState([]);

  const handleHomeChange = (event) => {
    const {
      target: { value },
    } = event;
    setHomeTeam(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // Functionality for Select Away Team Dropdown
  const [awayTeam, setAwayTeam] = React.useState([]);

  const handleAwayChange = (event) => {
    const {
      target: { value },
    } = event;
    setAwayTeam(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // Functionality for Date Picker
  const [value, setValue] = React.useState(null);

  return (
    <>
      <CssBaseline />
      <Container disableGutters justify="center">
        {/* Outer container allows graphic images to be placed absolute. Also establishes padding. */}
        <Grid container sx={{ py: 8, px: 5 }}>
          {/* Container for the two top columns. */}
          <Grid container alignItems={"center"}>
            {/* PAGE HEADING. Left column. */}
            <Grid item xs={12} sm={12} md={9} lg={9}>
              <Grid container sx={{ display: "flex", flexDirection: "column" }}>
                <Grid
                  container
                  item
                  direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
                  alignItems={{
                    xs: "start",
                    sm: "center",
                    md: "center",
                    lg: "center",
                  }}
                  sx={{ gap: "20px", mb: 5 }}
                >
                  <Typography variant="h1" color="secondary.contrastText">
                    Upcoming Games
                  </Typography>

                  {/* Add Game Button */}
                  {Auth.loggedIn() ? (
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
                  ) : (
                    <div></div>
                  )}
                </Grid>
              </Grid>
            </Grid>

            {/* DROPDOWN LEAGUE SELECT. Right column. */}
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
                <InputLabel id="league">League</InputLabel>
                <Select
                  labelId="league"
                  id="league"
                  name="league"
                  type="text"
                  value={league}
                  onChange={handleLeagueChange}
                  input={<OutlinedInput label="League" />}
                >
                  <MenuItem disabled value="">
                    <em>Select League</em>
                  </MenuItem>
                  {leagues.map((league) => (
                    <MenuItem key={league} value={league._id}>
                      {league.leagueName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* End top Grid. ----------------------- */}

          {/* GAMES TABLE */}
          <Grid container spacing={{ xs: 4 }}>
            <Box sx={{ width: "100%", mt: 8 }}>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={games.map((game) => ({
                    id: game._id,
                    homeTeam: {
                      homeTeamName: game.homeTeam.teamName,
                      homeTeamPic: game.homeTeam.teamPic,
                      homeTeamLink: game.homeTeam._id,
                    },
                    awayTeam: {
                      awayTeamName: game.awayTeam.teamName,
                      awayTeamPic: game.awayTeam.teamPic,
                      awayTeamLink: game.awayTeam._id,
                    },
                    gameDate: game.gameDate,
                  }))}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  className={"customDataGrid"}
                  sx={{
                    "&.MuiDataGrid-root": {
                      border: "none",
                      fontFamily: "Helvetica, sans-serif",
                      marginLeft: "30px",
                    },
                    "& .MuiDataGrid-iconSeparator": {
                      display: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      fontFamily: '"Bebas Neue", Arial, sans-serif',
                      fontSize: "1.25em",
                      bgcolor: "secondary.main",
                      color: "primary.contrastText",
                    },
                    "& .MuiDataGrid-cell": {
                      border: "0",
                    },
                  }}
                />
              </div>
            </Box>
          </Grid>
          {/* End League Seasons Table -------------*/}

          {/* Add Game Modal */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={gamesStyle.addGameModal}>
              <Typography id="modal-modal-title" variant="h1" sx={{ mb: 4 }}>
                Add Game
              </Typography>

              <form>
                <FormControl fullWidth sx={{ gap: 4 }}>
                  <FormControl>
                    <InputLabel id="select-home-team">Home Team</InputLabel>
                    <Select
                      labelId="select-home-team"
                      id="homeTeam"
                      value={homeTeam}
                      onChange={handleHomeChange}
                      label="Home Team"
                    >
                      {teams.map((team) => (
                        <MenuItem key={team._id} value={team}>
                          {team.teamName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl>
                    <InputLabel id="select-away-team">Away Team</InputLabel>
                    <Select
                      labelId="select-home-team"
                      id="homeTeam"
                      value={awayTeam}
                      onChange={handleAwayChange}
                      label="Away Team"
                    >
                      {teams.map((team) => (
                        <MenuItem key={team._id} value={team}>
                          {team.teamName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Game Date"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>

                  <Button
                    variant="contained"
                    type="submit"
                    sx={gamesStyle.formButton}
                    fullWidth
                    disableElevation
                  >
                    <Typography variant="h3">Add Game</Typography>
                  </Button>
                </FormControl>
              </form>
            </Box>
          </Modal>
        </Grid>
      </Container>
    </>
  );
}
