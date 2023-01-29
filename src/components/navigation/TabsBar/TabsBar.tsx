import React from 'react'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { Tab, Tabs, Toolbar, Typography, Box  } from '@mui/material';
import useExplorerState from '@/services/providers/ExplorerStateProvider';
import useTabsData from '@/services/providers/TabsDataProvider';

const sideBarWidth = 57;
const navigationWidth = 287;

function a11yProps(index: number) {
  return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  width: `calc(100% - ${sideBarWidth}px )`,
  marginLeft: `57px`,
  transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
      width: `calc(100% - ${navigationWidth}px)`,
      marginLeft: `${navigationWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
      }),
  }),
}));

type Props = {
  value: number,
  handleChange: (event: React.SyntheticEvent, newValue: number) => void
};

const TabsBar = ({value, handleChange}: Props) => {
  const { open } = useExplorerState();
  const { tabsData } = useTabsData();

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              {tabsData.map((tab) => (
                <Tab label={tab.name} {...a11yProps(tab.id)} />
              ))}
            </Tabs>
          </Box>

        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TabsBar