import React, { useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { VscMarkdown } from 'react-icons/vsc';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Drawer, Grid } from '@mui/material'
import useExplorerState from '@/services/providers/ExplorerStateProvider';
import useTabsData from '@/services/providers/TabsDataProvider';
import { Stack } from '@mui/system';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeItem from '@mui/lab/TreeItem';

const drawerWidth = '287px';

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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Explorer = () => {
  const theme = useTheme();
  const { open } = useExplorerState();
  const {tabsData} = useTabsData();

  return (
    <React.Fragment>
      <Drawer
        sx={{
          zIndex: 0,
          width: drawerWidth,
          flexShrink: 0,
          position: 'absolute',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Grid container sx={{ overflow: "auto", overflowY: "hidden", pl: '57px' }}>

          <Stack sx={{ mt: 1 }}>
            <Typography
              sx={{ pl: '27px', opacity: 0.7 }}
              variant="caption"
              color="text.secondary"
            >
              EXPLORER
            </Typography>
            <TreeView
              aria-label="file system navigator"
              defaultExpanded={["1"]}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{ minWidth: '229px', height: 240, overflowY: 'auto', overflowX: 'hidden' }}
            >
              <TreeItem nodeId="1" label="Home" >
                {tabsData.map((tab) => (
                  <TreeItem nodeId={tab.id} label={tab.name} icon={<VscMarkdown/>} sx={{iconContainer: 'color:primary'}}/>
                ))}
              </TreeItem>
            </TreeView>
          </Stack>
        </Grid>
      </Drawer>
    </React.Fragment>

  );
}

export default Explorer