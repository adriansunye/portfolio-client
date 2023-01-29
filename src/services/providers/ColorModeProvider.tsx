import React, { createContext, useContext, useMemo } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from "@mui/material";

type Props = {
    children?: React.ReactNode;
};

export const ColorModeContext = createContext({
    toggleColorMode: () => { }
});

export const ColorModeProvider = ({ children }: Props) => {
    const [mode, setMode] = React.useState<PaletteMode>("dark");
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light' && {
                        background: {
                            default: '#FFFFFF',
                            paper: '#F3F3F3',
                        },
                        text: {
                            secondary: '#1D182F',
                        },
                        
                    }),
                    ...(mode === 'dark' && {
                        background: {
                            default: '#1E1E1E',
                            paper: '#252527',
                        },
                        text: {
                            secondary: '#FFFFFF',
                        },
                        
                    }),
                }
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

const useColorMode = () => {
    const context = useContext(ColorModeContext);

    if (context === undefined) {
        throw new Error("useColorMode must be used within a ColorProvider");
    }
    return context;
};

export default useColorMode;