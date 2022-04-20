import * as React from 'react';

// Material UI Imports
import { 
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { textAlign } from '@mui/system';


// Styles
const teamsStyle = {
    teamPaper: {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        borderRadius: 4,
        height: "200px",
        margin: "auto",
        pt: 3
    },
    teamPaperText: {
        width: "70%",
        margin: "auto",
        textAlign: "center"
    },
    addTeamModal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 24,
        p: 4,
    },
    formButton: { 
        height: 50, 
        backgroundColor: "secondary.main",
        "&:hover": {
          backgroundColor: "primary.main",
        },
    },
  }

export default function Teams() {
    
    // Functionality for Dropdowns
    const [league, setLeague] = React.useState('');
    const handleLeagueChange = (event) => {
        setLeague(event.target.value);
    };
    
    const [season, setSeason] = React.useState('');
    const handleSeasonChange = (event) => {
        setSeason(event.target.value);
    };
    
    // Functionality for Add Team Modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
      <Container  alignItems="center" justifyContent="center">


        {/* Page styling */}
        <Box sx={{position: 'absolute', top: 100, right: 15}}>
            <img src='images/abstract-up-arrows.png' alt="Abstract graphic with arrows." width='60px'/>
        </Box>
        
        <Box sx={{position: 'absolute', bottom: 40, left: 40}}>
            <img src='images/abstract-corner-dots-lines.png' alt="Abstract graphic with dots and lines." width='250px'/>
        </Box>

        <Grid container sx={{py: 8, px: 5}} position="relative">

            {/* Header and "Add" button */}
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', mb: 5}}>

                <Typography variant="h1">
                    Teams
                </Typography>

                <IconButton onClick={handleOpen} aria-label="Add Team" size="medium"
                    sx={{
                        backgroundColor: 'secondary.accent',
                        borderRadius: 10,
                        '&:hover': {
                            backgroundColor: 'primary.main'
                        }
                    }}>
                    <AddIcon fontSize="inherit" sx={{color: '#ffffff'}}/>
                </IconButton>

            </Box>
            
            {/* Dropdown. League Selector. */}
            <FormControl size="small" 
                sx={{ 
                    m: 1, 
                    minWidth: '100%', 
                    mb: 5, 
                    ml: 0,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'secondary.main'
                    }
                }}
                >
                <InputLabel id="select-league">League</InputLabel>
                <Select
                    labelId="select-league"
                    id="select-league"
                    value={league}
                    label="League"
                    onChange={handleLeagueChange}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>

            {/* Dropdown. Season Selector. */}
            <FormControl size="small" 
                sx={{ 
                    m: 1, 
                    minWidth: '100%', 
                    mb: 5, 
                    ml: 0,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'secondary.main'
                    }
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

            {/* Team Cards - Map Over Seeds */}
            <Grid container  spacing={{xs: 4}}>

                {/* ---- Begin temporary filler data ---- */}
                <Grid item  xs={6} s={6} md={3} lg={3}>

                    <Paper elevation={5} sx={teamsStyle.teamPaper} >
                        <img
                        src="images/washington-premier-league.png"
                        alt="logo"
                        loading="lazy"
                        height={100}
                        />
                        <Typography variant="p" gutterBottom component="div" sx={teamsStyle.teamPaperText}>
                            Washington Premier League
                        </Typography>
                    </Paper>

                </Grid>
                <Grid item  xs={6} s={6} md={3} lg={3}>

                    <Paper elevation={5} sx={teamsStyle.teamPaper}>
                        <img
                        src="images/WSA.png"
                        alt="logo"
                        loading="lazy"
                        height={100}
                        />
                        <Typography variant="p" gutterBottom component="div" sx={teamsStyle.teamPaperText}>
                            Washington Soccer Academy
                        </Typography>
                    </Paper>

                </Grid>
                <Grid item  xs={6} s={6} md={3} lg={3}>

                    <Paper elevation={5} sx={teamsStyle.teamPaper}>
                        <img
                        src="images/chicago.png"
                        alt="logo"
                        loading="lazy"
                        height={100}
                        />
                        <Typography variant="p" gutterBottom component="div" sx={teamsStyle.teamPaperText}>
                            Washington Premier League
                        </Typography>
                    </Paper>

                </Grid>
                <Grid item  xs={6} s={6} md={3} lg={3}>

                    <Paper elevation={5} sx={teamsStyle.teamPaper}>
                        <img
                        src="images/chicago.png"
                        alt="logo"
                        loading="lazy"
                        height={100}
                        />
                        <Typography variant="p" gutterBottom component="div" sx={teamsStyle.teamPaperText}>
                            Washington Premier League
                        </Typography>
                    </Paper>

                </Grid>
                {/* ---- End temporary filler data ---- */}

            </Grid>

            {/* Add Team Modal */}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={teamsStyle.addTeamModal}>
                    <Typography id="modal-modal-title" variant="h1" sx={{mb:4}}>
                        Add Team
                    </Typography>

                
                    <FormControl fullWidth sx={{gap:4}}>

                        <TextField id="teamName" label="Team Name" variant="outlined" color="secondary"
                        InputLabelProps={{ shrink: true }} 
                        />
                        
                        {/* TODO: Add color picker? */}
                        <TextField id="teamColor" label="Team Color" variant="outlined" color="secondary"
                        InputLabelProps={{ shrink: true }} 
                        />

                        <TextField id="season" label="Season" variant="outlined" color="secondary"
                        InputLabelProps={{ shrink: true }} 
                        />

                        <TextField id="games" label="Games" variant="outlined" color="secondary"
                        InputLabelProps={{ shrink: true }} 
                        /> 

                        <TextField id="roster" label="Roster" variant="outlined" color="secondary"
                        InputLabelProps={{ shrink: true }} 
                        />    

                        {/* TODO: Add Upload Photo Field */}

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

                </Box>
            </Modal>
        </Grid>
      </Container>
    );
  }