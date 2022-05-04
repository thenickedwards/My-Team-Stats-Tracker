import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
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
} from '@mui/material';
import { ADD_SOCCERTEAM } from '../../utils/mutations';
import { QUERY_SEASONS, QUERY_SOCCERTEAMS } from '../../utils/queries';


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
  }


export default function AddTeam( {handleClose} ) {

    // Functionality for Select Team Dropdown
    const { loading, data } = useQuery(QUERY_SEASONS);
    const seasons = data?.allSeasons || [];

      // Functionality for Adding League via Form
    const [formState, setFormState] = useState({
            teamName: "",
            season: "",
            teamPic: "",
        });

    const { teamName, season, teamPic } = formState;

    const [color, setColor] = useState(
        createColor("#000"), 
        {
            teamColor: ""
        }
    );

    const teamColor = color;

    const [addTeam, { error }] = useMutation(ADD_SOCCERTEAM, {
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

            const teamDetails = {...formState, teamColor}
            console.log("Team Details", teamDetails)
    
        try {
          const { data } = await addTeam({
            variables: { team: teamDetails },
          });

          setFormState({
            teamName: "",
            season: "",
            teamPic: "",
          });
    
          setColor({
            teamColor: "",
          });

          handleClose();
          
        } catch (e) {
          console.error(e);
        }
      };   

  return (

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

        <TextField 
            id="teamPic" 
            name="teamPic"
            label="Team Photo" 
            variant="outlined" 
            color="secondary"
            value={teamPic}
            onChange={handleFormChange}
            InputLabelProps={{ shrink: true }} 
        />

        <ColorPicker
            id="teamColor"
            name="teamColor"
            label="Team Color"
            defaultValue="#000000"
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
            <Typography variant="h3">Add Team</Typography>

        </Button>

    </FormControl>
</form>
  )
}
