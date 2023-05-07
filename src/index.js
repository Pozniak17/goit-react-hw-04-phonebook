import React from 'react';
// import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';

import { render } from 'react-dom'; // <- This is the correct import // statement for React version 17

const root = document.getElementById('root'); // <- This is the //correct method call for React version 17
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);
