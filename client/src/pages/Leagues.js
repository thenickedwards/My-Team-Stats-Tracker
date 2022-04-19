import * as React from 'react';

// Material UI Imports
import { 
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    IconButton,
    Modal,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { textAlign } from '@mui/system';


// Styles
const leaguesStyle = {
    leaguePaper: {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        borderRadius: 4,
        height: "200px",
        margin: "auto",
        pt: 3
    },
    leaguePaperText: {
        width: "70%",
        margin: "auto",
        textAlign: "center"
    },
    addLeagueModal: {
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

export default function Leagues() {
    
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
                    Leagues
                </Typography>

                <IconButton onClick={handleOpen} aria-label="Add League" size="medium"
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
            
            {/* League Cards - Map Over Seeds */}
            <Grid container  spacing={{xs: 4}}>
                <Grid item  xs={6} s={6} md={3} lg={3}>

                    <Paper elevation={5} sx={leaguesStyle.leaguePaper} >
                        <img
                        src="images/washington-premier-league.png"
                        alt="logo"
                        loading="lazy"
                        height={100}
                        />
                        <Typography variant="p" gutterBottom component="div" sx={leaguesStyle.leaguePaperText}>
                            Washington Premier League
                        </Typography>
                    </Paper>

                </Grid>
                <Grid item  xs={6} s={6} md={3} lg={3}>

                    <Paper elevation={5} sx={leaguesStyle.leaguePaper}>
                        <img
                        src="images/WSA.png"
                        alt="logo"
                        loading="lazy"
                        height={100}
                        />
                        <Typography variant="p" gutterBottom component="div" sx={leaguesStyle.leaguePaperText}>
                            Washington Soccer Academy
                        </Typography>
                    </Paper>

                </Grid>
                <Grid item  xs={6} s={6} md={3} lg={3}>

                    <Paper elevation={5} sx={leaguesStyle.leaguePaper}>
                        <img
                        src="images/chicago.png"
                        alt="logo"
                        loading="lazy"
                        height={100}
                        />
                        <Typography variant="p" gutterBottom component="div" sx={leaguesStyle.leaguePaperText}>
                            Washington Premier League
                        </Typography>
                    </Paper>

                </Grid>
                <Grid item  xs={6} s={6} md={3} lg={3}>

                    <Paper elevation={5} sx={leaguesStyle.leaguePaper}>
                        <img
                        src="images/chicago.png"
                        alt="logo"
                        loading="lazy"
                        height={100}
                        />
                        <Typography variant="p" gutterBottom component="div" sx={leaguesStyle.leaguePaperText}>
                            Washington Premier League
                        </Typography>
                    </Paper>

                </Grid>
            </Grid>

            {/* Add League Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={leaguesStyle.addLeagueModal}>
                    <Typography id="modal-modal-title" variant="h1" sx={{mb:4}}>
                        Add League
                    </Typography>

                
                    <FormControl fullWidth sx={{gap:4}}>

                        <TextField id="leagueName" label="League Name" variant="outlined" color="secondary"
                        InputLabelProps={{ shrink: true }} 
                        />

                        <TextField id="sport" label="Sport" variant="outlined" color="secondary"
                        InputLabelProps={{ shrink: true }} 
                        />

                        <TextField id="seasons" label="Seasons" variant="outlined" color="secondary"
                        InputLabelProps={{ shrink: true }} 
                        />      

                        {/* TODO: Add Upload Photo Field */}

                        <Button
                        variant="contained"
                        type="submit"
                        sx={leaguesStyle.formButton}
                        fullWidth
                        disableElevation
                        >
                            <Typography variant="h3">Add League</Typography>

                        </Button>

                    </FormControl>

                </Box>
            </Modal>
        </Grid>
      </Container>
    );
  }