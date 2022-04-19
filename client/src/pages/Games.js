import React from "react";
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
  Button,
  TextField,
  Modal,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

// ////////////////////////////////////
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
  // Functionality for Dropdown
  const [league, setLeague] = React.useState("");
  const handleSeasonChange = (event) => {
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
                <InputLabel id="select-league">League</InputLabel>
                <Select
                  labelId="select-league"
                  id="select-league"
                  value={league}
                  label="League"
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
                        <MenuItem key={team} value={team}>
                          {team}
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
                        <MenuItem key={team} value={team}>
                          {team}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    id="gameDate"
                    label="Game Date"
                    variant="outlined"
                    color="secondary"
                    InputLabelProps={{ shrink: true }}
                  />

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
