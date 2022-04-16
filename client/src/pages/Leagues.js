import * as React from 'react';

// Material UI Imports
import { 
    Box,
    Typography,
    Button,
    Paper,
    Grid,
    Container
} from '@mui/material';


export default function Leagues() {
    return (
      <Container sx={{ width: '100%' }}>

        {/* Header and "Add" button */}
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px'}}>
            <Typography variant="h1" component="div" gutterBottom>
                Leagues
            </Typography>
            <Button>
                +
            </Button>
        </Box>
        
        {/* League Cards */}
        <Grid container spacing={2}>
            <Grid>
                <Paper elevation={3}>
                    <img
                    src="images/washington-premier-league.png"
                    alt="logo"
                    loading="lazy"
                    />
                    <Typography variant="p" gutterBottom component="div">
                        Washington Premier League
                    </Typography>
                </Paper>
            </Grid>
            <Grid>
                <Paper elevation={3}>
                    <img
                    src="images/WSA.png"
                    alt="logo"
                    loading="lazy"
                    />
                    <Typography variant="p" gutterBottom component="div">
                        Washington Soccer Academy
                    </Typography>
                </Paper>
            </Grid>
            <Grid>
                <Paper elevation={3}>
                    <img
                    src="images/chicago.png"
                    alt="logo"
                    loading="lazy"
                    />
                    <Typography variant="p" gutterBottom component="div">
                        Washington Premier League
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
        
      </Container>
    );
  }