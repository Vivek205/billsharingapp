import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  // TODO: Revert Strict Mode
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);