import { Box, Grid, Link, Paper, Stack, Typography } from "@mui/material";
import {
  VscRemote,
  VscError,
  VscWarning,
  VscBell,
  VscFeedback,
  VscCheck,
} from "react-icons/vsc";
import { IoIosGitBranch } from "react-icons/io";

const StatusBar = () => {
  return (
    <Paper sx={{ zIndex:2400, position: 'fixed', width:'100%', color: "white", bottom: 0, left: 0, right: 0 }} >
      <Grid container>
        <Grid
          item
          sx={{ backgroundColor: "#3279CB", width: "100%" }}
          display="flex"
        >
          <Stack direction="row" spacing={1} >
            <Box
              color="white"
              display="flex"
              sx={{
                px: 2,
                justifyContent: "start",
                alignItems: "center",
                background: "#478263",

              }}
            >
              <VscRemote fontSize="0.9rem" />
            </Box>
            <Box
              component={Link}
              href="https://github.com/adriansunye"
              underline="none"
              color="white"
              target="_blank"
              display="flex"
              sx={{
                px: 0.5,
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  background: "#3279CB",
                },
              }}
            >
              <IoIosGitBranch fontSize="0.9rem" />
              <Typography sx={{ ml: 0.5, mt: 0.1, fontSize: "0.6rem" }}>
                main
              </Typography>
            </Box>
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                px: 0.5,
                cursor: "pointer",
                "&:hover": {
                  background: "#1f8ad2",
                },
              }}
            >
              <Box
                display="flex"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  py: 0.3,
                }}
              >
                <VscError fontSize="0.9rem" />
              </Box>
              <Box
                display="flex"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  pt: 0.3,
                }}
              >
                <Typography sx={{ fontSize: "0.6rem" }}>0</Typography>
              </Box>

              <Box
                display="flex"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  py: 0.3,
                }}
              >
                <VscWarning fontSize="0.9rem" />
              </Box>
              <Box
                display="flex"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  pt: 0.3,
                }}
              >
                <Typography sx={{ fontSize: "0.6rem" }}>0</Typography>
              </Box>
            </Stack>  
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default StatusBar;