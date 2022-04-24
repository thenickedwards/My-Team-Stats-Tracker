import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SOCCERTEAM } from "../utils/queries";

import {
  Container,
  CssBaseline,
  Grid,
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Modal,
} from "@mui/material";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import AddPlayer from "../components/Forms/AddPlayer";

//   DATAGRID (EDIT DATA)
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

//   DATAGRID (TEMPORARY DATA)
const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
// ////////////////////////////////////

// STYLES

const teamStyle = {
  statsPaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    p: 2,
    borderRadius: 4,
  },
  teamRoster: {
    backgroundColor: "red",
    borderRadius: "100%",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "15px",
  },
  addPlayerModal: {
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
    }
}

export default function Team () {
  const { soccerTeamId } = useParams();
  
  const { loading, data } = useQuery(QUERY_SOCCERTEAM, {
    // pass URL parameter
    variables: { soccerTeamId },
  });

  const soccerTeam = data?.soccerTeam || {};

  // Create roster
  const allPlayers = soccerTeam.roster;

  // Functionality for Dropdown
  const [season, setSeason] = React.useState("");
  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  // Functionality for Add Player Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Functionality for Tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return <div>LOADING</div>;
  }
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

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

          {/* Container for the two top columns. */}
          <Grid container alignItems={"center"}>

            {/* LEAGUE HEADING. Left column. */}
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
                  <img
                    src={soccerTeam.teamPic}
                    alt="Chicago Logo"
                    height="70px"
                    width="auto"
                  />

                  <Typography variant="h1" color="secondary.contrastText">
                    {soccerTeam.teamName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* DROPDOWN SEASON SELECT. Right column. */}
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
                <InputLabel id="select-season">Season</InputLabel>
                <Select
                  labelId="select-season"
                  id="select-season"
                  value={season}
                  label="Season"
                  onChange={handleSeasonChange}
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

          {/* End top Grid. ----------------------- */}

         {/* Creates container around two columns. Adds space between columns. */}
          <Grid container spacing={5}>

            {/* Left column */}
            <Grid item xs={12} s={12} md={8} lg={8}>
              
            {/* TEAM STATS */}
              <Grid container spacing={{ xs: 4 }}>

                {/* Stats Cards. Map over this section. */}

  {/* *** NICK ADD GAMES PLAYED TO SOCCERTEAM QUERIES *** */}

                {/* <Grid item xs={6} s={6} md={3} lg={3}>
                  <Paper elevation={5} sx={teamStyle.statsPaper}>
                    <Typography variant="h1" color="secondary.contrastText">
                      {soccerTeam.played}
                    </Typography>
                    <Typography variant="h6" color="secondary.contrastText">
                      Played
                    </Typography>
                  </Paper>
                </Grid> */}
                {/* End Stats Cards mapping. */}

                {/* ----------------------------------------------------- */}
                {/* Temporary Data. Delete */}
                <Grid item xs={6} s={6} md={3} lg={3}>
                  <Paper elevation={5} sx={teamStyle.statsPaper}>
                    <Typography variant="h1" color="secondary.contrastText">
                      {soccerTeam.wins}
                    </Typography>
                    <Typography variant="h6" color="secondary.contrastText">
                      Won
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6} s={6} md={3} lg={3}>
                  <Paper elevation={5} sx={teamStyle.statsPaper}>
                    <Typography variant="h1" color="secondary.contrastText">
                      {soccerTeam.draws}
                    </Typography>
                    <Typography variant="h6" color="secondary.contrastText">
                      Drawn
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6} s={6} md={3} lg={3}>
                  <Paper elevation={5} sx={teamStyle.statsPaper}>
                    <Typography variant="h1" color="secondary.contrastText">
                      {soccerTeam.losses}
                    </Typography>
                    <Typography variant="h6" color="secondary.contrastText">
                      Lost
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
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>

                    {/* GAMES */}
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
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    Item Two
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    Item Three
                  </TabPanel>
                </Box>
              </Grid>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} s={12} md={4} lg={4}>
              
              {/* TEAM ROSTER */}

              {/* HEADING */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "15px",
                  mb: 5,
                }}
              >
                <Typography variant="h3">Team Roster</Typography>
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
                  <AddIcon fontSize="inherit" sx={{ color: "#ffffff" }} />
                </IconButton>
              </Box>

              {/* PLAYERS */}
              <Grid container sx={{ display: "flex", flexDirection: "column" }}>
                
                {/* Player Details. Map over this section. */}

                {allPlayers.map((player) => {
                  
                  return (
               
                    <Grid
                      item
                      sx={{ display: "flex", flexDirection: "row", mb: 3 }}

                    >
                      <Box style={teamStyle.teamRoster}>
                        <img
                          src="images/player-default-profile.png"
                          alt="Player Profile Icon"
                          width="30px"
                          height="auto"
                          style={{ padding: "10px 0 0 0" }}
                        />
                      </Box>

                      <Box>
                        <Typography variant="h3">{player.playerNumber}</Typography>
                        <Typography variant="h6">{player.playerFirstName} {player.playerLastName}</Typography>
                      </Box>
                    </Grid>
                  )
                })}

                {/* End Player Details Mapping. */}

                {/* ----------------------------------------------------- */}
                {/* Temporary Data. Delete */}
                <Grid
                  item
                  sx={{ display: "flex", flexDirection: "row", mb: 3 }}
                >
                  <Box style={teamStyle.teamRoster}>
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
                  <Box style={teamStyle.teamRoster}>
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
                  <Box style={teamStyle.teamRoster}>
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
                  <Box style={teamStyle.teamRoster}>
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

            {/* ADD PLAYER MODAL */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={teamStyle.addPlayerModal}>
                <Typography id="modal-modal-title" variant="h1" sx={{ mb: 4 }}>
                  Add Player
                </Typography>

                {/* ADD PLAYER FORM */}
                <AddPlayer handleClose={handleClose} />

              
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
