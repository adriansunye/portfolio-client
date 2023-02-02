import { Accomplishments, Certificates, Education, Experience, Overview, Projects, Skills, Settings } from "@/components/layout/tabs";
import React, { useEffect, createContext, useContext } from "react";

type Props = {
    children?: React.ReactNode;
};

interface TabsData {
    id: number,
    name: string,
    node: React.ReactNode,
    closed: boolean
}

interface TabsDataContextValue {
    tabsData: TabsData[],
    value: number,
    setTabsData: (data: TabsData[]) => void
    setValue: (index: number) => void

}

const initialTabsData: TabsDataContextValue = {
    tabsData: [
        {
            id: 0,
            name: 'overview.md',
            node: <Overview/>,
            closed: false
        },
        {
            id: 1,
            name: 'skills.md',
            node: <Skills/>,
            closed: false
        },
        {
            id: 2,
            name: 'experience.md',
            node: <Experience/>,
            closed: false
        },
        {
            id: 3,
            name: 'education.md',
            node: <Education/>,
            closed: false
        },
        {
            id: 4,
            name: 'projects.md',
            node: <Projects/>,
            closed: false
        },
        {
            id: 5,
            name: 'certificates.md',
            node: <Certificates/>,
            closed: false
        },
        {
            id: 6,
            name: 'accomplishments.md',
            node: <Accomplishments/>,
            closed: false
        },
        {
            id: 7,
            name: 'Settings',
            node: <Settings/>,
            closed: true
        }
    ],
    value: 0,
    setTabsData: (data) => { },
    setValue: (index) => {}
}
export const TabsDataContext = React.createContext<TabsDataContextValue>(initialTabsData);

export const TabsDataProvider = ({ children }: Props) => {
    const [tabsData, setTabsData] = React.useState<TabsData[]>(initialTabsData.tabsData);
    const [value, setValue] = React.useState(initialTabsData.value);

    return (
        <TabsDataContext.Provider value={{ tabsData, value, setTabsData, setValue }}>
            {children}
        </TabsDataContext.Provider>
    );
};

const useTabsData = () => {
    const context = useContext(TabsDataContext);

    if (context === undefined) {
        throw new Error("useTabsData must be used within a TabsDataProvider");
    }
    return context;
};

export default useTabsData;