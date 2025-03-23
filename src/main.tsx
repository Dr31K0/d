
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Make sure we have a valid root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found! Creating a root element...');
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
}

// Ensure Lovable script is loaded
const ensureLovableScript = () => {
  const scriptId = 'lovable-script';
  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://cdn.gpteng.co/gptengineer.js';
    script.type = 'module';
    document.head.appendChild(script);
    console.log('Lovable script added to document');
  }
};

ensureLovableScript();

// Render the app with improved error handling
try {
  console.log('Mounting React application...');
  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React application mounted successfully');
} catch (error) {
  console.error('Failed to mount React application:', error);
  // Display a fallback error message to the user
  const rootEl = document.getElementById('root');
  if (rootEl) {
    rootEl.innerHTML = `
      <div style="font-family: system-ui, sans-serif; padding: 2rem; text-align: center;">
        <h1 style="color: #d00; margin-bottom: 1rem;">Application Error</h1>
        <p>We're sorry, but the application failed to load. Please try refreshing the page.</p>
        <p style="font-size: 0.8rem; margin-top: 1rem;">Technical details: ${error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    `;
  }
}
