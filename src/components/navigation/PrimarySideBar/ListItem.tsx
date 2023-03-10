import React, {useCallback} from 'react'
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
import { useNavigate } from "react-router";
import SettingsMenu from '@/components/navigation/PrimarySideBar/SettingsMenu';

type Props = {
    text: string,
};

const ListItem = ({ text }: Props) => {
    const colorMode = useColorMode();
    const theme = useTheme();
    const { open, setOpen } = useExplorerState();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const settingsMenuOpen = Boolean(anchorEl);

    const handleClose = useCallback((event: React.SyntheticEvent) =>
        setAnchorEl(null),
        [setAnchorEl]
    );
 

    const handleExplorer = () => {
        setOpen(!open);
    };

    const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
        if (text === "Explorer") {
            handleExplorer();
        } else if (text === "Theme") {
            colorMode.toggleColorMode();
        } else if (text === "Configuration") {
            setAnchorEl(event.currentTarget);
        }
    }

    const renderListIcon = () => {
        switch (text) {
            case "Explorer":
                return <FileCopyIcon sx={{ color: '#858585' }} />;
            case "Source Control":
                return <BugReportIcon sx={{ color: '#858585' }} />;
            case "Github":
                return <GitHubIcon sx={{ color: '#858585' }} />;
            case "Linkedin":
                return <LinkedInIcon sx={{ color: '#858585' }} />;
            case "Send Mail":
                return <EmailIcon sx={{ color: '#858585' }} />;
            case "Theme":
                return theme.palette.mode === "light" ? <LightModeIcon sx={{ color: '#858585' }} /> : <DarkModeIcon sx={{ color: '#858585' }} />;
            case "Configuration":
                return <SettingsIcon sx={{ color: '#858585' }} />;
            default:
                return null;
        }
    };
    return (
        <React.Fragment>
            <Tooltip title={text} placement="right" arrow>
                <Item
                    disablePadding
                    sx={{
                        display: 'block',
                        ...(text === 'Explorer' && {
                            borderLeft: 1
                        })
                    }}
                    onClick={handleClick}
                >
                    <ListItemButton
                        href={
                            text === 'Github' 
                            ? 'https://github.com/adriansunye' 
                            : text === 'Linkedin' 
                            ? 'https://www.linkedin.com/in/adriansunye/' 
                            : text === 'Send Mail' 
                            ? 'mailto:adrian.sunye@gmail.com' 
                            : ''}
                        sx={{
                            minHeight: 48,
                            justifyContent: 'center',
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            {renderListIcon()}
                        </ListItemIcon>
                    </ListItemButton>
                </Item>
            </Tooltip>
            {text === 'Source Control' ? <Divider /> : ''}
            <SettingsMenu anchorEl={anchorEl} open={settingsMenuOpen} onClose={handleClose}/>
        </React.Fragment>
    )
}

export default ListItem