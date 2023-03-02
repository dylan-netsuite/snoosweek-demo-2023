import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from 'App/App';
import theme from 'App/theme';
import { hot } from 'react-hot-loader';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import nsConnect from './ns-connect-dev';
import { REST } from 'netsuite-react';

if (process.env.NODE_ENV === 'development') {
  //@ts-ignore
  window.REST = REST;
  axios.interceptors.request.use(req => {
    if (!req.headers) {
      req.headers = {};
    }
    req.headers['Authorization'] = nsConnect(req);
    return req;
  });
}

const RootApp = process.env.NODE_ENV === 'development' ? hot(module)(App) : App;
ReactDOM.render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <RootApp />
    </ThemeProvider>
  </LocalizationProvider>,
  document.getElementById('root')
);
