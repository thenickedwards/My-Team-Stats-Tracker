import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_SOCCERPLAYER } from "../../utils/mutations";
import { QUERY_SOCCERTEAM, QUERY_SOCCERTEAMS } from "../../utils/queries";
import { useParams } from "react-router-dom";

// MUI Imports
import {
  Typography,
  FormControl,
  TextField,
  Input,
  // InputLabel,
  // Select,
  // MenuItem,
  // OutlinedInput,
  Button,
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
const teamStyle = {
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
  formButton: {
    height: 50,
    marginTop: "-30px",
    backgroundColor: "secondary.main",
    "&:hover": {
      backgroundColor: "primary.main",
    },
  },
};


const AddPlayer = ({ handleClose }) => {

// Upload Image
const [ imageLoading, setImageLoading ] = useState(false);
const [ image, setImage ] = useState({
  playerPic: "",
})

const playerPic = image;

// Function to Upload Image
//  *Could be created into a component
const uploadImage = async e => {

  const files = e.target.files;

  const data = new FormData();
  data.append('file', files[0]);

  data.append('upload_preset', 'zqaezwbg');
  data.append('cloud_name', 'dv12r4xtz');

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





  const { teamId } = useParams();
  const { soccerTeamId } = useParams();
  const { loading, data } = useQuery(QUERY_SOCCERTEAMS);
  const teams = data?.allSoccerTeams || [];

  console.log(teams);

  // Functionality to Adding League via Form
  const [formState, setFormState] = useState({
    playerFirstName: "",
    playerLastName: "",
    // playerPic: "",
    playerNumber: "",
    team: soccerTeamId,
  });

  // const { playerFirstName, playerLastName, playerPic, playerNumber, team } =
  //   formState;

  const { playerFirstName, playerLastName, playerNumber, team } =
  formState;

  const [addPlayer, { error }] = useMutation(ADD_SOCCERPLAYER, {
    refetchQueries: [QUERY_SOCCERTEAM],
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handlePlayerFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    const playerDetails = {...formState, teamId, playerPic}
    console.log("Player Details:", playerDetails)

    try {
      const { data } = await addPlayer({
        // variables: { roster: { ...formState, teamId } },
        variables: { roster: playerDetails },
      });
      console.log(data);

      console.log("Player Details:", formState);

      setFormState({
        playerFirstName: "",
        playerLastName: "",
        // playerPic: "",
        playerNumber: "",

      });

      setImage({
        playerPic: "",
      })

      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div>LOADING</div>;
  }


  return (
    <div>
      <form onSubmit={handlePlayerFormSubmit}>
        <FormControl fullWidth sx={{ gap: 4 }}>
          <TextField
            id="playerFirstName"
            name="playerFirstName"
            label="First Name"
            variant="outlined"
            color="secondary"
            value={playerFirstName}
            onChange={handleFormChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            id="playerLastName"
            name="playerLastName"
            label="Last Name"
            variant="outlined"
            color="secondary"
            value={playerLastName}
            onChange={handleFormChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            id="playerNumber"
            name="playerNumber"
            label="Player Number"
            variant="outlined"
            color="secondary"
            value={playerNumber}
            onChange={handleFormChange}
            InputLabelProps={{ shrink: true }}
          />

          {/* TODO: Add Upload Photo Field (Future Development) */}

          {/* <TextField
            id="playerPic"
            name="playerPic"
            label="Player Photo"
            variant="outlined"
            color="secondary"
            value={playerPic}
            onChange={handleFormChange}
            InputLabelProps={{ shrink: true }}
          /> */}

          {/* IMAGE UPLOAD */}

          <Input
            id="playerPic"
            name="playerPic"
            label="Player Photo"
            type="file"
            acept="image/*"
            variant="outlined"
            color="secondary"
            // value={playerPic}
            onChange={uploadImage}
            inputlabelprops={{ shrink: true }}
          />


        {/* Hidden field gets value from leagueId in URL */}
        <TextField
            hiddenLabel
            type="hidden"
            labelId="team"
            id="team"
            name="team"
            value={team}
            onChange={handleFormChange}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
        />

          {/* <FormControl>
            <InputLabel id="team">Team</InputLabel>
            <Select
              //   displayEmpty
              labelId="team"
              id="team"
              name="team"
              type="text"
              //   multiple
              value={team}
              onChange={handleFormChange}
              input={<OutlinedInput label="Team" />}
              MenuProps={MenuProps}
            >
              <MenuItem disabled value="">
                <em>Select Team</em>
              </MenuItem>

              {teams.map((team) => (
                <MenuItem key={team} value={team._id}>
                  {team.teamName}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}

          <Button
            variant="contained"
            type="submit"
            sx={teamStyle.formButton}
            fullWidth
            disableElevation
          >
            <Typography variant="h3">Add Player</Typography>

            <Typography variant="p" color="secondary.contrastText">
              {error && <div>{error.message}</div>}
            </Typography>
            
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default AddPlayer;
