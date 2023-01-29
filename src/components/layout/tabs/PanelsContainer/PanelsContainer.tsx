import React from 'react'
import { styled } from '@mui/material/styles';
import TabPanel from '@/components/layout/tabs/TabPanel/TabPanel';
import useExplorerState from '@/services/providers/ExplorerStateProvider';
import useTabsData from '@/services/providers/TabsDataProvider';

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

const PanelsContainer = () => {
    const { open } = useExplorerState();
    const { tabsData, value } = useTabsData();
    return (
        <Main
            open={open}
            sx={{
                overflow: 'hidden',
                ...(!open && {
                    paddingLeft: '80px'
                })
            }}
        >
            {tabsData.map((tab) => (
                <TabPanel value={value} index={tab.id}>
                    {tab.node}
                </TabPanel>
            ))}
        </Main>
    )
}

export default PanelsContainer