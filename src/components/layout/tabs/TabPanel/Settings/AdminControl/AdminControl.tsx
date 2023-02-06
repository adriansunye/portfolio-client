import React, { useState, useContext, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from '@/services/providers/UserProvider';
import Loader from "@/components/layout/loader/Loader"
import PageNotFound from "@/views/errors/PageNotFound";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Box, Paper, Grid } from '@mui/material';
import { Stack } from "@mui/system";
import CreateMenu from "./CreateMenu";


const Create = () => {
  const [repos, setRepos] = useState([])
  const [repo, setRepo] = useState({})
  const [projects, setProjects] = useState([])
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [form, setForm] = useState({});
  const [selectedFile, setSelectedFile] = useState()
  const handleOpen = useCallback((event: React.SyntheticEvent, newRepo: any) => {
    setOpen(true);
    setForm({
      githubId: newRepo.id,
      projectName: newRepo.name,
      description: newRepo.description,
      repositoryUrl: newRepo.clone_url,
      deploymentUrl: '',
      frameworks: '',
      projectImage: null
    })
  }, []);
 
  const handleClose = () => setOpen(false);


  // These methods will update the state properties.
  const handleChange = (event: any) => {
    const name = event.target.name;
    let value = event.target.files ? event.target.files[0] : event.target.value;
    if (event.target.files) {
      setSelectedFile(value)
    }

    setForm(values => ({ ...values, [name]: value }));
  }

  async function getGithubRepos() {
    const axiosInstance = axios.get(import.meta.env.VITE_GITHUB_USER_REPOS, {
      'headers': {
        Authorization: 'token' + import.meta.env.VITE_GITHUB_API_TOKEN
      }
    });
    let response = await axiosInstance;
    setRepos(response.data)
  }

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

  const [userContext, setUserContext] = useContext(UserContext)


  const fetchUserDetails = useCallback(() => {
    fetch(import.meta.env.VITE_REACT_APP_API_ENDPOINT + "users/me", {
      method: "GET",
      credentials: "include",
      // Pass authentication token as bearer token in header
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
        setUserContext(oldValues => {
          return { ...oldValues, details: data }
        })
      } else {
        if (response.status === 401) {
          // Edge case: when the token has expired.
          // This could happen if the refreshToken calls have failed due to network error or
          // User has had the tab open from previous day and tries to click on the Fetch button
          window.location.reload()
        } else {
          setUserContext(oldValues => {
            return { ...oldValues, details: null }
          })
        }
      }
    })
  }, [setUserContext, userContext.token])

  useEffect(() => {
    // fetch only when user details are not present
    if (!userContext.details) {
      fetchUserDetails()
    }
    getGithubRepos();
    getProjects();
  }, [userContext.details, fetchUserDetails])

  const logoutHandler = () => {
    fetch(import.meta.env.VITE_REACT_APP_API_ENDPOINT + "users/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async response => {
      setUserContext(oldValues => {
        return { ...oldValues, details: undefined, token: null }
      })
      window.localStorage.setItem("logout", Date.now().toString())
    })
  }

  // This method will delete a record
  async function handleDelete(project: any) {
    
    await fetch(`http://localhost:5000/projects/delete/${project._id}`, {
      method: "DELETE",
      credentials: "include",
      // Pass authentication token as bearer token in header
      headers: {
          Authorization: `Bearer ${userContext.token}`,
      },
    });

    const updatedProjects = projects.filter((el) => el._id !== project._id);
    setProjects(updatedProjects);
  }

  // This following section will display the form that takes the input from the user.
  return userContext.details === null ? (
    <PageNotFound />
  ) : !userContext.details || repos.length === 0 ? (
    <Loader />
  ) : (
    <React.Fragment>
      <Grid container spacing={2.5} paddingTop={2} paddingX={1}>
        {repos && repos.sort((a, b) => b.id - a.id).map(repo => (
          <Grid item xs={12} sm={6} key={repo.id}>
            <Card sx={{ minWidth: 300, minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {repo.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {repo.description ? repo.description : "No description"}
                </Typography>
              </CardContent>
              <CardActions>
                <Button href={repo.clone_url} size="small" color="primary">
                  Go to Repo
                </Button>
                {!projects.some(project => project.githubId == repo.id)?
                  <Button onClick={(e) => handleOpen(e, repo)}
                    size="small" color="primary">
                    Add Project
                  </Button>
                  : <React.Fragment>
                      <Button onClick={(e) => handleOpen(e, repo)}
                        size="small" color="warning">
                        Edit Project
                      </Button>
                      <Button onClick={(e) => handleDelete(projects.find(project => project.githubId == repo.id))}
                        size="small" color="error">
                        Delete Project
                      </Button>
                    </React.Fragment>
                  }
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" display="flex" justifyContent={"center"} spacing={2} mt={2}>
        <Button onClick={logoutHandler} variant="contained" color="secondary">Logout</Button>
      </Stack>

      <CreateMenu open={open} onClose={handleClose} form={form} handleChange={handleChange} selectedFile={selectedFile} />

    </React.Fragment>
  );
}

export default Create;