// src/theme.ts

import { createTheme } from '@rneui/themed';

declare module '@rneui/themed' {
  interface Theme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      white: string;
      black: string;
      grey0: string;
      grey1: string;
      grey2: string;
      grey3: string;
      grey4: string;
      grey5: string;
      greyOutline: string;
      success: string;
      error: string;
      warning: string;
      disabled: string;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    borderRadius: {
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    typography: {
      h1: { fontSize: number; fontWeight: string; lineHeight: number };
      h2: { fontSize: number; fontWeight: string; lineHeight: number };
      h3: { fontSize: number; fontWeight: string; lineHeight: number };
      body1: { fontSize: number; lineHeight: number };
      body2: { fontSize: number; lineHeight: number };
      caption: { fontSize: number; lineHeight: number };
    };
  }
}

export const theme = createTheme({
  lightColors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    white: '#FFFFFF',
    black: '#000000',
    grey0: '#393e42',
    grey1: '#43484d',
    grey2: '#5e6977',
    grey3: '#86939e',
    grey4: '#bdc6cf',
    grey5: '#e1e8ee',
    greyOutline: '#bbb',
    success: '#4CD964',
    error: '#FF3B30',
    warning: '#FFCC00',
    disabled: '#CCCCCC',
  },
  darkColors: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    white: '#FFFFFF',
    black: '#000000',
    grey0: '#393e42',
    grey1: '#43484d',
    grey2: '#5e6977',
    grey3: '#86939e',
    grey4: '#bdc6cf',
    grey5: '#e1e8ee',
    greyOutline: '#bbb',
    success: '#4CD964',
    error: '#FF453A',
    warning: '#FFD60A',
    disabled: '#666666',
  },
  mode: 'light', // ניתן לשנות ל 'dark' או לנהל דינמית לפי מצב מערכת ההפעלה
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: 28,
    },
    body1: {
      fontSize: 16,
      lineHeight: 24,
    },
    body2: {
      fontSize: 14,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
    },
  },
});
