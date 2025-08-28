import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'

import { BrowserRouter as Router } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext.tsx';
import { Toaster } from 'react-hot-toast';

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
      <Toaster
      
        position="top-right"
        gutter={12}
        containerStyle={{ margin: 8 }}
        toastOptions={{
          success: {
            duration: 3000
          },
          error: {
            duration: 5000
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#000",
          }
        }}
      />
    </QueryClientProvider>
  </StrictMode>
)
