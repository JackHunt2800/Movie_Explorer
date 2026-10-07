import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const ThemeContext = createContext();

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return context;
};

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('movie_explorer_theme_mode');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark'; // Default sleek cinema dark
  });

  useEffect(() => {
    localStorage.setItem('movie_explorer_theme_mode', mode);
    if (mode === 'dark') {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                primary: {
                  main: '#6366F1', // Indigo
                  light: '#818CF8',
                  dark: '#4F46E5',
                  contrastText: '#FFFFFF',
                },
                secondary: {
                  main: '#EC4899', // Cinema Rose Pink
                  light: '#F472B6',
                  dark: '#DB2777',
                  contrastText: '#FFFFFF',
                },
                background: {
                  default: '#0B0F19', // Deep Midnight Cinema
                  paper: '#131B2E',
                },
                text: {
                  primary: '#F8FAFC',
                  secondary: '#94A3B8',
                },
                divider: 'rgba(255, 255, 255, 0.08)',
              }
            : {
                primary: {
                  main: '#4F46E5',
                  light: '#6366F1',
                  dark: '#4338CA',
                  contrastText: '#FFFFFF',
                },
                secondary: {
                  main: '#E11D48',
                  light: '#FB7185',
                  dark: '#BE123C',
                  contrastText: '#FFFFFF',
                },
                background: {
                  default: '#F8FAFC',
                  paper: '#FFFFFF',
                },
                text: {
                  primary: '#0F172A',
                  secondary: '#64748B',
                },
                divider: 'rgba(0, 0, 0, 0.08)',
              }),
        },
        typography: {
          fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          h1: {
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
          },
          h2: {
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
          },
          h3: {
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
          },
          h4: {
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
          },
          h5: {
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
          },
          h6: {
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
          },
          button: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
        shape: {
          borderRadius: 14,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                padding: '8px 18px',
                fontWeight: 600,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-1px)',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                backgroundImage: 'none',
                boxShadow:
                  mode === 'dark'
                    ? '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)'
                    : '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
                border:
                  mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.08)'
                    : '1px solid rgba(0, 0, 0, 0.06)',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                backgroundColor:
                  mode === 'dark'
                    ? 'rgba(11, 15, 25, 0.82)'
                    : 'rgba(255, 255, 255, 0.85)',
                color: mode === 'dark' ? '#F8FAFC' : '#0F172A',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom:
                  mode === 'dark'
                    ? '1px solid rgba(255, 255, 255, 0.08)'
                    : '1px solid rgba(0, 0, 0, 0.08)',
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
