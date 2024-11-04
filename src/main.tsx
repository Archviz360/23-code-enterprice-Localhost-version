import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { useCollaborationStore } from './store/collaborationStore';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Initialize collaboration
useCollaborationStore.getState().initialize();

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);