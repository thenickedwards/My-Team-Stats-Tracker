import React from 'react'

import {
    Container, 
    CssBaseline,
    Grid,
    Box,
    Paper,
    Typography,
    Tabs,
    Tab
  } from "@mui/material";
  import PropTypes from 'prop-types';
  import { DataGrid } from '@mui/x-data-grid';
  import IconButton from '@mui/material/IconButton';
  import AddIcon from '@mui/icons-material/Add';

// ////////////////////////////////////
//   DATAGRID (TEMPORARY DATA)
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
// ////////////////////////////////////


// Styles

const teamStyle = {
    statsPaper: {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        p:2, 
        borderRadius: 4
    },
    teamRoster: {
        backgroundColor: "black", 
        borderRadius: '100%', 
        width: '50px', 
        height: '50px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginRight: '15px'
    }

}


export default function Team() {


    // Functionality for Tabs
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    }
      function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      
      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      };
      
      function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }


  return (
        <>
            <CssBaseline />
            <Container
                disableGutters
                alignItems="center"
                justifyContent="center"
                // maxWidth="false"
            >

                <Grid container  
                    spacing={5} 
                    sx={{py: 8, px: 5}}
                >

                    <Grid item 
                     xs={12}
                     s={12}
                     md={8}
                     lg={8} >

                {/* Team Heading */}
                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', mb: 5}}>

                            <img src='images/chicago.png' alt="Chicago Logo" height='70px' width='auto'/>

                            <Typography variant='h1' color='secondary.contrastText'>
                                Chicago Football Club
                            </Typography>

                        </Box>

                {/* Team Stats */}

                        <Grid container spacing={{xs:4}}>

                            {/* Stats Cards. Map over this section. */}
                            <Grid item xs={6} s={6} md={3} lg={3}  >
                                
                                <Paper elevation={5} sx={teamStyle.statsPaper} >

                                    <Typography variant='h1' color='secondary.contrastText'>
                                        4
                                    </Typography>
                                    <Typography variant='h6' color='secondary.contrastText'>
                                        Played
                                    </Typography>

                                </Paper>
                            </Grid>
                            {/* End Stats Cards mapping. */}

                            {/* ----------------------------------------------------- */}
                            {/* Temporary Data. Delete */}
                            <Grid item xs={6} s={6} md={3} lg={3} >
                                <Paper elevation={5} sx={teamStyle.statsPaper}>

                                    <Typography variant='h1' color='secondary.contrastText'>
                                        4
                                    </Typography>
                                    <Typography variant='h6'  color='secondary.contrastText'>
                                        Played
                                    </Typography>

                                </Paper>
                            </Grid>

                            <Grid item xs={6} s={6} md={3} lg={3}>
                                <Paper elevation={5} sx={teamStyle.statsPaper} >

                                    <Typography variant='h1' color='secondary.contrastText'>
                                        4
                                    </Typography>
                                    <Typography variant='h6' color='secondary.contrastText'>
                                        Played
                                    </Typography>

                                </Paper>
                            </Grid>

                            <Grid item xs={6} s={6} md={3} lg={3}>
                                <Paper elevation={5} sx={teamStyle.statsPaper} >

                                    <Typography variant='h1' color='secondary.contrastText'>
                                        4
                                    </Typography>
                                    <Typography variant='h6' color='secondary.contrastText'>
                                        Played
                                    </Typography>

                                </Paper>
                            </Grid>
                            {/* End Temporary Data. */}
                            {/* ----------------------------------------------------- */}
                            

                        {/* Tabs */}

                        <Box sx={{ width: '100%', mt: 5 }}>
                            <Box >
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                                sx={{
                                    "& .MuiButtonBase-root.MuiTab-root": {
                                        fontSize: '1.25em',
                                        alignItems: 'flex-start',
                                        marginLeft: '25px',
                                        padding: '12px 16px 12px 2px'
                                    },
                                    "& .MuiTabs-indicator": {
                                        display: "none",
                                    },
                                    '& .Mui-selected': {
                                        borderTop: '3px solid #F5E410',
                                    },
                                    '& .MuiButtonBase-root.MuiTab-root.Mui-selected': {
                                        color: '#062740'
                                    },
                                    '& .MuiBox-root': {
                                        padding: '24px 0 24px 24px'
                                    }
                                }}>
                                <Tab label="Games" {...a11yProps(0)} />
                                <Tab label="Schedule" {...a11yProps(1)} />
                                <Tab label="Stats" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                
                                
                    {/* Games */}
                            <div style={{ height: 400, width: '100%'}}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    className={'customDataGrid'}
                                    sx={{
                                        '&.MuiDataGrid-root': {
                                            border: 'none',
                                            fontFamily: 'Helvetica, sans-serif'
                                        },
                                        '& .MuiDataGrid-iconSeparator': {
                                            display: 'none',
                                        },
                                        '& .MuiDataGrid-columnHeaders': {
                                            fontFamily: '"Bebas Neue", Arial, sans-serif',
                                            fontSize: '1.25em',
                                            bgcolor: 'secondary.main',
                                            color: 'primary.contrastText',
                                        },
                                        '& .MuiDataGrid-cell': {
                                            border:'0'
                                        }
                                        
                                    }}
                               
                                    // checkboxSelection
                                />
                            </div>


                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                            </Box>              



                        </Grid>
                    </Grid>

                {/* Right Side */}

                    <Grid item  
                    xs={12}
                     s={12}
                     md={4}
                     lg={4}>

                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px', mb: 5}}>
                            <Typography variant='h3'>
                                Team Roster
                            </Typography>
                            <IconButton aria-label="Add Player" size="medium"
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

                         {/* Players */}

                        <Grid container sx={{display: 'flex', flexDirection:'column'}}>

                            {/* Player Details. Map over this section. */}
                            <Grid item sx={{display: 'flex', flexDirection:'row', mb: 3}}>
                                <Box style={teamStyle.teamRoster}>
                                    <img src='images/player-default-profile.png' alt="Player Profile Icon" width="30px" height="auto" style={{padding: '10px 0 0 0'}}/>
                                </Box>
                          
                                <Box>
                                    <Typography variant='h3'>
                                        #11
                                    </Typography>
                                    <Typography variant='h6'>
                                        Antonio Sanchez
                                    </Typography>
                                </Box>
                            </Grid>
                            {/* End Player Details Mapping. */}
                           

                            {/* ----------------------------------------------------- */}
                            {/* Temporary Data. Delete */}                          
                            <Grid item sx={{display: 'flex', flexDirection:'row', mb: 3}}>

                                <Box style={teamStyle.teamRoster}>
                                    <img src='images/player-default-profile.png' alt="Player Profile Icon" width="30px" height="auto" style={{padding: '10px 0 0 0'}}/>
                                </Box>
                          
                                <Box>
                                    <Typography variant='h3'>
                                        #11
                                    </Typography>
                                    <Typography variant='h6'>
                                        Antonio Sanchez
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item sx={{display: 'flex', flexDirection:'row', mb: 3}}>
                                <Box style={teamStyle.teamRoster}>
                                    <img src='images/player-default-profile.png' alt="Player Profile Icon" width="30px" height="auto" style={{padding: '10px 0 0 0'}}/>
                                </Box>
                          
                                <Box>
                                    <Typography variant='h3'>
                                        #11
                                    </Typography>
                                    <Typography variant='h6'>
                                        Antonio Sanchez
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item sx={{display: 'flex', flexDirection:'row', mb: 3}}>
                                <Box style={teamStyle.teamRoster}>
                                    <img src='images/player-default-profile.png' alt="Player Profile Icon" width="30px" height="auto" style={{padding: '10px 0 0 0'}}/>
                                </Box>
                          
                                <Box>
                                    <Typography variant='h3'>
                                        #11
                                    </Typography>
                                    <Typography variant='h6'>
                                        Antonio Sanchez
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item sx={{display: 'flex', flexDirection:'row', mb: 3}}>
                                <Box style={teamStyle.teamRoster}>
                                    <img src='images/player-default-profile.png' alt="Player Profile Icon" width="30px" height="auto" style={{padding: '10px 0 0 0'}}/>
                                </Box>
                          
                                <Box>
                                    <Typography variant='h3'>
                                        #11
                                    </Typography>
                                    <Typography variant='h6'>
                                        Antonio Sanchez
                                    </Typography>
                                </Box>
                            </Grid>

                            {/* Temporary Data. Delete */}
                            {/* ----------------------------------------------------- */}
                              


                        </Grid>

                    </Grid>
           
                </Grid>

            </Container>

        </>
        )
  }


