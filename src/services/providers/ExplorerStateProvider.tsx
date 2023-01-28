import React, { useState, createContext, useContext } from "react";

type Props = {
    children?: React.ReactNode;
};

export const ExplorerStateContext = createContext({
    open: true,
    setOpen: (open: boolean) => {}
})

export const ExplorerStateProvider = ({ children }: Props) => {
    const [open, setOpen] = React.useState(true);
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