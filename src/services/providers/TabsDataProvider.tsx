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
    activeTabs: TabsData[],
    currentTab: number,
    setTabsData: (data: TabsData[]) => void
    setActiveTabs: (data: TabsData[]) => void
    setCurrentTab: (index: number) => void
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
            name: 'projects.md',
            node: <Projects/>,
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
            name: 'certificates.md',
            node: <Certificates/>,
            closed: false
        },
        {
            id: 5,
            name: 'experience.md',
            node: <Experience/>,
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
    activeTabs: [],
    currentTab: 0,
    setTabsData: (data) => {},
    setActiveTabs: (data) => {},
    setCurrentTab: (index) => {}
}
export const TabsDataContext = React.createContext<TabsDataContextValue>(initialTabsData);

export const TabsDataProvider = ({ children }: Props) => {
    const [tabsData, setTabsData] = React.useState<TabsData[]>(initialTabsData.tabsData);
    const [activeTabs, setActiveTabs] = React.useState<TabsData[]>(initialTabsData.activeTabs);
    const [currentTab, setCurrentTab] = React.useState(initialTabsData.currentTab);

    return (
        <TabsDataContext.Provider value={{ tabsData, activeTabs, currentTab, setTabsData, setActiveTabs, setCurrentTab }}>
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