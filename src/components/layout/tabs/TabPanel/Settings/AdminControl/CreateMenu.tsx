import React, { useState, useContext } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { UserContext } from '@/services/providers/UserProvider';


type Props = {
    open: boolean,
    onClose: (event: React.SyntheticEvent) => void,
    repo: any
};


const CreateMenu = (props: Props) => {
    const [userContext] = useContext(UserContext)
    const { repo, ...otherProps } = props;

    const [form, setForm] = useState({
        projectName: repo.name,
        description: repo.desciption,
        repositoryUrl: repo.clone_url,
    });

    // These methods will update the state properties.
    const updateForm = (value: object) => {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(userContext.token)

        // When a post request is sent to the create url, we'll add a new record to the database.
        const project = { ...form };
        await fetch(import.meta.env.VITE_REACT_APP_API_ENDPOINT + "projects/create", {
            method: "POST",
            credentials: "include",
            // Pass authentication token as bearer token in header
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`,
            },
            body: JSON.stringify(project),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({  projectName: "", description: "", repositoryUrl: "", });
    }

    return (
        <Modal
            {...otherProps}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box component="form" onSubmit={handleSubmit}
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
                    autoComplete="current-password"
                    defaultValue={repo.name}
                    onChange={(e) => updateForm({ projectName: e.target.value })}
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
                    defaultValue={repo.description || ""}
                    onChange={(e) => updateForm({ description: e.target.value })}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="repositoryUrl"
                    label="Repository Url"
                    type="repositoryUrl"
                    id="repositoryUrl"
                    disabled
                    value={repo.clone_url}
                    onChange={(e) => updateForm({ repositoryUrl: e.target.value })}
                />
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: "#3279CB", color: "white" }}
                >
                    Save
                </Button>
            </Box>
        </Modal>
    )
}

export default CreateMenu