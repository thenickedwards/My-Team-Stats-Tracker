import React from "react";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_SEASON } from "../../utils/mutations";
import { QUERY_LEAGUES } from "../../utils/queries";

// MUI Imports
import {
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
} from "@mui/material";


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

// Styles
const leagueStyle = {
  formButton: {
    height: 50,
    backgroundColor: "secondary.main",
    "&:hover": {
      backgroundColor: "primary.main",
    },
  },
};


export default function AddSeason({ handleClose }) {

  // Get All League data
  const { loading, data } = useQuery(QUERY_LEAGUES);
  const leagues = data?.allLeagues || [];

  // Functionality for Adding League via Form
  const [formState, setFormState] = useState({
    seasonName: "",
    startYear: "",
    endYear: "",
    league: "",
  });

  const { seasonName, startYear, endYear, league } = formState;

  const [addSeason, { error }] = useMutation(ADD_SEASON);

  if (loading) {
    return <div>LOADING</div>;
  }

  const handleFormChange = (event) => {
    let { name, value } = event.target;

    if (name === startYear || name === endYear) {
      value = parseInt(value);
    }

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSeasonFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Testing", { ...formState });

    try {
      const { data } = await addSeason({
        variables: { season: { ...formState } },
      });

      console.log("Season Details:", formState);

      document.location.reload();

      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSeasonFormSubmit}>
      <FormControl fullWidth sx={{ gap: 4 }}>
        <TextField
          id="seasonName"
          name="seasonName"
          label="Season Name"
          variant="outlined"
          color="secondary"
          value={seasonName}
          onChange={handleFormChange}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          id="startYear"
          name="startYear"
          label="Start Year"
          variant="outlined"
          color="secondary"
          value={startYear}
          onChange={handleFormChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="endYear"
          name="endYear"
          label="End Year"
          variant="outlined"
          color="secondary"
          value={endYear}
          onChange={handleFormChange}
          InputLabelProps={{ shrink: true }}
        />

        <FormControl>
          <InputLabel id="league">League</InputLabel>
          <Select
            labelId="league"
            id="league"
            name="league"
            type="text"
            value={league}
            onChange={handleFormChange}
            input={<OutlinedInput label="League" />}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Select League</em>
            </MenuItem>

            {leagues.map((league) => (
              <MenuItem key={league} value={league._id}>
                {league.leagueName}
              </MenuItem>
            ))}
            
          </Select>
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          sx={leagueStyle.formButton}
          fullWidth
          disableElevation
        >
          <Typography variant="h3">Add Season</Typography>
        </Button>
      </FormControl>
    </form>
  );
}
