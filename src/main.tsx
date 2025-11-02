import { StrictMode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '@/components/theme-provider.tsx';

import './index.css';

import { App } from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
      <Toaster />
    </ThemeProvider>
  </StrictMode>,
);
