import React, { ReactNode } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

type Props = {
  children: ReactNode;
};

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#ba000d'
    }
  },
  typography: {
    fontSize: 14,
    h1: {
      fontSize: 24
    },
    h2: {
      fontSize: 20
    }
  }
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         fontSize: '14px'
  //       }
  //     }
  //   },
  //   MuiInputLabel: {
  //     styleOverrides: {
  //       root: {
  //         fontSize: '14px'
  //       }
  //     }
  //   },
  //   MuiTypography: {
  //     styleOverrides: {
  //       root: {
  //         fontSize: '14px'
  //       },
  //       h1: {
  //         fontSize: '24px'
  //       },
  //       h2: {
  //         fontSize: '18px'
  //       }
  //     }
  //   }
  // }
});

const MuiThemeProvider = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
