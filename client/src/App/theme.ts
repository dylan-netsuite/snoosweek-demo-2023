import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#02315c',
    },
    secondary: {
      main: '#ffa800',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    h3: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: '35px',
      color: '#ff4500',
    },
    h5: {
      fontFamily: '"Arial", sans-serif',
      fontSize: '20px',
      color: '#7a9299',
    },
  },
});

export default theme;
