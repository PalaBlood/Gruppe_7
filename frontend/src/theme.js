import { createTheme } from '@mui/material/styles';
import { colors } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      contrastText: '#FFFFFF',
      dark: colors.blue[900],
      main: colors.blue[500],
      light: colors.blue[100]
    },
    secondary: {
      contrastText: '#FFFFFF',
      dark: colors.teal[900],
      main: colors.teal[700],
      light: colors.teal[500]
    },
    error: {
      contrastText: '#FFFFFF',
      dark: colors.red[900],
      main: colors.red[600],
      light: colors.red[400]
    },
    background: {
      default: '#F4F6F8',
      paper: '#FFFFFF'
    },
    text: {
      primary: colors.grey[900],
      secondary: colors.grey[700],
      link: colors.blue[600]
    },
    
  },
  typography: {
    fontSize: 14,
    htmlFontSize: 16,
    body1: {
      fontSize: '1rem', 
    },
    h1: {
      fontSize: '2.125rem', 
      '@media (max-width:600px)': {
        fontSize: '1.5rem', 
      },
    },
    h2: {
      fontSize: '1.5rem', 
      '@media (max-width:600px)': {
        fontSize: '1.25rem', 
      },
    },
    
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
