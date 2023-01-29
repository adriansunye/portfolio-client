import React, { useCallback } from 'react'
import { Explorer, PrimarySideBar, StatusBar, TabsBar } from '@/components/navigation'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import useTabsData from '@/services/providers/TabsDataProvider';

type Props = {
    children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    const { value, setValue } = useTabsData();

    const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) =>
        setValue(newValue),
        [setValue]
    );

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <TabsBar value={value} handleChange={handleChange} />
                <PrimarySideBar />
                <Explorer />
                
                {children}
            </Box>
            <StatusBar />

        </React.Fragment>
    )
}

export default Layout