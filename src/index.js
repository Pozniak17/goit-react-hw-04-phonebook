import React from 'react';
// import ReactDOM from 'react-dom/client';
import 'modern-normalize';
import { ThemeProvider } from 'styled-components';
import { App } from 'components/App/App';
import { theme } from 'utils/theme';
import { MyStyleReset } from 'utils/resetStyles';

// import ReactDOM from 'react-dom/client'; <- This import is only // for React version 18
import { render } from 'react-dom'; // <- This is the correct import // statement for React version 17
// const root = //ReactDOM.createRoot(document.getElementById('root'));
const root = document.getElementById('root'); // <- This is the //correct method call for React version 17
render(
  <React.StrictMode>
    <MyStyleReset />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  root
);
