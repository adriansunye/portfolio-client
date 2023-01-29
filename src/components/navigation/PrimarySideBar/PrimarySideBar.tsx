import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from './ListItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const drawerTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#333333'
    },
  },
});


const PrimarySideBar = () => {
  return (
    <ThemeProvider theme={drawerTheme}>
      <Drawer 
        variant="permanent"
        sx={{ 
          bgcolor: 'background.default',
        }}
      >
        <List
          sx={{ 
            paddingTop: 0 
          }}
        >
          {['Explorer', 'Source Control', 'Github', 'Linkedin', 'Send Mail'].map((text) => (
            <ListItem text={text}/>
          ))}
        </List>
        <List 
          sx={{ 
            marginTop: 'auto' 
          }}
        >
          {['Theme', 'Configuration'].map((text) => (
            <ListItem text={text}/>
          ))}
        </List>
      </Drawer>
      </ThemeProvider>
  );
}

export default PrimarySideBar;
