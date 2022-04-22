import {useState} from 'react'
import { useMutation } from "@apollo/client";

import {
    Typography,
    FormControl,
    TextField,
    Button,
  } from "@mui/material";
import { ADD_SOCCERPLAYER } from '../../utils/mutations';
import { QUERY_SOCCERPLAYERS } from '../../utils/queries';

  // STYLES

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
      backgroundColor: "secondary.main",
      "&:hover": {
        backgroundColor: "primary.main",
      },
      }
  }


export default function AddPlayer( {handleClose} ) {

    ///////////////////
    // Functionality to Adding League via Form
    const [formState, setFormState] = useState({
        playerFirstName: "",
        playerLastName: "",
        playerPic: "",
        playerNumber: ""
      });
    
    
      const { playerFirstName, playerLastName, playerPic, playerNumber } = formState;

      const [addPlayer, { error }] = useMutation(ADD_SOCCERPLAYER, {
        refetchQueries: [ QUERY_SOCCERPLAYERS ]
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

    
        try {
          const { data } = await addPlayer({
            variables: { player: {...formState} },
          });

        console.log("Player Details:", formState)
    
          setFormState({
            playerFirstName: "",
            playerLastName: "",
            playerPic: "",
            playerNumber: ""
          });

          handleClose();
          
        } catch (e) {
          console.error(e);
        }
      };


  return (
    <form onSubmit={handlePlayerFormSubmit}>
        <FormControl fullWidth sx={{ gap: 4 }}>
            <TextField
            id="playerFirstName"
            name='playerFirstName'
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
            name='playerNumber'
            label="Player Number"
            variant="outlined"
            color="secondary"
            value={playerNumber}
            onChange={handleFormChange}
            InputLabelProps={{ shrink: true }}
            />

            {/* IMAGE UPLOAD PLACEHOLDER */}
            <TextField
            id="playerPic"
            name='playerPic'
            label="Player Photo"
            variant="outlined"
            color="secondary"
            value={playerPic}
            onChange={handleFormChange}
            InputLabelProps={{ shrink: true }}
            />

            <Button
            variant="contained"
            type="submit"
            sx={teamStyle.formButton}
            fullWidth
            disableElevation
            >
            <Typography variant="h3">Add Player</Typography>
            </Button>
        </FormControl>
    </form>
  )
}
