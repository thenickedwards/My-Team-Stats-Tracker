import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_LEAGUE } from "../utils/queries";

import {
  Container,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Modal,
} from "@mui/material";
import { DataGrid, gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import AddSeason from "../components/Forms/AddSeason";

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

// DATAGRID (TEMPORARY DATA)
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

// Add Seasons Modal Multiselect
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// STYLES
const leagueStyle = {
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
};

export default function League() {
  const { leagueId } = useParams();
  console.log(leagueId);

  const { loading, data } = useQuery(QUERY_LEAGUE, {
    // pass URL parameter
    variables: { leagueId },
  });

  const league = data?.league || {};

  // Functionality for Add Season Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let seasonNames = [];
  if (league.seasons) {
    seasonNames = league.seasons.map((season) => {
      return season.seasonName;
    });
  }

  if (loading) {
    return <div>LOADING</div>;
  }

  return (
    <>
      <CssBaseline />
      <Container
        disableGutters
        justify="center"
        // maxWidth="false"
      >
        <Grid container sx={{ py: 8, px: 5 }} position="relative">
          {/* Corner Abstract Image */}
          {/* <Box sx={{ position: "absolute", bottom: 0, left: 0 }}>
            <img
              src="images/abstract-corner-dots-lines.png"
              alt="Abstract graphic with dots and lines."
              width="250px"
            />
          </Box> */}

          {/* League Heading */}
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
                src={league.leaguePic}
                alt="team-logo"
                height="70px"
                width="auto"
              />

              <Box mt={{ xs: 0, sm: 4 }}>
                <Typography variant="h1" color="secondary.contrastText">
                  {league.leagueName}
                </Typography>

                {seasonNames.map((seasonName) => {
                  return (
                    <Typography variant="h3" color="secondary.contrastText">
                      {seasonName}
                    </Typography>
                  );
                })}
              </Box>

              <IconButton
                onClick={handleOpen}
                aria-label="Add Season"
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

          {/* League Seasons */}
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

          {/* Add Player Modal */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={leagueStyle.addPlayerModal}>
              <Typography id="modal-modal-title" variant="h1" sx={{ mb: 4 }}>
                Add Season
              </Typography>

              {/* ADD SEASON FORM */}
              <AddSeason handleClose={handleClose} />
            </Box>
          </Modal>
        </Grid>
      </Container>
    </>
  );
}
