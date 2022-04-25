import React from "react";
import AddLeague from "../components/Forms/AddLeague";
import EditLeague from "../components/Forms/EditLeague";

// Import Queries and Mutations
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_LEAGUES, QUERY_ME } from "../utils/queries";
import { REMOVE_LEAGUE } from "../utils/mutations";
// import Auth from "../utils/auth";

// Material UI Imports
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  IconButton,
  Link,
  Modal,
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

  addLeagueModal: {
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

export default function Leagues() {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  // Functionality for Add League Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Functionality for Edit League Modal
  const [openEdit, setOpenEdit] = React.useState(false);
  // const handleOpenEdit = () => setOpenEdit(true);
  const handleOpenEdit = (leagueId) => setOpenEdit(leagueId);
  const handleCloseEdit = () => setOpenEdit(false);

  // Get leagues
  const { loading, data } = useQuery(QUERY_LEAGUES);
  const leagues = data?.allLeagues || [];

  // Handle Delete League
  const [removeLeague] = useMutation(REMOVE_LEAGUE, {
    refetchQueries: [QUERY_LEAGUES],
  });

  const handleDeleteLeague = async (leagueId) => {
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }
    console.log(leagueId);
    try {
      await removeLeague({
        variables: { leagueId },
      });

      //if successful, remove league by id
      // removeLeague(leagueId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>LOADING</div>;
  }

  return (
    <Container alignItems="center" justifyContent="center">
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
        <Grid container spacing={{ xs: 4 }}>
          {leagues.map((league) => {

            return (
              <Grid item key={league._id} xs={6} s={6} md={3} lg={3}>
                <Link
                  sx={leaguesStyle.leaguePaperText}
                  underline="none"
                  href={`/league/${league._id}`}
                >
                  <Paper
                    elevation={5}
                    underline="none"
                    href={`/league/${league._id}`}
                    color="inherit"
                    sx={leaguesStyle.leaguePaper}
                  >
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
                      {league.leagueName}
                    </Typography>
                  </Paper>
                </Link>
                {/* Edit | Delete buttons under league cards */}
                <ButtonGroup
                  variant="text"
                  aria-label="text button group"
                  sx={{ pt: 2 }}
                  color="inherit"
                >
                  <Button
                    onClick={() => handleOpenEdit(league._id)}
                  >
                      Edit
                  </Button>

                  {/* EDIT MODAL */}
                  <Modal
                    // open={openEdit}
                    open={openEdit === league._id}

                    onClose={handleCloseEdit}
                    leagueId={league._id}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={leaguesStyle.addLeagueModal}>
                      <Typography id="modal-modal-title" variant="h1" sx={{ mb: 4 }}>
                        Edit League
                      </Typography>

                      
                      <EditLeague 
                        handleCloseEdit={handleCloseEdit} 
                        leagueId={league._id}
                      />

                    </Box>
                  </Modal>
                  {/* END EDIT MODAL */}

                  <Button
                    type="submit"
                    onClick={() => handleDeleteLeague(league._id)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      {/* Add League Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={leaguesStyle.addLeagueModal}>
          <Typography id="modal-modal-title" variant="h1" sx={{ mb: 4 }}>
            Add League
          </Typography>

          {/* ADD LEAGUE FORM */}
          <AddLeague handleClose={handleClose} />
        </Box>
      </Modal>


    </Container>
  );
}
