import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@mantine/core/styles.css';
import './index.css'
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './context/auth-context.jsx'
import theme from './theme.js'
import { store } from './store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </MantineProvider>
  </StrictMode>,
)
