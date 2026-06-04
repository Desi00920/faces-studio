import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext'
import { TRPCProvider } from '@/providers/trpc'

createRoot(document.getElementById('root')!).render(
  <LanguageProvider>
    <TRPCProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </TRPCProvider>
  </LanguageProvider>
)
