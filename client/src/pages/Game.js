import React from "react";
import { QUERY_SOCCERGAME, QUERY_SOCCERTEAM } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Auth from "../utils/auth";
import Loading from "../components/Abstract/Loading";

// MUI Imports
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Styles
const gameStyle = {
  statsPaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    p: 0,
    borderRadius: 4,
  },
  teamRosterHome: {
    borderRadius: "100%",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "15px",
  },
  teamRosterAway: {
    borderRadius: "100%",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "15px",
  },
  addScoreModal: {
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
  cardHeader: {
    height: 50,
    borderRadius: " 10px 10px 0 0",
    backgroundColor: "secondary.main",
    "&:hover": {
      backgroundColor: "primary.main",
    },
  },
};

export default function Game() {
  //Get Game ID
  const { soccerGameId } = useParams();

  // Get Game Data
  const { loading, data } = useQuery(QUERY_SOCCERGAME, {
    variables: { soccerGameId },
  });
  const game = data?.soccerGame || {};
  const homeTeamId = game?.homeTeam?._id;
  const awayTeamId = game?.awayTeam?._id;

  // Get Home Team Data
  const { loading: homeTeamLoading, data: homeTeamData } = useQuery(
    QUERY_SOCCERTEAM,
    {
      variables: { soccerTeamId: homeTeamId },
    }
  );
  const homeTeam = homeTeamData?.soccerTeam || {};
  const homeTeamPlayers = homeTeam?.roster || [];
  const homeTeamColor = homeTeam?.teamColor;
  const homeTeamPic = homeTeam?.teamPic;

  // Get Away Team Data
  const { loading: awayTeamLoading, data: awayTeamData } = useQuery(
    QUERY_SOCCERTEAM,
    {
      variables: { soccerTeamId: awayTeamId },
    }
  );
  const awayTeam = awayTeamData?.soccerTeam || {};
  const awayTeamPlayers = awayTeam?.roster || [];
  const awayTeamColor = awayTeam?.teamColor;
  const awayTeamPic = awayTeam?.teamPic;

  // Set variable for ALL PLAYERS for modal access
  const allPlayers = homeTeamPlayers.concat(awayTeamPlayers);

  // Functionality for Add Score Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Functionality for Select Goal Dropdown
  const [goal, setGoal] = React.useState([]);

  const handleGoalChange = (event) => {
    const {
      target: { value },
    } = event;

    setGoal(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // Functionality for Select Assist Dropdown
  const [assist, setAssist] = React.useState([]);

  const handleAssistChange = (event) => {
    const {
      target: { value },
    } = event;

    setAssist(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  //   Datagrid
  const columns = [
    {
      field: "goal",
      headerName: "Goal",
      width: 90,
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
            src={params.value.image}
            alt="Team Logo"
            height="auto"
            width="40px"
          />
          {/* <Link href="#" variant="p" underline="none" color="inherit">
            {params.value.team}
          </Link> */}
        </Box>
      ),
    },
    { field: "scorer", headerName: "Scorer", width: 80 },
    { field: "assister", headerName: "Assister", width: 80 },
    { field: "minute", headerName: "Minute", width: 80 },
  ];

  //   DATAGRID (TEMPORARY DATA) TODO: Map Scored Goals when seeds are ready (Future Development)
  const rows = [
    {
      id: 1,
      goal: { team: "Chi Town Tigers", image: "/images/chicago.png" },
      scorer: "Bob",
      assister: "Sally",
      minute: "11",
    },
    {
      id: 2,
      goal: { team: "Galaxy Bees", image: "/images/la-galaxy.png" },
      scorer: "TJ",
      assister: "Aria",
      minute: "37",
    },
    {
      id: 3,
      goal: { team: "Salmon", image: "/images/jacksonville.png" },
      scorer: "Juanita",
      assister: "Chris",
      minute: "51",
    },
  ];

  if ((loading, homeTeamLoading, awayTeamLoading)) {
    return <Loading />;
  }

  return (
    <>
      <CssBaseline />
      <Container disableGutters justify="center">
        {/* Outer container allows graphic images to be placed absolute. Also establishes padding. */}
        <Grid container sx={{ py: 8, px: 5 }}>
          {/* Creates container around two columns. Adds space between columns. */}
          <Grid container spacing={5}>
            {/* Left Column */}
            <Grid
              item
              xs={12}
              s={12}
              md={4}
              lg={4}
              order={{ xs: 2, sm: 2, md: 1, lg: 1 }}
            >
              {/* HOME TEAM ROSTER */}
              <Box>
                <img src={homeTeamPic} alt="logo" height="70px" width="auto" />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "15px",
                    mb: 5,
                    mt: -1,
                  }}
                >
                  <Typography variant="h3">{homeTeam.teamName}</Typography>

                  {/* Add Player Button */}
                  {Auth.loggedIn() ? (
                    <IconButton
                      onClick={handleOpen}
                      aria-label="Add Player"
                      size="medium"
                      sx={{
                        backgroundColor: "secondary.accent",
                        borderRadius: 10,
                        "&:hover": {
                          backgroundColor: "primary.main",
                        },
                      }}
                    >
                      <AddIcon fontSize="small" sx={{ color: "#ffffff" }} />
                    </IconButton>
                  ) : (
                    <div></div>
                  )}
                </Box>
              </Box>

              {/* HOME TEAM PLAYERS */}

              <Grid container sx={{ display: "flex", flexDirection: "column" }}>
                {/* Player Details*/}
                {homeTeamPlayers.map((player) => {
                  return (
                    <Grid
                      item
                      sx={{ display: "flex", flexDirection: "row", mb: 3 }}
                    >
                      <Box style={gameStyle.teamRosterHome}>
                        <Link underline="none" href={`/player/${player._id}`}>
                          <AccountCircleIcon
                            fontSize="large"
                            sx={{ color: homeTeamColor }}
                          ></AccountCircleIcon>
                        </Link>
                      </Box>
                      <Box>
                        <Typography variant="h3">
                          {player.playerNumber}
                        </Typography>
                        <Typography variant="h6">
                          {player.playerFirstName} {player.playerLastName}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>

            {/* Middle column */}
            <Grid
              item
              xs={12}
              s={12}
              md={4}
              lg={4}
              order={{ xs: 1, sm: 1, md: 2, lg: 2 }}
            >
              {/* TEAM STATS */}

              {/* Game Card */}
              <Typography variant="h1" color="secondary.contrastText">
                Game Card
              </Typography>

              <Box item>
                <Paper elevation={5} sx={gameStyle.statsPaper}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={gameStyle.cardHeader}
                    fullWidth
                    disableElevation
                  >
                    <Typography variant="h3">{game.gameDate}</Typography>
                  </Button>

                  <Box sx={{ p: 3 }}>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <Typography fontSize={100} color="secondary.contrastText">
                        {game.goalsHome}
                      </Typography>
                      <Typography variant="h3" color="secondary.contrastText">
                        vs
                      </Typography>
                      <Typography fontSize={100} color="secondary.contrastText">
                        {game.goalsAway}
                      </Typography>
                    </Grid>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    ></Box>
                  </Box>
                </Paper>
              </Box>
              {/* LEAGUE SEASONS TABLE */}
              <Grid container spacing={{ xs: 4 }}>
                <Box sx={{ width: "100%", mt: 8 }}>
                  <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={rows}
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
            </Grid>

            {/* Right Column */}
            <Grid
              item
              xs={12}
              s={12}
              md={4}
              lg={4}
              order={{ xs: 3, sm: 3, md: 3, lg: 3 }}
            >
              {/* TEAM ROSTER */}

              {/* Heading */}
              <Box>
                <img
                  src={awayTeamPic}
                  alt="Team Logo"
                  width="70px"
                  height="auto"
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "15px",
                    mb: 5,
                    mt: -1,
                  }}
                >
                  <Typography variant="h3">{awayTeam.teamName}</Typography>

                  {/* Add Player Button */}
                  {Auth.loggedIn() ? (
                    <IconButton
                      onClick={handleOpen}
                      aria-label="Add Player"
                      size="medium"
                      sx={{
                        backgroundColor: "secondary.accent",
                        borderRadius: 10,
                        "&:hover": {
                          backgroundColor: "primary.main",
                        },
                      }}
                    >
                      <AddIcon fontSize="small" sx={{ color: "#ffffff" }} />
                    </IconButton>
                  ) : (
                    <div></div>
                  )}
                </Box>
              </Box>

              {/* AWAY TEAM PLAYERS */}

              <Grid container sx={{ display: "flex", flexDirection: "column" }}>
                {/* Player Details */}
                {awayTeamPlayers.map((player) => {
                  return (
                    <Grid
                      item
                      sx={{ display: "flex", flexDirection: "row", mb: 3 }}
                    >
                      <Box style={gameStyle.teamRosterAway}>
                        <Link underline="none" href={`/player/${player._id}`}>
                          <AccountCircleIcon
                            fontSize="large"
                            sx={{ color: awayTeamColor }}
                          ></AccountCircleIcon>
                        </Link>
                      </Box>
                      <Box>
                        <Typography variant="h3">
                          {player.playerNumber}
                        </Typography>
                        <Typography variant="h6">
                          {player.playerFirstName} {player.playerLastName}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>

            {/* ADD SCORE MODAL */}

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={gameStyle.addScoreModal}>
                <Typography id="modal-modal-title" variant="h1" sx={{ mb: 4 }}>
                  Add Goal
                </Typography>

                <form>
                  <FormControl fullWidth sx={{ gap: 4 }}>
                    <FormControl>
                      <InputLabel id="select-player-goal">Scored by</InputLabel>
                      <Select
                        labelId="select-player-goal"
                        id="goal"
                        value={goal}
                        onChange={handleGoalChange}
                        label="Home Team"
                      >
                        {allPlayers.map((player) => (
                          <MenuItem key={player._id} value={player._id}>
                            {player.playerFirstName} {player.playerLastName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl>
                      <InputLabel id="select-player-assist">
                        Assisted by
                      </InputLabel>
                      <Select
                        labelId="select-player-assist"
                        id="assist"
                        value={assist}
                        onChange={handleAssistChange}
                        label="Away Team"
                      >
                        {allPlayers.map((player) => (
                          <MenuItem key={player._id} value={player._id}>
                            {player.playerFirstName} {player.playerLastName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      id="minute"
                      label="Minute"
                      variant="outlined"
                      color="secondary"
                      InputLabelProps={{ shrink: true }}
                    />

                    <Button
                      variant="contained"
                      type="submit"
                      sx={gameStyle.formButton}
                      fullWidth
                      disableElevation
                    >
                      <Typography variant="h3">Add Score</Typography>
                    </Button>
                  </FormControl>
                </form>
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
