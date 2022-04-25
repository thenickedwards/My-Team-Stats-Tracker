import React from "react";
import Auth from "../utils/auth";
import { Container, Link } from "@mui/material";

const Logout = async (res) => {
  await Auth.logout();
  if (res.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to log out.");
  }
};

const logoutPage = () => {
  Logout();

  // If user's internet is slow, this page will render in interim of logout
  return (
    <>
      <Container maxWidth="sm">
        <p>
          You are logged out of your admin account! You can go{" "}
          <Link href="/">back to the homepage.</Link>
        </p>
      </Container>
    </>
  );
};

export default logoutPage;
