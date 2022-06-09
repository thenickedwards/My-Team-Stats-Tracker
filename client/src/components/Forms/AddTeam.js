import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
// import { ColorInput, ColorPicker, createColor } from "material-ui-color";

// MUI Imports
import {
  Button,
  FormControl,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Input,
  InputAdornment,
} from "@mui/material";
import { ADD_SOCCERTEAM } from "../../utils/mutations";
import { QUERY_SEASONS, QUERY_SOCCERTEAMS } from "../../utils/queries";
import { color } from "@mui/system";

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
const teamsStyle = {
  formButton: {
    height: 50,
    backgroundColor: "secondary.main",
    "&:hover": {
      backgroundColor: "primary.main",
    },
  },
  colorInput: {
    width: "50%",
    // height: "2.5em",
  },
};

export default function AddTeam({ handleClose }) {
  // Upload Image
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState({
    teamPic: "",
  });

  const teamPic = image;

  // Function to Upload Image
  //  *Could be created into a component

  const uploadImage = async (e) => {
    const files = e.target.files;

    const data = new FormData();
    data.append("file", files[0]);

    data.append("upload_preset", "zqaezwbg");
    data.append("cloud_name", "dv12r4xtz");
    // data.append("upload_preset", process.env.CLOUD_PRESET);
    // data.append("cloud_name", process.env.CLOUD_NAME);

    setImageLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dv12r4xtz/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    console.log("File:", file);

    setImage(file.secure_url);
    console.log("File URL:", file.secure_url);

    setImageLoading(false);
  };
  // ----End Upload Image Function

  // Functionality for Select Team Dropdown
  const { loading, data } = useQuery(QUERY_SEASONS);
  const seasons = data?.allSeasons || [];

  // Functionality for Adding League via Form
  const [formState, setFormState] = useState({
    teamName: "",
    season: "",
    // teamPic: "",
    teamColor: "",
  });

  // const { teamName, season, teamPic } = formState;
  // const { teamName, season } = formState;
  const { teamName, season, teamColor } = formState;

  // const [color, setColor] = useState(
  //     createColor("#062740"),
  //     {
  //         teamColor: ""
  //     }
  // );
  //   const [color, setColor] = useState(
  //     createColor("#062740")
  // );

  // const teamColor = color;

  const [addTeam, { error }] = useMutation(ADD_SOCCERTEAM, {
    refetchQueries: [QUERY_SOCCERTEAMS],
  });

  // const handleColorChange = (value) => {
  //     console.log("onChange=", value);
  //     console.log("new value", "#" + value.hex)
  //     console.log("raw:", value.raw)
  //     setColor("#" + value.hex);
  //     // setColor(value);
  // }

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleTeamFormSubmit = async (event) => {
    event.preventDefault();

    // const teamDetails = {...formState, teamColor, teamPic}
    const teamDetails = { ...formState, teamPic };
    console.log("Team Details", teamDetails);

    try {
      const { data } = await addTeam({
        variables: { team: teamDetails },
      });

      setFormState({
        teamName: "",
        season: "",
        // teamPic: "",
        teamColor: "",
      });

      setImage({
        teamPic: "",
      });

      // setColor({
      //   teamColor: "",
      // });

      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleTeamFormSubmit}>
      <FormControl fullWidth sx={{ gap: 4 }}>
        <TextField
          id="teamName"
          name="teamName"
          label="Team Name"
          type="text"
          variant="outlined"
          color="secondary"
          value={teamName}
          onChange={handleFormChange}
          InputLabelProps={{ shrink: true }}
        />

        <FormControl>
          <InputLabel id="season">Season</InputLabel>
          <Select
            // displayEmpty
            labelId="season"
            id="season"
            name="season"
            type="text"
            value={season}
            onChange={handleFormChange}
            input={<OutlinedInput label="Season" />}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Select Season</em>
            </MenuItem>

            {seasons.map((season) => (
              <MenuItem key={season} value={season._id}>
                {season.seasonName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* TODO: Add Upload Photo Field (Future Development) */}

        {/* <TextField 
            id="teamPic" 
            name="teamPic"
            label="Team Photo" 
            variant="outlined" 
            color="secondary"
            value={teamPic}
            onChange={handleFormChange}
            InputLabelProps={{ shrink: true }} 
        /> */}

        {/* IMAGE UPLOAD */}
        <FormControl>
          {/* <InputLabel htmlFor="teamPic">Team Photo</InputLabel> */}
          <Input
            id="teamPic"
            name="teamPic"
            label="Team Photo"
            type="file"
            accept="image/*"
            variant="filled"
            color="secondary"
            disableUnderline
            // value={teamPic}
            onChange={uploadImage}
            inputlabelprops={{ shrink: false }}
          />
        </FormControl>

        {/* <ColorPicker
            id="teamColor"
            name="teamColor"
            label="Team Color"
            format="hex"
            defaultValue="#062740"
            // value={teamColor}
            value={color}
            onChange={handleColorChange}
         /> */}

        <FormControl sx={{ display: "block" }}>
          {/* <InputLabel htmlFor="teamColor">Team Color</InputLabel> */}

          <Input
            id="teamColor"
            name="teamColor"
            label="Team Color"
            type="color"
            variant="standard"
            disableUnderline
            // format="hex"
            // defaultValue="#062740"
            // value={teamColor}
            value={teamColor}
            onChange={handleFormChange}
            // sx={{width:"50%", border:"none"}}
            sx={teamsStyle.colorInput}
            // startAdornment={teamColor ? teamColor : "Select Color"}

            startAdornment={
              <InputAdornment position="start">
                <Typography>
                  {teamColor ? teamColor : "Select Color"}
                </Typography>
              </InputAdornment>
            }
            // sx={{width: "100%"}}
          />
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          sx={teamsStyle.formButton}
          fullWidth
          disableElevation
        >
          <Typography variant="h3">Add Team</Typography>
        </Button>
      </FormControl>
    </form>
  );
}
