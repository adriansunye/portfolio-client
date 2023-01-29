import React from 'react'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { Tab, Tabs, IconButton, Typography, Box, Paper } from '@mui/material';
import useExplorerState from '@/services/providers/ExplorerStateProvider';
import useTabsData from '@/services/providers/TabsDataProvider';
import { VscMarkdown } from 'react-icons/vsc';
import CloseIcon from '@mui/icons-material/Close';

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
  value: number,
  handleChange: (event: React.SyntheticEvent, newValue: number) => void
};

const TabsBar = ({ value, handleChange }: Props) => {
  const { open } = useExplorerState();
  const { tabsData, setTabsData } = useTabsData();

  return (
    <AppBar position="fixed" open={open} >
      <Paper sx={{ mt:-2, pb:1, position: 'fixed', width: '100%', color: "white"}} >
        <Tabs 
          sx={{height:0}} 
          value={value} 
          onChange={handleChange} 
          aria-label="basic tabs example" 
          variant='scrollable'
          TabIndicatorProps={{   
            style: {
                display: "none",
            },
          }} 
        >
          {tabsData.filter((tab => !tab.closed)).map(openTab  => (
              <Tab 
                key={openTab.name}
                label={
                  <Typography component={'span'}> 
                      {openTab.name}
                      <IconButton size="small" color='secondary' component="span" >
                          <CloseIcon />
                      </IconButton>
                  </Typography>
                  }
                {...a11yProps(openTab.id)} 
                sx={{ textTransform: "none" }} 
                icon={<VscMarkdown style={{ color: '#6997D5' }}/>} 
                iconPosition='start'
              />
          ))}
          
        </Tabs>
      </Paper>
    </AppBar>
  )
}

export default TabsBar