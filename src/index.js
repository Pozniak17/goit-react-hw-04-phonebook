import React from 'react';

import { App } from 'components/App';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

// import ReactDOM from 'react-dom/client'; <- This import is only // for React version 18
import { render } from 'react-dom'; // <- This is the correct import // statement for React version 17

// const root = //ReactDOM.createRoot(document.getElementById('root'));
const root = document.getElementById('root'); // <- This is the //correct method call for React version 17
render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  root
);
