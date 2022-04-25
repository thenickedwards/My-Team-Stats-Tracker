import * as React from "react";
import AddTeam from "../components/Forms/AddTeam";
import EditTeam from "../components/Forms/EditTeam";

// Import Queries and Mutations
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_SOCCERTEAMS } from "../utils/queries";
import { REMOVE_SOCCERTEAM } from "../utils/mutations";
import Auth from "../utils/auth";

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
  CssBaseline
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

  // Functionality for Edit Team Modal
  const [openEdit, setOpenEdit] = React.useState(false);
  //  const handleOpenEdit = () => setOpenEdit(true);
  const handleOpenEdit = (soccerTeamId) => setOpenEdit(soccerTeamId);
  const handleCloseEdit = () => setOpenEdit(false);

  //Get teams
  const { loading, data } = useQuery(QUERY_SOCCERTEAMS);
  const teams = data?.allSoccerTeams || [];

  // Handle Delete Team
  const [removeSoccerTeam] = useMutation(REMOVE_SOCCERTEAM, {
    refetchQueries: [QUERY_SOCCERTEAMS],
  });

  const handleDeleteTeam = async (soccerTeamId) => {
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }
    console.log(soccerTeamId);
    try {
      await removeSoccerTeam({
        variables: { soccerTeamId },
      });

      //if successful, remove team by id
      // removeTeam(teamId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>LOADING</div>;
  }

  return (
    <>
    <CssBaseline />
    <Container disableGutters justify="center" position="relative">
      {/* Abstract Images */}
      <Box sx={{ position: "absolute", top: 100, right: 15 }}>
        <img
          src="images/abstract-up-arrows.png"
          alt="Abstract graphic with arrows."
          width="60px"
        />
      </Box>

      <Box sx={{ position: "absolute", bottom: 0, left: 10 }}>
        <img
          src="images/abstract-corner-dots-lines.png"
          alt="Abstract graphic with dots and lines."
          width="250px"
        />
      </Box>

      <Grid container sx={{ py: 8, px: 5 }} >
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

                {/* Add Player Button */}
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
                <MenuItem value={10}>Washington Premier League</MenuItem>
                <MenuItem value={20}>Washington Soccer Academy</MenuItem>
                <MenuItem value={30}>Greater Seattle Soccer League</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Team Cards - Map Over Seeds */}
        <Grid container spacing={{ xs: 4 }}>
          {teams.map((team) => {
            return (
              <Grid item key={team._id} xs={6} s={6} md={3} lg={3}>
                <Link
                  underline="none"
                  sx={teamsStyle.teamPaperText}
                  href={`/team/${team._id}`}
                  color="inherit"
                >
                  <Paper elevation={5} sx={teamsStyle.teamPaper}>
                    <img
                      src={team.teamPic}
                      alt="logo"
                      loading="lazy"
                      height={100}
                    />
                    <Typography
                      variant="p"
                      gutterBottom
                      component="div"
                      sx={teamsStyle.teamPaperText}
                    >
                      {team.teamName}
                    </Typography>
                  </Paper>
                </Link>

                {/* Edit | Delete buttons under team cards */}

                {Auth.loggedIn() ? (
                  <ButtonGroup
                    variant="text"
                    aria-label="text button group"
                    sx={{ pt: 2 }}
                    color="inherit"
                  >
                    <Button
                      onClick={() => handleOpenEdit(team._id)}
                    >
                      Edit
                    </Button>

                    {/* EDIT MODAL */}
                    <Modal
                      // open={openEdit}
                      open={openEdit === team._id}
                      onClose={handleCloseEdit}
                      soccerTeamId={team._id}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={teamsStyle.addTeamModal}>
                        <Typography id="modal-modal-title" variant="h1" sx={{ mb: 4 }}>
                          Edit Team
                        </Typography>

                        
                        <EditTeam
                          handleCloseEdit={handleCloseEdit}
                          soccerTeamId={team._id}
                        />

                      </Box>
                    </Modal>
                    {/* END EDIT MODAL */}

                    <Button
                      type="submit"
                      onClick={() => handleDeleteTeam(team._id)}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                ) : (
                  <div></div>
                )}

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
    </>
  );
}
