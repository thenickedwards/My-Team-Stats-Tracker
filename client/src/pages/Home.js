import {
  Container, 
  CssBaseline,
  Grid,
  Box,
  Paper,
  Typography,
  // Button
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';


// ////////////////////////////////////
//   DATAGRID (EDIT DATA)
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

//   DATAGRID (TEMPORARY DATA)
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




// STYLES

const homeStyle = {
  statsPaper: {
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',  
      borderRadius: 4,
      paddingBottom: 1
  },
  statsHeader: {
    display: 'flex', 
    justifyContent: 'space-between', 
    width: '100%', 
    backgroundColor: 'secondary.main', 
    color: 'primary.contrastText', 
    padding: '5px 20px'
  },
  statsTeams: {
    display: 'flex',
    width: '100%', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '5px 40px'
  },
  statsTeamDetails: {
    display:'flex', 
    alignItems: 'center', 
    gap: 2
  }
}

const Home = () => {

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
            // spacing={5} 
            sx={{py: 8, px: 5}}
            position="relative"
        >

            

        <Box sx={{position: 'absolute', bottom: 0, left: 0}}>
            <img src='images/abstract-corner-dots-lines.png' alt="Abstract graphic with dots and lines." width='250px'/>
        </Box>

   
        {/* Team Stats */}

                <Grid container spacing={{xs:4}}>

                    {/* Stats Cards. Map over this section. */}
                    <Grid item xs={12} s={12} md={3} lg={3} >
                        
                        <Paper elevation={5} sx={homeStyle.statsPaper} >


                            {/* Header */}
                            <Box sx={homeStyle.statsHeader} className='statsBox'>
                              <Typography variant="p" fontSize={13}>
                                League Name
                              </Typography>
                              <Typography variant="p" fontSize={13}>
                                4/9 @ 8:00pm
                              </Typography>
                            </Box>
                            
                            {/* Team 1 */}
                            <Box sx={homeStyle.statsTeams}>
                              <Box sx={homeStyle.statsTeamDetails}>
                                <img src="images/chicago.png" alt="Team Logo" width="30px" height="auto" />
                                <Typography>Chicago</Typography>
                              </Box>
                              <Typography>5</Typography>
                            </Box>

                             
                            {/* Team 2 */}
                            <Box sx={homeStyle.statsTeams}>
                              <Box sx={homeStyle.statsTeamDetails}>
                                <img src="images/la-galaxy.png" alt="Team Logo" width="30px" height="auto" />
                                <Typography>Los Angeles</Typography>
                              </Box>
                              <Typography>5</Typography>
                            </Box>                        


                        </Paper>
                    </Grid>
                    {/* End Stats Cards mapping. */}

                    {/* ----------------------------------------------------- */}
                    {/* Temporary Data. Delete */}

                    <Grid item xs={12} s={12} md={3} lg={3} >
                        
                        <Paper elevation={5} sx={homeStyle.statsPaper} >


                            {/* Header */}
                            <Box sx={homeStyle.statsHeader} className='statsBox'>
                              <Typography variant="p" fontSize={13}>
                                League Name
                              </Typography>
                              <Typography variant="p" fontSize={13}>
                                4/9 @ 8:00pm
                              </Typography>
                            </Box>
                            
                            {/* Team 1 */}
                            <Box sx={homeStyle.statsTeams}>
                              <Box sx={homeStyle.statsTeamDetails}>
                                <img src="images/chicago.png" alt="Team Logo" width="30px" height="auto" />
                                <Typography>Chicago</Typography>
                              </Box>
                              <Typography>5</Typography>
                            </Box>

                             
                            {/* Team 2 */}
                            <Box sx={homeStyle.statsTeams}>
                              <Box sx={homeStyle.statsTeamDetails}>
                                <img src="images/la-galaxy.png" alt="Team Logo" width="30px" height="auto" />
                                <Typography>Los Angeles</Typography>
                              </Box>
                              <Typography>5</Typography>
                            </Box>                        


                        </Paper>
                    </Grid>



                    <Grid item xs={12} s={12} md={3} lg={3} >
                        
                        <Paper elevation={5} sx={homeStyle.statsPaper} >


                            {/* Header */}
                            <Box sx={homeStyle.statsHeader} className='statsBox'>
                              <Typography variant="p" fontSize={13}>
                                League Name
                              </Typography>
                              <Typography variant="p" fontSize={13}>
                                4/9 @ 8:00pm
                              </Typography>
                            </Box>
                            
                            {/* Team 1 */}
                            <Box sx={homeStyle.statsTeams}>
                              <Box sx={homeStyle.statsTeamDetails}>
                                <img src="images/chicago.png" alt="Team Logo" width="30px" height="auto" />
                                <Typography>Chicago</Typography>
                              </Box>
                              <Typography>5</Typography>
                            </Box>

                             
                            {/* Team 2 */}
                            <Box sx={homeStyle.statsTeams}>
                              <Box sx={homeStyle.statsTeamDetails}>
                                <img src="images/la-galaxy.png" alt="Team Logo" width="30px" height="auto" />
                                <Typography>Los Angeles</Typography>
                              </Box>
                              <Typography>5</Typography>
                            </Box>                        


                        </Paper>
                    </Grid>



                    <Grid item xs={12} s={12} md={3} lg={3} >
                        
                        <Paper elevation={5} sx={homeStyle.statsPaper} >


                            {/* Header */}
                            <Box sx={homeStyle.statsHeader} className='statsBox'>
                              <Typography variant="p" fontSize={13}>
                                League Name
                              </Typography>
                              <Typography variant="p" fontSize={13}>
                                4/9 @ 8:00pm
                              </Typography>
                            </Box>
                            
                            {/* Team 1 */}
                            <Box sx={homeStyle.statsTeams}>
                              <Box sx={homeStyle.statsTeamDetails}>
                                <img src="images/chicago.png" alt="Team Logo" width="30px" height="auto" />
                                <Typography>Chicago</Typography>
                              </Box>
                              <Typography>5</Typography>
                            </Box>

                             
                            {/* Team 2 */}
                            <Box sx={homeStyle.statsTeams}>
                              <Box sx={homeStyle.statsTeamDetails}>
                                <img src="images/la-galaxy.png" alt="Team Logo" width="30px" height="auto" />
                                <Typography>Los Angeles</Typography>
                              </Box>
                              <Typography>5</Typography>
                            </Box>                        


                        </Paper>
                    </Grid>


 


                    {/* End Temporary Data. */}
                    {/* ----------------------------------------------------- */}
                    

              
         
            {/* Upcoming Games */}
                <Box 
                sx={{ width: '100%', mt: 8 }}
                >
                   
                    <Typography variant="h1" sx={{ml: 4, mb: 3}}>Upcoming Games</Typography>

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
                                    fontFamily: 'Helvetica, sans-serif',
                                    marginLeft: '30px'
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
                  
                    </Box>      
                         


            </Grid>
          </Grid>
    
            
      

    </Container>

</>

  );
};

export default Home;
