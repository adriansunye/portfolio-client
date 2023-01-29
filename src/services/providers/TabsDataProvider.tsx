import React, { useEffect, createContext, useContext } from "react";

type Props = {
    children?: React.ReactNode;
};

interface TabsData {
    id: string,
    name: string,
  }

  
interface TabsDataContextValue {
    tabsData:TabsData[],
    setTabsData:(data:TabsData[]) => void
   }
   

const initialTabsData: TabsDataContextValue = {
    tabsData:[
        {
            id: '2',
            name: 'overview.md',
        },
        {
            id: '3',
            name: 'skills.md',
        },
        {
            id: '4',
            name: 'experience.md',
        },
        {
            id: '5',
            name: 'education.md',
        },
        {
            id: '6',
            name: 'projects.md',
        },
        {
            id: '7',
            name: 'certificates.md',
        },
        {
            id: '8',
            name: 'accomplishments.md',
        },
    ],
    setTabsData: (data) => {}
  }
export const TabsDataContext = React.createContext<TabsDataContextValue>(initialTabsData);

export const TabsDataProvider = ({ children }: Props) => {
    const [tabsData, setTabsData] = React.useState<TabsData[]>([]);

    return (
        <TabsDataContext.Provider value={{ tabsData, setTabsData }}>
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