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
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
// import Profile from "./pages/Profile";

import Leagues from "./pages/Leagues";

// import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
// import { fontFamily } from "@mui/system";

// Font import here (SEE INDEX.CSS FOR IMPORT)
const theme = createTheme({
  typography: {
    // fontFamily: ["Bebas Neue", "cursive"].join(","),
    fontFamily: '"Bebas Neue", Arial, sans-serif',
    h1: {
      fontSize: "3em",
      textTransform: "uppercase"
    },
    h3: {
      fontSize: "1.25em",
      textTransform: "uppercase"
    },
    p: {
      fontSize: "1em",
      fontFamily: "Helvetica, sans-serif",
    },
  },
  palette: {
    primary: {
      light: "#ECF6FC", // background light blue
      main: "#105F9A", // theme blue
      dark: "#168BE2", // bright blue
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#597992", // disabled blue
      main: "#062740", // dark blue
      accent: "#F5E410", // yellow
      contrastText: "#062740", // dark blue, text color
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
  let location = useLocation();

  return (
    <ApolloProvider client={client}>
      {
        <ThemeProvider theme={theme}>
          {location.pathname === "/login" ? null : <Navbar />}

          <Leagues/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/me" element={<Profile />} />
                  <Route path="/profiles/:username" element={<Profile />} /> */}
          </Routes>

          {location.pathname === "/login" ? null : <Footer />}
        </ThemeProvider>
      }
    </ApolloProvider>
  );
}

export default App;
