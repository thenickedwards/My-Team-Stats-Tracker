import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
// import Signup from "./pages/Signup";
import Login from "./pages/Login";
// import Profile from "./pages/Profile";

// import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
// import { fontFamily } from "@mui/system";

// Font import here (SEE INDEX.CSS FOR IMPORT)
const theme = createTheme({
  typography: {
    fontFamily: ["Bebas Neue", "cursive"].join(","),
    h1: {
      fontSize: "3em"
    },
    h3: {
      fontSize: "1.25em"
    },
    p: {
      fontSize: "1em",
      fontFamily: "Helvetica, sans-serif"
    }
  },
  palette: {
    primary: {
      light: "#ECF6FC",
      main: "#062740",
      dark: "#062740",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#C1E0F8",
      main: "#ECF6FC",
      dark: "#597992",
      contrastText: "#000000",
    },
  },
});



// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {

  // const { location: { pathname } } = this.props;

  return (
   
    <ApolloProvider client={client}>

      {
        <ThemeProvider theme={theme}>
          <Router>
            {/* <Navbar />
            <div> */}
              {/* <Header />
              <div> */}

{this.props.location.pathname !== '/login' && <Navbar />}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  {/* <Route path="/signup" element={<Signup />} /> */}
                  {/* <Route path="/me" element={<Profile />} />
                  <Route path="/profiles/:username" element={<Profile />} /> */}
                </Routes>
              {/* </div> */}
              <Footer />
            {/* </div> */}
          </Router>
        </ThemeProvider>
      }
    </ApolloProvider>


  );
}

export default App;
