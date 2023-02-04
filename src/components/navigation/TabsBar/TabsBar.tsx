import React, { useCallback, useEffect } from 'react'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { Tab, Tabs, IconButton, Typography, Box, Paper } from '@mui/material';
import useExplorerState from '@/services/providers/ExplorerStateProvider';
import useTabsData from '@/services/providers/TabsDataProvider';
import { VscMarkdown } from 'react-icons/vsc';
import CloseIcon from '@mui/icons-material/Close';
import TabPanel from '@/components/layout/tabs/TabPanel/TabPanel';
import { padding } from '@mui/system';


const sideBarWidth = 57;
const navigationWidth = 270;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
interface TabsData {
  id: number,
  name: string,
  node: React.ReactNode,
  closed: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  width: `calc(100% - ${sideBarWidth}px )`,
  marginLeft: `50px`,
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
  currentTab: number,
  handleChange: (event: React.SyntheticEvent, currentTab: number) => void
  handleClose: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, tabToDelete: TabsData) => void
};

const TabsBar = ({ currentTab, handleChange, handleClose }: Props) => {
  const { open } = useExplorerState();
  const { tabsData, activeTabs, setTabsData, setCurrentTab, setActiveTabs } = useTabsData();

  useEffect(() => {
    const openTabs = tabsData.filter((tab => !tab.closed));
    setActiveTabs(openTabs);
  }, [tabsData]);

  return (
    <AppBar elevation={0} position="fixed" open={open}>
      <Paper sx={{ mt: -2, pb: 1, color: "white" }} >
        <Tabs
          sx={{ height: 0 }}
          value={currentTab}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant='scrollable'
          scrollButtons={false}
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
        >
          {activeTabs.map((activeTab, index) => (
            <Tab
              value={activeTab.id}
              key={activeTab.name}
              label={
                <Typography component={'span'}>
                  {activeTab.name}
                  <IconButton onClick={(event) => handleClose(event, activeTab)} size="small" sx={{color:'text.secondary'}} component="span" >
                    <CloseIcon />
                  </IconButton>
                </Typography>
              }
              {...a11yProps(index)}
              sx={{ textTransform: "none", p: 1 }}
              icon={<VscMarkdown style={{ color: '#6997D5' }} />}
              iconPosition='start'
            />
          ))}

        </Tabs>
      </Paper>
    </AppBar>

  )
}

export default TabsBar