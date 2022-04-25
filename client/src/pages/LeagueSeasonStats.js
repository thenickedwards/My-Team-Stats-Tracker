import React from "react";

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
  Link,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";


//   Datagrid
const columns = [
  {
    field: "standings",
    headerName: "Standings",
    width: 300,
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
        <Link href="#" variant="p" underline="none" color="inherit">
          {params.value.team}
        </Link>
      </Box>
    ),
  },
  {
    field: "win",
    headerName: "W",
    width: 70,
  },
  { field: "draw", headerName: "D", width:70 },
  { field: "losses", headerName: "L", width: 70 },
  { field: "points", headerName: "PTS", width: 100 },
  { field: "goalsFor", headerName: "GF", width: 70 },
  { field: "goalsAgainst", headerName: "GA", width: 70 },
  { field: "goalDifferential", headerName: "GD", width: 70 },
];

//   DATAGRID (TEMPORARY DATA) TODO: Map League Seasons (Future Development)
const rows = [
  {
    id: 1,
    standings: { team: "Chi Town Tigers", image: "/images/chicago.png" },
    win: "5",
    draw: "2",
    losses: "1",
    points: "30",
    goalsFor: "12",
    goalsAgainst: "3",
    goalDifferential: "9",
  },
  {
    id: 2,
    standings: { team: "Galaxy Bees", image: "/images/la-galaxy.png" },
    win: "4",
    draw: "1",
    losses: "3",
    points: "20",
    goalsFor: "10",
    goalsAgainst: "8",
    goalDifferential: "2",
  },
  {
    id: 3,
    standings: { team: "Salmon", image: "/images/jacksonville.png" },
    win: "3",
    draw: "2",
    losses: "5",
    points: "25",
    goalsFor: "4",
    goalsAgainst: "12",
    goalDifferential: "-8",
  },
  {
    id: 4,
    standings: { team: "Wolves", image: "/images/new-york-city.png" },
    win: "1",
    draw: "3",
    losses: "7",
    points: "35",
    goalsFor: "3",
    goalsAgainst: "17",
    goalDifferential: "-14",
  },
];


export default function LeagueSeasonStats() {

  // Functionality for Dropdown
  const [season, setSeason] = React.useState("");
  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  return (
    <>
      <CssBaseline />
      <Container disableGutters justify="center">
        {/* Outer container allows graphic images to be placed absolute. Also establishes padding. */}
        <Grid container sx={{ py: 8, px: 5 }}>
          
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
                    src="images/washington-premier-league.png"
                    alt="Chicago Logo"
                    height="70px"
                    width="auto"
                  />

                  <Box mt={{ xs: 0, sm: 0 }}>
                    <Typography variant="h1" color="secondary.contrastText">
                      Washington Premiere League
                    </Typography>
                    <Typography variant="h3" color="secondary.contrastText">
                      Boys U8 Spring
                    </Typography>
                  </Box>
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
                  <MenuItem value={10}>Adult Coed A - 11v11 Spring</MenuItem>
                  <MenuItem value={20}>Adult Womens A - 11v11 Spring</MenuItem>
                  <MenuItem value={30}>Boys U8 Spring</MenuItem>
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
        
        </Grid>
      </Container>
    </>
  );
}
