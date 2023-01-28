import React from 'react'
import { PrimarySideBar } from '@/components/navigation'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

type Props = {
    children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <PrimarySideBar/>
            {children}
        </Box>
    )
}

export default Layout