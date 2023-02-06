import React from 'react'
import { Typography, Box } from '@mui/material';
{/* @ts-ignore: Unreachable code error */ }
import ReactTypingEffect from 'react-typing-effect';
{/* @ts-ignore: Unreachable code error */ }
import JSONPretty from "react-json-pretty";
{/* @ts-ignore: Unreachable code error */ }
import JSONPrettyAcai from "react-json-pretty/dist/acai";
import { useTheme } from '@mui/material/styles';


const Overview = () => {
  const theme = useTheme();

  const aboutMe = {
    name: "Adrián Suñé Mancheño",
    role: "FrontEnd Developer",
    data: {
      skills: [
        "React", "MERN", "PHP",
        "Laravel", "MySQL",
        "MongoDB", "TDD"
      ]
    },
    motivation: {
      project: "Always learn!"
    },
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
            text={["Welcome! This is adriansunye portfolio.", "Check all the tabs to see what I have done", "Enjoy!"]}
          />
        </Typography>
        <Box sx={{ px: 5, mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <JSONPretty id="json-pretty" data={aboutMe} theme={theme.palette.mode === "dark" ? JSONPrettyAcai : null} />
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Overview