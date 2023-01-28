import React from 'react'
import { Explorer, PrimarySideBar } from '@/components/navigation'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, useTheme } from '@mui/material/styles';
import useExplorerState from '@/services/providers/ExplorerStateProvider';


type Props = {
    children?: React.ReactNode;
};

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const Layout = ({ children }: Props) => {
    const { open } = useExplorerState();

    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <PrimarySideBar />
            <Explorer />
            <Main 
                open={open} 
                sx={{
                    ...(!open && {
                        paddingLeft: '89px'
                    })
                }}
            >
                {children}
            </Main>
        </Box>
    )
}

export default Layout