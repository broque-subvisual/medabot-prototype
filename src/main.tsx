import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './tokens/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="phone-frame-wrapper">
      <App />
    </div>
  </StrictMode>
);
