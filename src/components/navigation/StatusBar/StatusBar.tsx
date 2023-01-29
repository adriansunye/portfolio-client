import { Box, Grid, Link, Paper, Stack, Typography } from "@mui/material";

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
          <Stack direction="row" spacing={0.5} sx={{ pl: 1 }}>
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
                  background: "#1f8ad2",
                },
              }}
            >
              <IoIosGitBranch fontSize="0.9rem" />
              <Typography sx={{ ml: 0.5, mt: 0.1, fontSize: "0.6rem" }}>
                main
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default StatusBar;