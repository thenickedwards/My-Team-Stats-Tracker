import { QUERY_SOCCERGAMES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import {
  Container,
  CssBaseline,
  Grid,
  Box,
  Paper,
  Typography,
  // Button
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";


const columns = [
  { field: "homeTeam", 
    headerName: "Home", 
    width: 250,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
        <img src={params.value.homeTeamPic} alt="Team Logo" height="auto" width="40px" objectFit="contain" />
        <Typography variant="p">{params.value.homeTeamName}</Typography>
      </Box>
    ) 
  },
  { field: "awayTeam", 
    headerName: "Away", 
    width: 250,
    renderCell: (params) => (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
        <img src={params.value.awayTeamPic} alt="Team Logo" height="auto" width="40px" objectFit="contain" />
        <Typography variant="p">{params.value.awayTeamName}</Typography>
      </Box>
    )  
  
  },
  { field: "gameDate", headerName: "Game Date", width: 200 },
  {
    field: "viewScore",
    headerName: "View Score",
    sortable: false,
    width: 300,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
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
      <Container
        disableGutters
        justify="center"
      >
        <Grid
          container
          sx={{ py: 8, px: 5 }}
          position="relative"
        >
          <Box sx={{ position: "absolute", bottom: 0, left: 0 }}>
            <img
              src="images/abstract-corner-dots-lines.png"
              alt="Abstract graphic with dots and lines."
              width="250px"
            />
          </Box>

          {/* Team Stats */}
          <Grid container spacing={{ xs: 4 }}>
            {games.map((game) => {
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
                    homeTeam: {homeTeamName: game.homeTeam.teamName, homeTeamPic: game.homeTeam.teamPic},
                    awayTeam: {awayTeamName: game.awayTeam.teamName, awayTeamPic: game.awayTeam.teamPic},
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
