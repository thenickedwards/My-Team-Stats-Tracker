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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";


//   Datagrid
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

//   DATAGRID (TEMPORARY DATA) TODO: Map League Seasons (Future Development)
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
                    src="images/chicago.png"
                    alt="Chicago Logo"
                    height="70px"
                    width="auto"
                  />

                  <Box mt={{ xs: 0, sm: 4 }}>
                    <Typography variant="h1" color="secondary.contrastText">
                      Chicago Premiere League
                    </Typography>
                    <Typography variant="h3" color="secondary.contrastText">
                      Season
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
        
        </Grid>
      </Container>
    </>
  );
}
