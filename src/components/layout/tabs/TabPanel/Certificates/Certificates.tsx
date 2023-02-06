import React from 'react'
import { Typography, Box } from '@mui/material';
{/* @ts-ignore: Unreachable code error */ }
import ReactTypingEffect from 'react-typing-effect';
{/* @ts-ignore: Unreachable code error */ }
import JSONPretty from "react-json-pretty";
{/* @ts-ignore: Unreachable code error */ }
import JSONPrettyAcai from "react-json-pretty/dist/acai";
import { useTheme } from '@mui/material/styles';


const Certificates = () => {
  const theme = useTheme();

  const certificates = {
    certificates: {
      codeacademy: [
        "Introduction to JavaScript",
        "Learn ReactJS and Redux",
        "Learn ReactJS Intermediate",
        "Introduction to regex"
      ],
      udemy: [
        "PhP for beginners",
        "PHP intermediate",
      ]
    }
  }
  return (
    <React.Fragment>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h2">
          <ReactTypingEffect typingDelay={500} eraseDelay={2000} speed={100} eraseSpeed={100}
            text={["I try to learn in my spare time to improve my skills"]}
          />
        </Typography>
        <Box sx={{ px: 5, mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <JSONPretty id="json-pretty" data={certificates} theme={theme.palette.mode === "dark" ? JSONPrettyAcai : null} />
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Certificates