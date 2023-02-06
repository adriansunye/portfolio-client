import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Tooltip } from "@mui/material";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100',
  borderRadius: '16px'
});

export default function ProjectsList() {
  const [projects, setProjects] = useState<any[]>([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getProjects() {
      const response = await fetch(import.meta.env.VITE_REACT_APP_API_ENDPOINT + "projects/all");

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const projects = await response.json();
      setProjects(projects);
    }

    getProjects();

    return;
  }, [projects.length]);

  // This following section will display the table with the records of individuals.
  return (
    <React.Fragment>
      <Grid container spacing={2.5} paddingTop={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>

        {projects.map((project, key) =>
          <Grid item xs={12} sm={6} md={4} key={key}>

            <Card sx={{ maxWidth: 500, px: 1, minHeight:540, display:'flex', flexDirection:'column'}}>
              <CardHeader
                title={project.projectName}
                subheader={project.frameworks}
              />
              <CardMedia
                component="img"
                height="194"
                image={'http://localhost:5000/public/images/' + project.imageUrl}
                alt="Project image"
              />
              <CardContent>
                <Typography variant="subtitle1" color="text.primary">
                  {project.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing sx={{display:'flex', justifyContent:"end"}}>
                <Tooltip title='Go to github repo' placement="bottom" arrow>
                  <IconButton href={project.repositoryUrl} aria-label="go to github repo">
                    <GitHubIcon />
                  </IconButton>
                </Tooltip>
                {project.deploymentUrl &&
                  <Tooltip title='Go to deployment' placement="bottom" arrow>
                    <IconButton href={project.deploymentUrl} aria-label="Go to deployment">
                      <TravelExploreIcon />
                    </IconButton>
                  </Tooltip>
                }
              </CardActions>
            </Card>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}