import React from 'react'
import { Typography, Box } from '@mui/material';
{/* @ts-ignore: Unreachable code error */ }
import ReactTypingEffect from 'react-typing-effect';
{/* @ts-ignore: Unreachable code error */ }
import JSONPretty from "react-json-pretty";
{/* @ts-ignore: Unreachable code error */ }
import JSONPrettyAcai from "react-json-pretty/dist/acai";
import { useTheme } from '@mui/material/styles';


const Experience = () => {
  const theme = useTheme();

  const experience = {
    experience: {
      projects: [
        "I learned doing projects",
        "With a team and alone",
        "Using agile methodologies",
        "And TDD practices",
      ],
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
            text={["My objective is to become a front-end developer"]}
          />
        </Typography>
        <Box sx={{ px: 5, mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <JSONPretty id="json-pretty" data={experience} theme={theme.palette.mode === "dark" ? JSONPrettyAcai : null} />
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Experience