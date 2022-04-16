import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container";


export default function Leagues() {
    return (
      <Container style={{backgroundColor: 'primary.light'}} sx={{ width: '100%' }}>

        <Box>
            <Typography variant="h1" component="div" gutterBottom>
            Leagues
            </Typography>
        </Box>
        
        <Grid container spacing={2}>
            <Grid item>

                <Paper elevation={3}>
                    <Typography variant="h6" gutterBottom component="div">
                        Washington Premier League
                    </Typography>
                </Paper>

            </Grid>
        </Grid>
        
      </Container>
    );
  }