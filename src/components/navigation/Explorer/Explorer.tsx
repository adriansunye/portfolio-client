import React, { useEffect, useCallback } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { VscMarkdown } from 'react-icons/vsc';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Drawer, Grid, textFieldClasses } from '@mui/material'
import useExplorerState from '@/services/providers/ExplorerStateProvider';
import useTabsData from '@/services/providers/TabsDataProvider';
import { Stack } from '@mui/system';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeItem from '@mui/lab/TreeItem';

const drawerWidth = '270px';
interface TabsData {
  id: number,
  name: string,
  node: React.ReactNode,
  closed: boolean
}

const Explorer = () => {
  const { open } = useExplorerState();
  const { tabsData, activeTabs, setTabsData, setCurrentTab, setActiveTabs } = useTabsData();

  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, tabToCreate: TabsData) => {
      // stop event from propagating to the target element's parent
      event.stopPropagation();
      const foundTab = activeTabs.filter((tab => tab.id === tabToCreate.id))
      if (foundTab.length===0) {
        setActiveTabs([...activeTabs, tabToCreate]);
      }
      setCurrentTab(tabToCreate.id);
    },
    [activeTabs]
  );

  return (
    <React.Fragment>
      <Drawer
        sx={{
          zIndex: 0,
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Grid container sx={{ overflow: "hidden", pl: '57px' }}>

          <Stack sx={{ mt: 1, width: '100%' }}>
            <Typography
              sx={{ pl: '27px', opacity: 0.7 }}
              variant="caption"
              color="text.secondary"
            >
              EXPLORER
            </Typography>
            <TreeView
              aria-label="file system navigator"
              defaultExpanded={["folderNode"]}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{ height: 240, overflowY: 'auto', overflowX: 'hidden' }}
            >
              <TreeItem nodeId="folderNode" label="Home" >
                {tabsData.filter((filterTab => filterTab.name !== "Settings")).map((tab) => (
                  <TreeItem
                    onClick={(event) => handleOpen(event, tab)}
                    key={tab.name}
                    nodeId={tab.id.toString()}
                    label={tab.name} sx={{ color: 'text.primary' }}
                    icon={<VscMarkdown style={{ color: '#6997D5' }} />}
                  />
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