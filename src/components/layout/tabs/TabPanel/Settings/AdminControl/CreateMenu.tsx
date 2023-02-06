import React, { useState, useContext, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, IconButton, TextField } from '@mui/material';
import { UserContext } from '@/services/providers/UserProvider';
import styled from '@emotion/styled';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

type Props = {
    open: boolean,
    form: any,
    selectedFile: any,
    onClose: (event: React.SyntheticEvent) => void,
    handleChange: (event: React.SyntheticEvent) => void,
};

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '250px',
    maxHeight: '300px',
    borderRadius: '16px'
});
const CreateMenu = (props: Props) => {
    const [userContext] = useContext(UserContext)
    const { form, handleChange, ...otherProps } = props;
    const [preview, setPreview] = useState()
    const fileInput = useRef();
    useEffect(() => {
        if (!props.selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(props.selectedFile)
        {/* @ts-ignore: Unreachable code error */ }
        setPreview(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [props.selectedFile])
    // This function will handle the submission.
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('githubId', form.githubId);
        formData.append('projectImage', form.projectImage);
        formData.append('projectName', form.projectName);
        formData.append('description', form.description);
        formData.append('repositoryUrl', form.repositoryUrl);
        formData.append('deploymentUrl', form.deploymentUrl);
        formData.append('frameworks', form.frameworks);



        // When a post request is sent to the create url, we'll add a new record to the database.
        await fetch(import.meta.env.VITE_REACT_APP_API_ENDPOINT + "projects/create", {
            method: "POST",
            credentials: "include",
            // Pass authentication token as bearer token in header
            headers: {
                Authorization: `Bearer ${userContext.token}`,
            },
            body: formData,
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        otherProps.onClose(e);
    }



    return (
        <Modal
            {...otherProps}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ overflow: "scroll" }}
        >
            {/* @ts-ignore: Unreachable code error */}
            <Box enctype='multipart/form-data' component="form" onSubmit={handleSubmit}
                sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "80%",
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }} >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="projectName"
                    label="Project Name"
                    type="projectName"
                    id="projectName"
                    value={form.projectName}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    multiline
                    rows={4}
                    fullWidth
                    name="description"
                    label="Description"
                    type="description"
                    id="description"
                    value={form.description}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    disabled
                    name="repositoryUrl"
                    label="Repository Url"
                    type="repositoryUrl"
                    id="repositoryUrl"
                    value={form.repositoryUrl}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="deploymentUrl"
                    label="Deployment Url"
                    type="deploymentUrl"
                    id="deploymentUrl"
                    value={form.deploymentUrl}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="frameworks"
                    label="Frameworks"
                    type="frameworks"
                    id="frameworks"
                    value={form.frameworks}
                    onChange={handleChange}
                />
                <input
                    required
                    ref={fileInput}
                    style={{ display: 'none' }}
                    name="projectImage"
                    type="file"
                    onChange={handleChange}
                />
                <input
                    required
                    name="githubId"
                    style={{ display: 'none' }}
                    value={form.githubId}
                    onChange={handleChange}
                />
                {props.selectedFile && <Img alt="consult image" src={preview} />}
                <Grid item xs={12} container >

                    {/* @ts-ignore: Unreachable code error */}
                    <IconButton onClick={() => fileInput.current.click()}>
                        <AddPhotoAlternateOutlinedIcon />
                    </IconButton>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: "#3279CB", color: "white" }}
                    >
                        Save
                    </Button>
                </Grid>
            </Box>
        </Modal>
    )
}

export default CreateMenu