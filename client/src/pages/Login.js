import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

// MUI Imports
import {
  CssBaseline,
  Container,
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";


// Styles
const loginStyle = {
  background: {
    height: "100vh",
    backgroundImage: 'url("/images/login-background.png")',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  textField: {
    backgroundColor: "white",
    borderRadius: "5px",
    border: "none",
  },
  formButton: {
    backgroundColor: "primary.main",
    "&:hover": {
      backgroundColor: "secondary.main",
    },
  },
};

const Login = (props) => {
 
  const [formState, setFormState] = useState({ username: "", password: "" });

  const { username, password } = formState;

  const [login, { error, data }] = useMutation(LOGIN_USER);

  // Update State based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Submit Form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // Clear form values
    setFormState({
      username: "",
      password: "",
    });
  };

  return (
    <>
      <CssBaseline />
      <Container
        disableGutters
        maxWidth="false"
        sx={{ bgcolor: "#062740", height: "100vh" }}
      >
        <Grid
          item
          container
          alignItems="center"
          justify="center"
          style={{ position: "relative" }}
        >
          <Grid
            item
            xs={12}
            s={12}
            md={8}
            lg={8}
            order={{ xs: 2, sm: 2, md: 1, lg: 1 }}
            style={loginStyle.background}
          >
            {/* Background Image */}
          </Grid>

          <Grid
            item
            xs={12}
            s={12}
            md={4}
            lg={4}
            order={{ xs: 1, sm: 1, md: 2, lg: 2 }}
            sx={{ px: 5, py: 15, bgcolor: "#062740" }}
          >
            <img
              src="images/login-slashes.png"
              alt="Abstract"
              style={{ position: "absolute", top: "0", right: "0" }}
            />

            <Box
              alignItems="center"
              justify="center"
              sx={{ display: "flex", gap: "25px" }}
            >
              <Typography variant="h1" color="primary.contrastText">
                Login
              </Typography>

              <img src="images/login-line.png" alt="Abstract" />

              <Link
                variant="h1"
                href="/signup"
                underline="none"
                color="secondary.light"
              >
                Signup
              </Link>
            </Box>

            <Box>
              <div>
                {data ? (
                  <p>
                    Success! You may now head{" "}
                    <Link href="/">back to the homepage.</Link>
                  </p>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <TextField
                      fullWidth
                      id="username"
                      name="username"
                      placeholder="Username"
                      type="text"
                      margin="normal"
                      style={loginStyle.textField}
                      inputProps={{ style: { textTransform: "lowercase" } }}
                      value={username.toLowerCase()}
                      onChange={handleChange}
                    />

                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      placeholder="Password"
                      type="password"
                      margin="normal"
                      style={loginStyle.textField}
                      value={password}
                      onChange={handleChange}
                    />

                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ mt: 2, height: 50 }}
                      style={loginStyle.formButton}
                      fullWidth
                      disableElevation
                    >
                      <Typography variant="h3">Login</Typography>
                    </Button>
                  </form>
                )}
                <Typography variant="p" color="primary.contrastText">
                  {error && <div>{error.message}</div>}
                </Typography>
              </div>
            </Box>

            <img
              src="images/login-dots.png"
              alt="Abstract"
              style={{ position: "absolute", bottom: "30px", right: "0" }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Login;
