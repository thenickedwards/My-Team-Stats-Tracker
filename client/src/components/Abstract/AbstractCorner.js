import React from 'react'
import Box from "@mui/material/Box";

export default function AbstractCorner() {
  return (
    <Box sx={{ position: "absolute", bottom: 10, left: 20 }} >
    <img
      src="/images/abstract-corner-dots-lines.png"
      alt="Abstract graphic with dots and lines."
      width="250px"
    />
  </Box>
  )
}
