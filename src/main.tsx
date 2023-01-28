import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {ColorModeProvider}  from '@/services/providers/ColorModeProvider';
import {ExplorerStateProvider}  from '@/services/providers/ExplorerStateProvider';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ColorModeProvider>
      <ExplorerStateProvider>
        <App />
      </ExplorerStateProvider>
    </ColorModeProvider>
  </React.StrictMode>,
)
