import React, { useCallback, useEffect } from 'react'
import { Explorer, PrimarySideBar, StatusBar, TabsBar } from '@/components/navigation'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import useTabsData from '@/services/providers/TabsDataProvider';

type Props = {
    children?: React.ReactNode;
};

interface TabsData {
    id: number,
    name: string,
    node: React.ReactNode,
    closed: boolean
  }

const Layout = ({ children }: Props) => {
    const { tabsData, currentTab, activeTabs, setTabsData, setCurrentTab, setActiveTabs } = useTabsData();

    

    const handleChange = useCallback((event: React.SyntheticEvent, newTab: number) => {
        setCurrentTab(newTab);
      }, []);

      const handleClose = useCallback(
        (event:React.MouseEvent<HTMLSpanElement, MouseEvent>, tabToDelete:TabsData) => {
          // stop event from propagating to the target element's parent
          event.stopPropagation(); 
    
          const tabToDeleteIndex = activeTabs.findIndex(
            tab => tab.id === tabToDelete.id
          );
          let updatedTabs = activeTabs.filter((tab, index) => {
            return index !== tabToDeleteIndex;
          });
          const previousTab =
            activeTabs[tabToDeleteIndex - 1] ||
            activeTabs[tabToDeleteIndex + 1] || {id:0};

          setActiveTabs(updatedTabs);
          setCurrentTab(previousTab.id);
        },
        [activeTabs]
      );

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <TabsBar currentTab={currentTab} handleChange={handleChange} handleClose={handleClose} />
                <PrimarySideBar />
                <Explorer/>
                
                {children}
            </Box>
            <StatusBar />

        </React.Fragment>
    )
}

export default Layout