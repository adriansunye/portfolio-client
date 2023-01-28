import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import PrimarySideBarItem from './PrimarySideBarItem';

const PrimarySideBar = () => {
  return (
      <Drawer 
        variant="permanent"
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          bgcolor: 'background.default',
        }}
      >
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <PrimarySideBarItem text={text} index={index}/>
          ))}
        </List>
        <List 
          sx={{ 
            marginTop: 'auto' 
          }}
        >
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <PrimarySideBarItem text={text} index={index}/>
          ))}
        </List>
      </Drawer>
      
  );
}

export default PrimarySideBar;
