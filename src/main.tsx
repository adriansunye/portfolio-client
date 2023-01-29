import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {ColorModeProvider}  from '@/services/providers/ColorModeProvider';
import {ExplorerStateProvider}  from '@/services/providers/ExplorerStateProvider';
import { TabsDataProvider } from './services/providers/TabsDataProvider';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ColorModeProvider>
      <TabsDataProvider>
        <ExplorerStateProvider>
          <App />
        </ExplorerStateProvider>
      </TabsDataProvider>
    </ColorModeProvider>
  </React.StrictMode>,
)
