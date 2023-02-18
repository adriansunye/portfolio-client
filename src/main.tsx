import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ColorModeProvider } from '@/services/providers/ColorModeProvider';
import { ExplorerStateProvider } from '@/services/providers/ExplorerStateProvider';
import { TabsDataProvider } from '@/services/providers/TabsDataProvider';
import { ProjectsProvider } from '@/services/providers/ProjectsProvider';
import UserProvider from '@/services/providers/UserProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ColorModeProvider>
      <TabsDataProvider>
        <ExplorerStateProvider>
          <ProjectsProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </ProjectsProvider>
        </ExplorerStateProvider>
      </TabsDataProvider>
    </ColorModeProvider>
  </React.StrictMode>,
)
