import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Tooltip,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import StarIcon from '@mui/icons-material/Star';
import { useMovies } from '../context/MovieContext';

const YEARS = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2014', '2010', '2008', '2001', '1999', '1977', '1972'];

const FilterBar = () => {
  const {
    genres,
    filters,
    setFilter,
    resetFilters,
    paginationMode,
    setPaginationMode,
  } = useMovies();

  const isFilterActive =
    Boolean(filters.genre) ||
    Boolean(filters.year) ||
    filters.minRating > 0 ||
    filters.sortBy !== 'popularity.desc';

  const handlePaginationChange = (e, newMode) => {
    if (newMode !== null) {
      setPaginationMode(newMode);
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 2.5 },
        mb: 4,
        borderRadius: 4,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 6px 20px rgba(0, 0, 0, 0.3)'
            : '0 6px 20px rgba(0, 0, 0, 0.04)',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', md: 'center' }}
        justifyContent="space-between"
      >
        {/* Filters Controls */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          flexWrap="wrap"
          useFlexGap
          sx={{ flexGrow: 1 }}
        >
          {/* Genre Filter */}
          <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 140 } }}>
            <InputLabel id="genre-filter-label">Genre</InputLabel>
            <Select
              labelId="genre-filter-label"
              id="genre-filter"
              value={filters.genre}
              label="Genre"
              onChange={(e) => setFilter('genre', e.target.value)}
            >
              <MenuItem value="">All Genres</MenuItem>
              {genres.map((g) => (
                <MenuItem key={g.id} value={g.id}>
                  {g.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Release Year Filter */}
          <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 110 } }}>
            <InputLabel id="year-filter-label">Year</InputLabel>
            <Select
              labelId="year-filter-label"
              id="year-filter"
              value={filters.year}
              label="Year"
              onChange={(e) => setFilter('year', e.target.value)}
            >
              <MenuItem value="">All Years</MenuItem>
              {YEARS.map((yr) => (
                <MenuItem key={yr} value={yr}>
                  {yr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Rating Filter */}
          <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 130 } }}>
            <InputLabel id="rating-filter-label">Rating</InputLabel>
            <Select
              labelId="rating-filter-label"
              id="rating-filter"
              value={filters.minRating}
              label="Rating"
              onChange={(e) => setFilter('minRating', Number(e.target.value))}
            >
              <MenuItem value={0}>Any Rating</MenuItem>
              <MenuItem value={8.5}>8.5+ Masterpiece ★</MenuItem>
              <MenuItem value={8.0}>8.0+ Great ★</MenuItem>
              <MenuItem value={7.0}>7.0+ Good ★</MenuItem>
              <MenuItem value={6.0}>6.0+ Decent ★</MenuItem>
            </Select>
          </FormControl>

          {/* Sort By */}
          <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 150 } }}>
            <InputLabel id="sort-filter-label">Sort By</InputLabel>
            <Select
              labelId="sort-filter-label"
              id="sort-filter"
              value={filters.sortBy}
              label="Sort By"
              onChange={(e) => setFilter('sortBy', e.target.value)}
            >
              <MenuItem value="popularity.desc">Most Popular</MenuItem>
              <MenuItem value="vote_average.desc">Highest Rated</MenuItem>
              <MenuItem value="release_date.desc">Newest Release</MenuItem>
              <MenuItem value="title.asc">Title (A-Z)</MenuItem>
            </Select>
          </FormControl>

          {/* Reset Filters */}
          {isFilterActive && (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              startIcon={<FilterAltOffIcon />}
              onClick={resetFilters}
              sx={{ minWidth: 100, alignSelf: { xs: 'stretch', sm: 'center' } }}
            >
              Reset
            </Button>
          )}
        </Stack>

        {/* Bonus Feature: Scroll Style Toggle (Infinite Scroll vs Load More Button) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: { xs: 1, md: 0 } }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            Pagination Mode:
          </Typography>
          <ToggleButtonGroup
            value={paginationMode}
            exclusive
            onChange={handlePaginationChange}
            size="small"
            aria-label="pagination mode"
            sx={{
              height: 34,
              '& .MuiToggleButton-root': {
                px: 1.5,
                fontSize: '0.78rem',
                textTransform: 'none',
                fontWeight: 600,
              },
            }}
          >
            <ToggleButton value="infinite" aria-label="infinite scroll">
              <Tooltip title="Infinite Scrolling: auto-loads on scroll">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AllInclusiveIcon sx={{ fontSize: 16 }} />
                  <span>Infinite</span>
                </Box>
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="load_more" aria-label="load more button">
              <Tooltip title="Load More Button: manual control for better UX">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <TouchAppIcon sx={{ fontSize: 16 }} />
                  <span>Load More</span>
                </Box>
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Stack>
    </Box>
  );
};

export default FilterBar;
