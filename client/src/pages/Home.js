import { QUERY_SOCCERGAMES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Upcoming Games Table - Columns
const columns = [
  {
    field: "homeTeam",
    headerName: "Home",
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
    headerName: "Away",
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
  { field: "gameDate", 
    headerName: "Game Date", 
    width: 250,  
  },
  {
    field: "viewScore",
    headerName: "View Score",
    sortable: false,
    width: 250, 
    renderCell: () => (
      <Link href="/game" variant="h3" underline="none">
        View Game
      </Link>
    ),
  },
];

// STYLES
const homeStyle = {
  statsPaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 4,
    paddingBottom: 1,
  },
  statsHeader: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "secondary.main",
    color: "primary.contrastText",
    padding: "5px 20px",
  },
  statsTeams: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 40px",
    height: "40px",
  },
  statsTeamDetails: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
};

const Home = () => {
  const { data } = useQuery(QUERY_SOCCERGAMES);
  const games = data?.allSoccerGames || [];

  console.log("games", games);

  return (
    <>
      <CssBaseline />
      <Container disableGutters justify="center">
        
        <Grid container sx={{ py: 8, px: 5 }}>
          {/* Team Stats */}
          <Grid container spacing={{ xs: 4 }}>
            {games.map((game, index) => {
              if (index < 4) {
                return (
                  <Grid item xs={12} s={12} md={3} lg={3}>
                    <Paper elevation={5} sx={homeStyle.statsPaper}>
                      {/* Header */}
                      <Box sx={homeStyle.statsHeader} className="statsBox">
                        <Typography variant="p" fontSize={13}>
                          League Name
                        </Typography>
                        <Typography variant="p" fontSize={13}>
                          4/9 @ 8:00pm
                        </Typography>
                      </Box>

                      {/* Team 1 */}
                      <Box sx={homeStyle.statsTeams}>
                        <Box sx={homeStyle.statsTeamDetails}>
                          <img
                            src={game.homeTeam.teamPic}
                            alt="Team Logo"
                            width="30px"
                            height="auto"
                          />
                          <Typography>{game.homeTeam.teamName}</Typography>
                        </Box>
                        <Typography>{game.goalsHome}</Typography>
                      </Box>

                      {/* Team 2 */}
                      <Box sx={homeStyle.statsTeams}>
                        <Box sx={homeStyle.statsTeamDetails}>
                          <img
                            src={game.awayTeam.teamPic}
                            alt="Team Logo"
                            width="30px"
                            height="auto"
                          />
                          <Typography>{game.awayTeam.teamName}</Typography>
                        </Box>
                        <Typography>{game.goalsAway}</Typography>
                      </Box>
                    </Paper>
                  </Grid>
                );
              }
            })}

            {/* Upcoming Games */}
            <Box sx={{ width: "100%", mt: 8 }}>
              <Typography variant="h1" sx={{ ml: 4, mb: 3 }}>
                Upcoming Games
              </Typography>

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
        </Grid>
      </Container>
    </>
  );
};

export default Home;
