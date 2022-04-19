import React from 'react'
import {
  Container, 
  CssBaseline,
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Modal,
  Select, 
  OutlinedInput, 
  MenuItem,
  InputLabel
  
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';


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



//  Multiselect
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

// Seasons Modal Select Team (TEMPORARY DATA)

const teams = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

// Select Team

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }



// STYLES

const leagueStyle = {
  addPlayerModal: {
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

export default function League() {

  // Functionality for Select Team Dropdown

  // const theme = useTheme();
  const [teamName, setTeamName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTeamName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    }
    // Functionality for Add Season Modal
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

  return (

    <>
    <CssBaseline />
    <Container
        disableGutters
        // alignItems="center"
        justify="center"
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


        {/* League Heading */}
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', mb: 5}}>

            <img src='images/chicago.png' alt="Chicago Logo" height='70px' width='auto'/>

            <Typography variant='h1' color='secondary.contrastText'>
                Chicago Football Club
            </Typography>

            <IconButton 
              onClick={handleOpen} 
              aria-label="Add Season" size="medium"
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

   
        {/* League Seasons */}

        <Grid container spacing={{xs:4}}>

        <Box 
        sx={{ width: '100%', mt: 8 }}
        >

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

                    {/* Add Player Modal */}

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={leagueStyle.addPlayerModal}>
                        <Typography id="modal-modal-title" variant="h1" sx={{mb:4}}>
                            Add Season
                        </Typography>

                <form>
                        <FormControl fullWidth sx={{gap:4}}>

                        <TextField 
                            id="seasonName" 
                            label="Season Name" variant="outlined" color="secondary"
                            InputLabelProps={{ shrink: true }} 
                         />

                            {/* <InputLabel htmlFor="firstName" variant='h3'> First Name</InputLabel> */}
                            <TextField id="startYear" label="Start Year" variant="outlined" color="secondary"
                            InputLabelProps={{ shrink: true }} 
                         />
                            <TextField 
                            id="endYear" 
                            label="End Year" variant="outlined" color="secondary"
                            InputLabelProps={{ shrink: true }} 
                         />

          <FormControl> 
            <InputLabel id="multiple-team-label"
             InputLabelProps={{ shrink: true }} >Teams</InputLabel>
                  <Select
                      displayEmpty
                      labelId="multiple-team-label"
                      id="multiple-team"
                      multiple
                      value={teamName}
                      onChange={handleChange}
                      input={<OutlinedInput label="Team Name" />}
                      
                      MenuProps={MenuProps}
                    >
                      <MenuItem disabled value="">
                        <em>Select Teams</em>
                      </MenuItem>

                      {teams.map((team) => (
                        <MenuItem 
                          key={team}
                          value={team}
                          
                        >
                          {team}
                        </MenuItem>
                      ))}
              </Select>
              </FormControl>





                        <Button
                        variant="contained"
                        type="submit"
                        sx={leagueStyle.formButton}
                        fullWidth
                        disableElevation
                        >
                        <Typography variant="h3">Add Season</Typography>
                        </Button>

</FormControl>
                      </form>

                        </Box>
                    </Modal>



          </Grid>
    
            
      

    </Container>

</>

  )
}