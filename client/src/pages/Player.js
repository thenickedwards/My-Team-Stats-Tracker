import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SOCCERPLAYER, QUERY_SOCCERGAMES } from "../utils/queries";

//MUI
import {
  Container,
  CssBaseline,
  Grid,
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Link,
} from "@mui/material";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../components/Abstract/Loading";

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
          sortable: false,
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
    sortable: false,
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
  { field: "gameDate", headerName: "Game Date", width: 250 },
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

// Styles

const playerStyle = {
  statsPaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    p: 2,
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
};

export default function Player() {
  // Get All Soccer Games
  const { data: gameData } = useQuery(QUERY_SOCCERGAMES);
  const games = gameData?.allSoccerGames || [];

  //Get player ID from URL
  const { playerId } = useParams();

  // Get player data
  const { loading, data } = useQuery(QUERY_SOCCERPLAYER, {
    variables: { soccerPlayerId: playerId },
  });
  const player = data?.soccerPlayer || {};

  // Functionality for Tabs
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    if (loading) {
      return <Loading />;
    }

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <CssBaseline />

      <Container disableGutters justify="center">
        <Grid container spacing={5} sx={{ py: 8, px: 5 }}>
          <Grid item xs={12} s={12} md={8} lg={8}>
            {/* Player Heading */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "20px",
                mb: 5,
              }}
            >
              <Box style={playerStyle.teamRoster}>
                <img
                  src="/images/player-default-profile.png"
                  alt="Player Profile Icon"
                  width="30px"
                  height="auto"
                  style={{ padding: "10px 0 0 0" }}
                />
              </Box>

              <Typography variant="h1" color="secondary.contrastText">
                {player.playerFirstName} {player.playerLastName}
              </Typography>
            </Box>

            {/* Player Stats */}

            <Grid container spacing={{ xs: 4 }}>
              {/* Stats Cards. Map over this section. */}
              <Grid item xs={6} s={6} md={4} lg={4}>
                <Paper elevation={5} sx={playerStyle.statsPaper}>
                  <Typography variant="h1" color="secondary.contrastText">
                    4
                  </Typography>
                  <Typography variant="h6" color="secondary.contrastText">
                    Played
                  </Typography>
                </Paper>
              </Grid>
              {/* End Stats Cards mapping. */}

              {/* ----------------------------------------------------- */}
              {/* Temporary Data. Delete */}
              <Grid item xs={6} s={6} md={4} lg={4}>
                <Paper elevation={5} sx={playerStyle.statsPaper}>
                  <Typography variant="h1" color="secondary.contrastText">
                    4
                  </Typography>
                  <Typography variant="h6" color="secondary.contrastText">
                    Goals
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={6} s={6} md={4} lg={4}>
                <Paper elevation={5} sx={playerStyle.statsPaper}>
                  <Typography variant="h1" color="secondary.contrastText">
                    4
                  </Typography>
                  <Typography variant="h6" color="secondary.contrastText">
                    Assists
                  </Typography>
                </Paper>
              </Grid>

              {/* End Temporary Data. */}
              {/* ----------------------------------------------------- */}

              {/* Tabs */}

              <Box sx={{ width: "100%", mt: 5 }}>
                <Box>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{
                      "& .MuiButtonBase-root.MuiTab-root": {
                        fontSize: "1.25em",
                        alignItems: "flex-start",
                        marginLeft: "25px",
                        padding: "12px 16px 12px 2px",
                      },
                      "& .MuiTabs-indicator": {
                        display: "none",
                      },
                      "& .Mui-selected": {
                        borderTop: "3px solid #F5E410",
                      },
                      "& .MuiButtonBase-root.MuiTab-root.Mui-selected": {
                        color: "#062740",
                      },
                      "& .MuiBox-root": {
                        padding: "24px 0 24px 24px",
                      },
                    }}
                  >
                    <Tab label="Games" {...a11yProps(0)} />
                    <Tab label="Schedule" {...a11yProps(1)} />
                    <Tab label="Stats" {...a11yProps(2)} />
                    <Tab label="Teams" {...a11yProps(3)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  {/* Upcoming Games */}
                  <Box sx={{ width: "100%", mt: 8 }}>
                    <Typography variant="h1" sx={{ ml: 4, mb: 3 }}>
                      Games
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
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Paper elevation={5} sx={playerStyle.statsPaper}>
                    <Typography
                      variant="p"
                      gutterBottom
                      component="div"
                      sx={playerStyle.statsPaper}
                    >
                      SCHEDULE TAB COMING SOON
                    </Typography>
                  </Paper>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Paper elevation={5} sx={playerStyle.statsPaper}>
                    <Typography
                      variant="p"
                      gutterBottom
                      component="div"
                      sx={playerStyle.statsPaper}
                    >
                      STATS TAB COMING SOON
                    </Typography>
                  </Paper>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <Paper elevation={5} sx={playerStyle.statsPaper}>
                    <Typography
                      variant="p"
                      gutterBottom
                      component="div"
                      sx={playerStyle.statsPaper}
                    >
                      TEAM TAB COMING SOON
                    </Typography>
                  </Paper>
                </TabPanel>
              </Box>
            </Grid>
          </Grid>

          {/* Right Side */}

          <Grid
            item
            xs={12}
            s={12}
            md={4}
            lg={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "self-end",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <img
                src="/images/large-triangles.png"
                alt="Abstract triangles graphic."
              />
            </Box>

            <Box>
              <Typography fontSize={200} color={"secondary.main"}>
                #{player.playerNumber}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
