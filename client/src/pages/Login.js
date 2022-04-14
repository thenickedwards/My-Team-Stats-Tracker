// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../utils/mutations';

// import Auth from '../utils/auth';

// MATERIALS
import { CssBaseline, Container, Grid, Box, TextField, Button } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// import CssBaseline from '@mui/material/CssBaseline';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

///////////////////

const loginStyle = {
  background: {
    height: "100vh",
    backgroundImage: 'url("/images/login-background.png")',            
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  textField: {
    backgroundColor: "white",
    borderRadius: "5px",
    border: "none"
  }

}



// const useStyles = makeStyles(() => ({
//   textField: {
//     backgroundColor: "#ffffff",
//   },
//   input: {
//     color: "white"
//   }
// }))

const Login = () => {

  // const classes = useStyles();
// const Login = (props) => {
  // const [formState, setFormState] = useState({ email: '', password: '' });
  // const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   setFormState({
  //     ...formState,
  //     [name]: value,
  //   });
  // };

  // submit form
  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(formState);
  //   try {
  //     const { data } = await login({
  //       variables: { ...formState },
  //     });

  //     Auth.login(data.login.token);
  //   } catch (e) {
  //     console.error(e);
  //   }

    // clear form values
    // setFormState({
    //   email: '',
    //   password: '',
    // });
  // };
 
  return (
    <>
    <CssBaseline />
    <Container disableGutters maxWidth="false" sx={{ bgcolor: '#062740', height: '100vh' }}>
      

      <Grid spacing={2} container alignItems="center" style={{position: "relative"}}>

        <Grid xs={12} s={12} md={8} lg={8} style={loginStyle.background}>
          {/* Background Image */}
        </Grid>


        <Grid xs={12} s={12} md={4} lg={4} sx={{ p: 5, bgcolor: '#062740' }}             
             >
          
        <img src="images/login-slashes.png" alt="Abstract"  style={{position: "absolute", top:"0", right: "0"}} /> 

          <Box sx={{ display: 'flex', gap:'25px'}}>

            <h1>Login</h1>

            <img src="images/login-line.png" alt="Abstract" /> 

            <h1>Signup</h1>

          </Box>
      


          <Box component="form" >

            <div>
              <TextField fullWidth
                id="email-input"
                placeholder="Email"
                type="email"
                margin="normal"
                style={loginStyle.textField}
              />

              <TextField fullWidth
                id="password-input"
                placeholder="Password"
                type="password"
                margin="normal"
                style={loginStyle.textField}
              />

              <Button 
                variant="contained"  
                sx={{ mt: 2, height: 50, bgcolor: "#105F9A" }}
                fullWidth
                disableElevation>
                Login
              </Button>
        </div>
          {/* <form onSubmit={handleFormSubmit}> */}
          {/* <form>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  // value={formState.email}
                  // onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  // value={formState.password}
                  // onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form> */}
            </Box>
          
            <img src="images/login-dots.png" alt="Abstract"  style={{position: "absolute", bottom:"30px", right: "0"}} /> 

        </Grid>
      </Grid>


      {/*  */}
    {/* <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Login</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : ( */}
              {/* <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Test Button
                </button>
              </form> */}
            {/* )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main> */}
{/*  */}



    </Container>
    </>
  );
}
;

export default Login;
