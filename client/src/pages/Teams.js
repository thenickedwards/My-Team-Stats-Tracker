import * as React from 'react';

// Material UI Imports
import { 
    Box,
    Container,
    Grid,
    IconButton,
    Paper,
    Typography,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
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
    }
  }

export default function Teams() {
    
    // Functionality for Dropdown
    const [season, setSeason] = React.useState('');
    const handleSeasonChange = (event) => {
        setSeason(event.target.value);
    };
    
    // Functionality for Add League Modal
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
            </Grid>
        </Grid>

      </Container>
    );
  }