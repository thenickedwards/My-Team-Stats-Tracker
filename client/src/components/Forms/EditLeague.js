import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_LEAGUE } from "../../utils/mutations";
import { QUERY_LEAGUES } from "../../utils/queries";

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


const sports = ["Soccer"];

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
const leaguesStyle = {
  formButton: {
    height: 50,
    color: 'primary.contrastText',
    backgroundColor: "secondary.main",
    "&:hover": {
      backgroundColor: "primary.main",
    },
  },
};


const EditLeague = ( {leagueId, handleCloseEdit} ) => {


// Upload Image
const [ imageLoading, setImageLoading ] = useState(false)
const [ image, setImage ] = useState({
  leaguePic:""
});

const leaguePic = image;

// Function to Upload Image
//  *Could be created into a component
const uploadImage = async e => {

  const files = e.target.files;

  const data = new FormData();
  data.append('file', files[0]);

  data.append("upload_preset", "zqaezwbg");
  data.append("cloud_name", "dv12r4xtz");
  // data.append("upload_preset", process.env.CLOUD_PRESET);
  // data.append("cloud_name", process.env.CLOUD_NAME);

  setImageLoading(true)

  const res = await fetch( "https://api.cloudinary.com/v1_1/dv12r4xtz/image/upload", {
    method: "POST", 
    body: data
  })

 const file = await res.json();
 console.log("File:", file);
 
 setImage(file.secure_url)
 console.log("File URL:", file.secure_url)

 setImageLoading(false)

}

  // Functionality for Adding League via Form
  const [formState, setFormState] = useState({
      // leagueName: "",
      leagueName: "",
      sport:"",
      // leaguePic:""
  });

  // const { leagueName, sport, leaguePic } = formState;
  const { leagueName, sport } = formState;

  const [updateLeague, { error }] = useMutation(UPDATE_LEAGUE, {
    refetchQueries: [ QUERY_LEAGUES ]
 });


  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleLeagueFormSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await updateLeague({
        variables: { leagueId: leagueId, league: {...formState, leaguePic} },
      });

      handleCloseEdit();
      
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleLeagueFormSubmit}>
        <FormControl fullWidth sx={{ gap: 4 }}>
          <TextField
            id="leagueName"
            name="leagueName"
            label="League Name"
            type="text"
            variant="outlined"
            color="secondary"
            value={leagueName}
            onChange={handleFormChange}
            InputLabelProps={{ shrink: true }}
          />

          <FormControl>
            <InputLabel id="sport">Sport</InputLabel>
            <Select
              labelId="sport"
              id="sport"
              name="sport"
              type="text"
              value={sport}
              onChange={handleFormChange}
              input={<OutlinedInput label="Sport Name" />}
              MenuProps={MenuProps}
            >
              <MenuItem disabled value="">
                <em>Select Sport</em>
              </MenuItem>

              {sports.map((sport) => (
                <MenuItem key={sport} value={sport}>
                  {sport}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <TextField
            id="leaguePic"
            name="leaguePic"
            label="League Picture"
            type="text"
            variant="outlined"
            color="secondary"
            value={leaguePic}
            onChange={handleFormChange}
            InputLabelProps={{ shrink: true }}
          /> */}

        <Input
            id="leaguePic"
            name="leaguePic"
            label="League Picture"
            type="file"
            accept="image/*"
            variant="outlined"
            color="secondary"
            // value={leaguePic}
            // onChange={handleFormChange}
            onChange={uploadImage}
            inputlabelprops={{ shrink: true }}
          />


          {/* TODO: Add Upload Photo Field (Future Development) */}

          <Button
            variant="contained"
            type="submit"
            sx={leaguesStyle.formButton}
            fullWidth
            disableElevation
          >
            <Typography variant="h3">Edit League</Typography>
          </Button>
        </FormControl>

        <Typography variant="p" color="secondary.contrastText">
          {error && <div>{error.message}</div>}
        </Typography>
              
      </form>
    </div>
  );
}

export default EditLeague;