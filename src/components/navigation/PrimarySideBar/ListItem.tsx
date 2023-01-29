import React from 'react'
import useColorMode from '@/services/providers/ColorModeProvider';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import BugReportIcon from '@mui/icons-material/BugReport';
import GitHubIcon from '@mui/icons-material/GitHub';
import {
    ListItem as Item,
    ListItemButton,
    ListItemIcon,
    Divider,
    Tooltip,
    useTheme
} from '@mui/material';
import useExplorerState from '@/services/providers/ExplorerStateProvider';


type Props = {
    text: string,
};

const ListItem = ({ text }: Props) => {
    const colorMode = useColorMode();
    const theme = useTheme();
    const { open, setOpen } = useExplorerState();

    const handleExplorerOpen = () => {
        setOpen(true);
    };

    const handleExplorerClose = () => {
        setOpen(false);
    };
    const renderListIcon = () => {
        switch (text) {
            case "Explorer":
                return <FileCopyIcon color="disabled"/>;
            case "Source Control":
                return <BugReportIcon color="disabled" />;
            case "Github":
                return <GitHubIcon color="disabled" />;
            case "Linkedin":
                return <LinkedInIcon color="disabled" />;
            case "Send Mail":
                return <EmailIcon color="disabled" />;
            case "Theme":
                return theme.palette.mode === "light" ? <LightModeIcon color="disabled" /> : <DarkModeIcon color="disabled" />;
            case "Configuration":
                return <SettingsIcon color="disabled" />;
            default:
                return null;
        }
    };
    return (
        <React.Fragment>
            <Tooltip title={text} placement="right" arrow>
                <Item
                    key={text}
                    disablePadding
                    sx={{
                        display: 'block',
                        ...(text === 'Explorer' && {
                            borderLeft: 1
                        })
                    }}
                    onClick={text === "Explorer" || text === "Theme" ? text === "Explorer" ? open
                    ? handleExplorerClose
                    : handleExplorerOpen
                    : colorMode.toggleColorMode 
                    : undefined}
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: 'center',
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                justifyContent: 'center',
                            }}
                        >
                            {renderListIcon()}
                        </ListItemIcon>
                    </ListItemButton>
                </Item>
            </Tooltip>
            {text === 'Source Control' ? <Divider /> : ''}
        </React.Fragment>
    )
}

export default ListItem