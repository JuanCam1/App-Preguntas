import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';

const idRoot = document.getElementById('root');
const root = createRoot(idRoot);
root.render(
  <App />
)