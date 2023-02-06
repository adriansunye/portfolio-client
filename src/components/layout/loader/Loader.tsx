import { Box, CircularProgress } from "@mui/material"
import React from "react"

const Loader = () => {
  return (
    <Box  sx={{
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
  }} >
      <CircularProgress />
    </Box>
  )
}

export default Loader