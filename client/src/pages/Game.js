import React from "react";

import {
  Container,
  CssBaseline,
  Grid,
  Box,
  Paper,
  Typography,
  FormControl,
  Modal,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

// ////////////////////////////////////
// Seasons Modal Select Team (TEMPORARY DATA)

const teams = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
// ////////////////////////////////////

// STYLES

const gameStyle = {
  statsPaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    p: 0,
    borderRadius: 4,
  },
  teamRoster: {
    backgroundColor: "black",
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
  submitButton: {
    height: 50,
    borderRadius: ' 10px 10px 0 0',
    backgroundColor: "secondary.main",
    "&:hover": {
      backgroundColor: "primary.main",
    },
  },
};

export default function Game() {

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



  return (
    <>
      <CssBaseline />
      <Container disableGutters justify="center">
        {/* Outer container allows graphic images to be placed absolute. Also establishes padding. */}
        <Grid container sx={{ py: 8, px: 5 }} position="relative">
          {/* CORNER ABSTRACT IMAGE */}
          <Box sx={{ position: "absolute", bottom: 0, left: 0 }}>
            <img
              src="images/abstract-corner-dots-lines.png"
              alt="Abstract graphic with dots and lines."
              width="250px"
            />
          </Box>

          {/* Creates container around two columns. Adds space between columns. */}
          
          <Grid container spacing={5}>
            {/* Left Column */}
            <Grid item 
              xs={12} s={12} md={4} lg={4}
              order={{ xs: 2, sm: 2, md: 1, lg: 1 }}
            >
              {/* TEAM ROSTER */}

              {/* HEADING */}
              <Box>
                <img src="images/chicago.png" alt="Team Logo" width="50px" />

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
                  <Typography variant="h3">Chicago Fire</Typography>
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
                </Box>
              </Box>

              {/* PLAYERS */}
              <Grid container sx={{ display: "flex", flexDirection: "column" }}>
                {/* Player Details. Map over this section. */}
                <Grid
                  item
                  sx={{ display: "flex", flexDirection: "row", mb: 3 }}
                >
                  <Box style={gameStyle.teamRoster}>
                    <img
                      src="images/player-default-profile.png"
                      alt="Player Profile Icon"
                      width="30px"
                      height="auto"
                      style={{ padding: "10px 0 0 0" }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="h3">#11</Typography>
                    <Typography variant="h6">Antonio Sanchez</Typography>
                  </Box>
                </Grid>
                {/* End Player Details Mapping. */}

                {/* ----------------------------------------------------- */}
                {/* Temporary Data. Delete */}
                <Grid
                  item
                  sx={{ display: "flex", flexDirection: "row", mb: 3 }}
                >
                  <Box style={gameStyle.teamRoster}>
                    <img
                      src="images/player-default-profile.png"
                      alt="Player Profile Icon"
                      width="30px"
                      height="auto"
                      style={{ padding: "10px 0 0 0" }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="h3">#11</Typography>
                    <Typography variant="h6">Antonio Sanchez</Typography>
                  </Box>
                </Grid>

                <Grid
                  item
                  sx={{ display: "flex", flexDirection: "row", mb: 3 }}
                >
                  <Box style={gameStyle.teamRoster}>
                    <img
                      src="images/player-default-profile.png"
                      alt="Player Profile Icon"
                      width="30px"
                      height="auto"
                      style={{ padding: "10px 0 0 0" }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="h3">#11</Typography>
                    <Typography variant="h6">Antonio Sanchez</Typography>
                  </Box>
                </Grid>

                <Grid
                  item
                  sx={{ display: "flex", flexDirection: "row", mb: 3 }}
                >
                  <Box style={gameStyle.teamRoster}>
                    <img
                      src="images/player-default-profile.png"
                      alt="Player Profile Icon"
                      width="30px"
                      height="auto"
                      style={{ padding: "10px 0 0 0" }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="h3">#11</Typography>
                    <Typography variant="h6">Antonio Sanchez</Typography>
                  </Box>
                </Grid>

                <Grid
                  item
                  sx={{ display: "flex", flexDirection: "row", mb: 3 }}
                >
                  <Box style={gameStyle.teamRoster}>
                    <img
                      src="images/player-default-profile.png"
                      alt="Player Profile Icon"
                      width="30px"
                      height="auto"
                      style={{ padding: "10px 0 0 0" }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="h3">#11</Typography>
                    <Typography variant="h6">Antonio Sanchez</Typography>
                  </Box>
                </Grid>

                {/* Temporary Data. Delete */}
                {/* ----------------------------------------------------- */}
              </Grid>
            </Grid>

            {/* Middle column */}
            <Grid item 
              xs={12} s={12} md={4} lg={4}
              order={{ xs: 1, sm: 1, md: 2, lg: 2 }}
            >
              {/* TEAM STATS */}

              {/* GAME CARD. */}
              <Typography variant="h1" color="secondary.contrastText">
                Game Card
              </Typography>

              <Box item>
                <Paper elevation={5} sx={gameStyle.statsPaper}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={gameStyle.submitButton}
                    fullWidth
                    disableElevation
                  >
                    <Typography variant="h3">Submit Game</Typography>
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
                        3
                      </Typography>
                      <Typography variant="h3" color="secondary.contrastText">
                        vs
                      </Typography>
                      <Typography fontSize={100} color="secondary.contrastText">
                        2
                      </Typography>
                    </Grid>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <Typography
                        variant="p"
                        color="secondary.contrastText"
                        fontWeight={600}
                        sx={{ mb: -1 }}
                      >
                        May 8, 2022
                      </Typography>
                      <Typography
                        variant="p"
                        color="secondary.contrastText"
                        sx={{ mt: -1 }}
                      >
                        8:00PM
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Grid>

            {/* ----------------------------------------------------- */}

            {/* Right Column */}
            <Grid item 
              xs={12} s={12} md={4} lg={4}
              order={{ xs: 3, sm: 3, md: 3, lg: 3 }}
            >
              {/* TEAM ROSTER */}

              {/* HEADING */}
              <Box>
                <img src="images/chicago.png" alt="Team Logo" width="50px" />

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
                  <Typography variant="h3">Chicago Fire</Typography>
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
                </Box>
              </Box>

              {/* PLAYERS */}
              <Grid container sx={{ display: "flex", flexDirection: "column" }}>
                {/* Player Details. Map over this section. */}
                <Grid
                  item
                  sx={{ display: "flex", flexDirection: "row", mb: 3 }}
                >
                  <Box style={gameStyle.teamRoster}>
                    <img
                      src="images/player-default-profile.png"
                      alt="Player Profile Icon"
                      width="30px"
                      height="auto"
                      style={{ padding: "10px 0 0 0" }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="h3">#11</Typography>
                    <Typography variant="h6">Antonio Sanchez</Typography>
                  </Box>
                </Grid>
                {/* End Player Details Mapping. */}

                {/* ----------------------------------------------------- */}
                {/* Temporary Data. Delete */}
                <Grid
                  item
                  sx={{ display: "flex", flexDirection: "row", mb: 3 }}
                >
                  <Box style={gameStyle.teamRoster}>
                    <img
                      src="images/player-default-profile.png"
                      alt="Player Profile Icon"
                      width="30px"
                      height="auto"
                      style={{ padding: "10px 0 0 0" }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="h3">#11</Typography>
                    <Typography variant="h6">Antonio Sanchez</Typography>
                  </Box>
                </Grid>

                <Grid
                  item
                  sx={{ display: "flex", flexDirection: "row", mb: 3 }}
                >
                  <Box style={gameStyle.teamRoster}>
                    <img
                      src="images/player-default-profile.png"
                      alt="Player Profile Icon"
                      width="30px"
                      height="auto"
                      style={{ padding: "10px 0 0 0" }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="h3">#11</Typography>
                    <Typography variant="h6">Antonio Sanchez</Typography>
                  </Box>
                </Grid>

                <Grid
                  item
                  sx={{ display: "flex", flexDirection: "row", mb: 3 }}
                >
                  <Box style={gameStyle.teamRoster}>
                    <img
                      src="images/player-default-profile.png"
                      alt="Player Profile Icon"
                      width="30px"
                      height="auto"
                      style={{ padding: "10px 0 0 0" }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="h3">#11</Typography>
                    <Typography variant="h6">Antonio Sanchez</Typography>
                  </Box>
                </Grid>

                <Grid
                  item
                  sx={{ display: "flex", flexDirection: "row", mb: 3 }}
                >
                  <Box style={gameStyle.teamRoster}>
                    <img
                      src="images/player-default-profile.png"
                      alt="Player Profile Icon"
                      width="30px"
                      height="auto"
                      style={{ padding: "10px 0 0 0" }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="h3">#11</Typography>
                    <Typography variant="h6">Antonio Sanchez</Typography>
                  </Box>
                </Grid>

                {/* Temporary Data. Delete */}
                {/* ----------------------------------------------------- */}
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
                  Add Score
                </Typography>

                <form>
                <FormControl fullWidth sx={{ gap: 4 }}>
                  <FormControl>
                    <InputLabel id="select-player-goal">Home Team</InputLabel>
                    <Select                     
                      labelId="select-player-goal"
                      id="goal"
                      value={goal}
                      onChange={handleGoalChange}
                      label="Home Team"
                    >
               
                      {teams.map((team) => (
                        <MenuItem key={team} value={team}>
                          {team}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl>
                    <InputLabel id="select-player-assist">Away Team</InputLabel>
                    <Select
                      labelId="select-player-assist"
                      id="assist"
                      value={assist}
                      onChange={handleAssistChange}
                      label="Away Team"
                    >

                      {teams.map((team) => (
                        <MenuItem key={team} value={team}>
                          {team}
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