import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_TEAM } from "../../utils/mutations";
import { QUERY_SOCCERTEAMS, QUERY_SEASONS } from "../../utils/queries";
import { ColorPicker, createColor } from 'material-ui-color';

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
  Input
} from "@mui/material";


// Add Team Modal Multiselect
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
      color: 'primary.contrastText',
      backgroundColor: "secondary.main",
      "&:hover": {
        backgroundColor: "primary.main",
      },
  },
}


const EditTeam = ( {soccerTeamId, handleCloseEdit} ) => {

  const [imageLoading, setImageLoading] = useState(false)
  const [image, setImage] = useState({
    teamPic:""
  });
  
  const teamPic = image;
  
  // Function to Upload Image
  //  *Could be created into a component
  
  const uploadImage = async e => {
  
    const files = e.target.files;
  
    const data = new FormData();
    data.append('file', files[0]);
  
    data.append('upload_preset', 'zqaezwbg');
    data.append('cloud_name', 'dv12r4xtz' );
  // data.append("upload_preset", process.env.CLOUD_PRESET);
  // data.append("cloud_name", process.env.CLOUD_NAME);
  
    setImageLoading(true)
  
    const res = await fetch("https://api.cloudinary.com/v1_1/dv12r4xtz/image/upload", {
      method: 'POST',
      body: data
    })
  
    const file = await res.json();
    console.log('File:', file);
  
    setImage(file.secure_url)
    console.log('File URL:', file.secure_url)
  
    setImageLoading(false)
  }
   // ----End Upload Image Function


    // Functionality for Select Season Dropdown
    const { loading, data } = useQuery(QUERY_SEASONS);
    const seasons = data?.allSeasons || [];
  
    // Functionality to Adding League via Form
    const [formState, setFormState] = useState({
      teamName: "",
      season: "",
      // teamPic: "",
    });

    // const { teamName, season, teamPic } = formState;
    const { teamName, season } = formState;

    const [color, setColor] = useState(
      createColor("#000"), 
      {
          teamColor: ""
      }
    );

  const teamColor = color;

  const [updateSoccerTeam, { error }] = useMutation(UPDATE_TEAM, {
    refetchQueries: [ QUERY_SOCCERTEAMS ]
 });

  const handleColorChange = (value) => {
    console.log("onChange=", value);
    console.log("new value", "#" + value.hex)
    setColor("#" + value.hex);

  }
  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleTeamFormSubmit = async (event) => {
    event.preventDefault();

    const teamDetails = {...formState, teamColor, teamPic}
    console.log("Team Details", teamDetails)
    
    try {
      const { data } = await updateSoccerTeam({
        variables: { soccerTeamId: soccerTeamId, soccerTeam: teamDetails },
      });

      handleCloseEdit();
      
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleTeamFormSubmit}>
        <FormControl fullWidth sx={{ gap:4 }}>

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

          <Input
            id="teamPic" 
            name="teamPic"
            label="Team Photo" 
            type="file"
            accept="image/*"
            variant="outlined" 
            color="secondary"
            // value={teamPic}
            onChange={uploadImage}
            inputlabelprops={{ shrink: true }} 
        />

            <ColorPicker
                id="teamColor"
                name="teamColor"
                label="Team Color"
                defaultValue="#000"
                value={teamColor}
                onChange={handleColorChange}
            />

            <Button
            variant="contained"
            type="submit"
            sx={teamsStyle.formButton}
            fullWidth
            disableElevation
            >
              <Typography variant="h3">Edit Team</Typography>

            </Button>
        </FormControl>

        <Typography variant="p" color="secondary.contrastText">
          {error && <div>{error.message}</div>}
        </Typography>

      </form>
    </div>
  );
}

export default EditTeam;