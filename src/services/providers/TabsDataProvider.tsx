import { Accomplishments, Certificates, Education, Experience, Overview, Projects, Skills } from "@/components/layout/tabs";
import React, { useEffect, createContext, useContext } from "react";

type Props = {
    children?: React.ReactNode;
};

interface TabsData {
    id: number,
    name: string,
    node: React.ReactNode
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
            node: <Overview/>
        },
        {
            id: 1,
            name: 'skills.md',
            node: <Skills/>

        },
        {
            id: 2,
            name: 'experience.md',
            node: <Experience/>

        },
        {
            id: 3,
            name: 'education.md',
            node: <Education/>

        },
        {
            id: 4,
            name: 'projects.md',
            node: <Projects/>

        },
        {
            id: 5,
            name: 'certificates.md',
            node: <Certificates/>

        },
        {
            id: 6,
            name: 'accomplishments.md',
            node: <Accomplishments/>
        },
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