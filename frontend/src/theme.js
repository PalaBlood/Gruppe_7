import { createTheme } from '@mui/material/styles';
import { colors } from '@mui/material';

const white = '#FFFFFF';
const black = '#000000';


const theme = createTheme({
  palette: {
    black,
    white,
    primary: {
      contrastText: white,
      dark: colors.deepPurple[900],  
      main: colors.deepPurple[500], 
      light: colors.deepPurple[100]  
    },
    secondary: {
      contrastText: white,
      dark: colors.teal[900],       
      main: colors.teal[700],       
      light: colors.teal[500]     
    },
    success: {
      contrastText: white,
      dark: colors.green[900],
      main: colors.green[600],
      light: colors.green[400]
    },
    info: {
      contrastText: white,
      dark: colors.blue[900],
      main: colors.blue[600],
      light: colors.blue[400]
    },
    warning: {
      contrastText: white,
      dark: colors.orange[900],
      main: colors.orange[600],
      light: colors.orange[400]
    },
    error: {
      contrastText: white,
      dark: colors.red[900],
      main: colors.red[600],
      light: colors.red[400]
    },
    text: {
      primary: colors.grey[900],    
      secondary: colors.grey[700],  
      link: colors.blue[600]
    },
    background: {
      default: '#F4F6F8',
      paper: white
    },
    icon: colors.grey[700],          
    divider: colors.grey[300]        
  }, 
});

export default theme;
