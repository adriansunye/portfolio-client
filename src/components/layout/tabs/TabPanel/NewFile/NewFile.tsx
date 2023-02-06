import React, { useState } from 'react'
import { TextField } from '@mui/material'

const NewFile = () => {
    const [rows, setRows] = useState(32)

    return (
        <React.Fragment>
            <TextField
                id="outlined-multiline-static"
                multiline
                fullWidth
                rows={rows}
                defaultValue="Default Value"
                variant="outlined"
                sx={{
                    "&  .MuiOutlinedInput-root": {
                        "& > fieldset": {
                            border: "none"
                        }
                    }
                }}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        setRows(rows + 1)
                    }
                }}
            />
        </React.Fragment>
    )
}

export default NewFile