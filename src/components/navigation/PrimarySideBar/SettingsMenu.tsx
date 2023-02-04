import * as React from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import useTabsData from '@/services/providers/TabsDataProvider';


type Props = {
    anchorEl: null | HTMLElement,
    open: boolean,
    onClose: (event: React.SyntheticEvent) => void,
};

export default function SettingsMenu(props:Props) {
    const { tabsData, setActiveTabs, currentTab, setCurrentTab } = useTabsData();

    const handleClick = () => {
        if(currentTab !== 7){
            // loop over the todos list and find the provided id.
            let updatedTabs = tabsData.map(tab => {
                if (tab.name === 'Settings') {
                    return { ...tab, closed: tab.closed ? !tab.closed : tab.closed }; //gets everything that was already in item, and updates "done"
                }
                return tab; // else return unmodified item 
            });

            setActiveTabs(updatedTabs); // set state to new object with updated list

            setCurrentTab(7); // set state to new object with updated list
        }
    };
    
  return (
    
      <Menu anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      {...props}>
        <MenuItem onClick={handleClick}>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>Extensions</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemText>Color Theme</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>File Icon Theme</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemText>Check for updates...</ListItemText>
        </MenuItem>
      </Menu>

  );
}