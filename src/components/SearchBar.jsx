import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Chip,
  Typography,
  Stack,
  Fade,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import HistoryIcon from '@mui/icons-material/History';
import RestoreIcon from '@mui/icons-material/Restore';
import { useMovies } from '../context/MovieContext';

const SearchBar = ({ onSearchSubmit }) => {
  const {
    searchQuery,
    searchMovies,
    lastSearchedQuery,
    searchHistory,
    clearSearch,
  } = useMovies();

  const [inputVal, setInputVal] = useState(searchQuery || '');

  useEffect(() => {
    setInputVal(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (inputVal.trim()) {
      searchMovies(inputVal.trim(), 1, true);
      if (onSearchSubmit) onSearchSubmit();
    }
  };

  const handleClear = () => {
    setInputVal('');
    clearSearch();
  };

  const handleChipClick = (term) => {
    setInputVal(term);
    searchMovies(term, 1, true);
    if (onSearchSubmit) onSearchSubmit();
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 760, mx: 'auto', mb: 3 }}>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: '4px 6px',
            borderRadius: 50,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 8px 30px rgba(0, 0, 0, 0.4)'
                : '0 8px 30px rgba(99, 102, 241, 0.1)',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            '&:hover, &:focus-within': {
              borderColor: 'primary.main',
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 8px 30px rgba(99, 102, 241, 0.25)'
                  : '0 8px 30px rgba(99, 102, 241, 0.18)',
            },
          }}
        >
          <TextField
            fullWidth
            placeholder="Search films by title (e.g. Dune, Oppenheimer, Spider-Man)..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start" sx={{ pl: 1.5, pr: 0.5 }}>
                  <SearchIcon color="primary" sx={{ fontSize: 26 }} />
                </InputAdornment>
              ),
              endAdornment: inputVal ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleClear}
                    edge="end"
                    aria-label="clear search"
                    sx={{ mr: 0.5 }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
              sx: {
                py: 0.8,
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                fontWeight: 500,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 50,
              px: { xs: 2.5, sm: 3.5 },
              py: 1.1,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            Search
          </Button>
        </Box>
      </form>

      {/* Persistent Last Search Indicator & Search History */}
      <Box sx={{ mt: 1.5, px: 1 }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          flexWrap="wrap"
          useFlexGap
          sx={{ rowGap: 1 }}
        >
          {lastSearchedQuery && (
            <Chip
              icon={<RestoreIcon sx={{ fontSize: '15px !important' }} />}
              label={`Last search: "${lastSearchedQuery}"`}
              size="small"
              onClick={() => handleChipClick(lastSearchedQuery)}
              variant="outlined"
              color="primary"
              sx={{
                fontWeight: 600,
                fontSize: '0.75rem',
                cursor: 'pointer',
                borderColor: 'primary.main',
              }}
            />
          )}

          {searchHistory.length > 0 && (
            <>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.4, ml: 0.5 }}
              >
                <HistoryIcon sx={{ fontSize: 14 }} /> Recent:
              </Typography>
              {searchHistory.slice(0, 5).map((term) => (
                <Chip
                  key={term}
                  label={term}
                  size="small"
                  onClick={() => handleChipClick(term)}
                  sx={{
                    fontSize: '0.73rem',
                    bgcolor: 'action.hover',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                    },
                  }}
                />
              ))}
            </>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default SearchBar;
