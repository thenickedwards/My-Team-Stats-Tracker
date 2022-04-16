import React from 'react'

import {
    Container, 
    CssBaseline,
    Grid,
    Box,
    Paper,
    Typography,
    // TextField,
    // Typography,
    // Link,
  } from "@mui/material";



export default function Team() {
  return (
        <>
            <CssBaseline />
            <Container
                disableGutters
                maxWidth="false"
            >

                <Grid item>

                    <Grid item>

                {/* Team Heading */}
                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px'}}>

                            <img src='images/chicago.png' alt="Chicago Logo" height='70px' width='auto'/>

                            <Typography variant='h1'>
                                Chicago Football Club
                            </Typography>

                        </Box>

                {/* Team Stats */}

                        <Grid container>
                            <Grid item xs={3}>
                                <Paper elevation={5} >

                                    <Typography variant='h1'>
                                        4
                                    </Typography>
                                    <Typography variant='p'>
                                        Played
                                    </Typography>

                                </Paper>
                            </Grid>

                            <Grid item xs={3}>
                                <Paper elevation={5} >

                                    <Typography variant='h1'>
                                        4
                                    </Typography>
                                    <Typography variant='p'>
                                        Played
                                    </Typography>

                                </Paper>
                            </Grid>

                            <Grid item xs={3}>
                                <Paper elevation={5} >

                                    <Typography variant='h1'>
                                        4
                                    </Typography>
                                    <Typography variant='p'>
                                        Played
                                    </Typography>

                                </Paper>
                            </Grid>

                            <Grid item xs={3}>
                                <Paper elevation={5} >

                                    <Typography variant='h1'>
                                        4
                                    </Typography>
                                    <Typography variant='p'>
                                        Played
                                    </Typography>

                                </Paper>
                            </Grid>


                        </Grid>


                    </Grid>

                    <Grid item>

                    </Grid>

                    
                </Grid>

            </Container>

        </>
        )
}





