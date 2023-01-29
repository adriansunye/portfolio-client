import React, { useEffect, createContext, useContext } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material";

type Props = {
    children?: React.ReactNode;
};

export const ExplorerStateContext = createContext({
    open: true,
    setOpen: (open: boolean) => {}
})

export const ExplorerStateProvider = ({ children }: Props) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [open, setOpen] = React.useState(matches);

    return (
        <ExplorerStateContext.Provider value={{ open, setOpen }}>
            {children}
        </ExplorerStateContext.Provider>
    );
};

const useExplorerState = () => {
    const context = useContext(ExplorerStateContext);

    if (context === undefined) {
        throw new Error("useExplorerState must be used within a ExplorerStateProvider");
    }
    return context;
};

export default useExplorerState;