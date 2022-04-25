import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignContent: 'center', 
        minHeight: '100vh', 
        backgroundColor: 'primary.light',
    }}>
      
      <CircularProgress/>
    </Box>
  );
}
