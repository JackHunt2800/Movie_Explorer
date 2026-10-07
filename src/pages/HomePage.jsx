import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Stack,
  Chip,
  IconButton,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarIcon from '@mui/icons-material/Star';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import MovieSkeleton from '../components/MovieSkeleton';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import TrailerModal from '../components/TrailerModal';
import { BACKDROP_BASE_URL } from '../api/tmdb';

const HomePage = () => {
  const navigate = useNavigate();
  const {
    filteredMovies,
    trendingMovies,
    searchQuery,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    fetchTrending,
    clearSearch,
  } = useMovies();

  const [heroTrailerOpen, setHeroTrailerOpen] = useState(false);

  // Top featured movie for hero section (first trending movie with backdrop)
  const heroMovie = trendingMovies.length > 0 ? trendingMovies[0] : null;

  return (
    <Box sx={{ pb: 8 }}>
      {/* Hero Showcase Section (Only when not actively searching) */}
      {!searchQuery && heroMovie && (
        <Box
          sx={{
            position: 'relative',
            minHeight: { xs: 440, md: 540 },
            display: 'flex',
            alignItems: 'center',
            backgroundImage: heroMovie.backdrop_path
              ? `url(${BACKDROP_BASE_URL}${heroMovie.backdrop_path})`
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
            mb: { xs: 4, md: 6 },
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(180deg, rgba(11,15,25,0.4) 0%, rgba(11,15,25,0.85) 60%, #0B0F19 100%)'
                  : 'linear-gradient(180deg, rgba(248,250,252,0.3) 0%, rgba(248,250,252,0.88) 60%, #F8FAFC 100%)',
            },
          }}
        >
          <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, pt: 6, pb: 4 }}>
            <Box sx={{ maxWidth: { xs: '100%', md: 680 } }}>
              <Chip
                icon={<TrendingUpIcon sx={{ fontSize: '16px !important' }} />}
                label="#1 Trending This Week"
                color="secondary"
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  mb: 2,
                  boxShadow: '0 4px 12px rgba(236, 72, 153, 0.4)',
                }}
              />
              <Typography
                variant="h2"
                component="h1"
                className="heading-display"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '2.2rem', sm: '3rem', md: '3.6rem' },
                  lineHeight: 1.1,
                  mb: 1.5,
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                }}
              >
                {heroMovie.title}
              </Typography>

              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Chip
                  icon={<StarIcon sx={{ fontSize: '15px !important', color: '#FBBF24 !important' }} />}
                  label={heroMovie.vote_average ? heroMovie.vote_average.toFixed(1) : '8.4'}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    backdropFilter: 'blur(8px)',
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 600, opacity: 0.9 }}>
                  {heroMovie.release_date
                    ? new Date(heroMovie.release_date).getFullYear()
                    : '2024'}
                </Typography>
              </Stack>

              <Typography
                variant="body1"
                sx={{
                  opacity: 0.9,
                  mb: 3,
                  fontSize: { xs: '0.95rem', md: '1.05rem' },
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                }}
              >
                {heroMovie.overview}
              </Typography>

              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ rowGap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<InfoOutlinedIcon />}
                  onClick={() => navigate(`/movie/${heroMovie.id}`)}
                  sx={{ px: 3, py: 1.2, fontWeight: 700 }}
                >
                  View Details
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => setHeroTrailerOpen(true)}
                  sx={{
                    px: 3,
                    py: 1.2,
                    fontWeight: 700,
                    bgcolor: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(8px)',
                    color: 'inherit',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.22)',
                      borderColor: '#FFFFFF',
                    },
                  }}
                >
                  Watch Trailer
                </Button>
              </Stack>
            </Box>
          </Container>
        </Box>
      )}

      {/* Main Container */}
      <Container maxWidth="xl" sx={{ mt: searchQuery ? 4 : 0 }}>
        {/* Interactive Search Bar */}
        <SearchBar />

        {/* Filters & Sorting Bar */}
        <FilterBar />

        {/* Section Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
            flexWrap: 'wrap',
            gap: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {searchQuery ? (
              <SearchIcon color="primary" sx={{ fontSize: 28 }} />
            ) : (
              <TrendingUpIcon color="secondary" sx={{ fontSize: 28 }} />
            )}
            <Typography variant="h5" component="h2" fontWeight={800} className="heading-display">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Trending Films'}
            </Typography>
            <Chip
              label={`${filteredMovies.length} movies`}
              size="small"
              variant="outlined"
              sx={{ fontWeight: 600, fontSize: '0.75rem' }}
            />
          </Box>

          {searchQuery && (
            <Button
              variant="text"
              color="primary"
              size="small"
              onClick={clearSearch}
              sx={{ fontWeight: 600 }}
            >
              Back to Trending
            </Button>
          )}
        </Box>

        {/* API Error Notification */}
        {error && (
          <Alert
            severity="info"
            action={
              <Button color="inherit" size="small" onClick={() => fetchTrending(1, true)}>
                Retry
              </Button>
            }
            sx={{ mb: 4, borderRadius: 3 }}
          >
            {error}
          </Alert>
        )}

        {/* Initial Loading Skeleton */}
        {loading ? (
          <MovieSkeleton count={8} />
        ) : filteredMovies.length === 0 ? (
          /* Empty Search or Filter Result */
          <Paper
            sx={{
              p: { xs: 4, sm: 8 },
              textAlign: 'center',
              borderRadius: 4,
              border: '1px dashed',
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
            <Typography variant="h6" fontWeight={700} gutterBottom>
              No matching movies found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 450, mx: 'auto', mb: 3 }}>
              {searchQuery
                ? `We couldn't find any films matching "${searchQuery}" with the current filters.`
                : 'Try adjusting your filters or search terms.'}
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              {searchQuery && (
                <Button variant="contained" onClick={clearSearch}>
                  Clear Search
                </Button>
              )}
              <Button variant="outlined" onClick={() => fetchTrending(1, true)}>
                Reload Catalog
              </Button>
            </Stack>
          </Paper>
        ) : (
          /* Movie Grid */
          <>
            <Grid container spacing={3}>
              {filteredMovies.map((movie) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`${movie.id}-${movie.title}`}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>

            {/* Pagination Controls */}
            {/* Load More Button for better UX */}
            {hasMore && (
              <Box sx={{ mt: 6, mb: 2, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={loadMore}
                  disabled={loadingMore}
                  startIcon={
                    loadingMore ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <ArrowDownwardIcon />
                    )
                  }
                  sx={{
                    px: { xs: 4, sm: 6 },
                    py: 1.5,
                    borderRadius: 50,
                    fontWeight: 700,
                    fontSize: '1rem',
                    boxShadow: '0 8px 24px rgba(99, 102, 241, 0.35)',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 28px rgba(99, 102, 241, 0.45)',
                    },
                  }}
                >
                  {loadingMore ? 'Loading More Movies...' : 'Load More Movies'}
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>

      {/* Hero Trailer Modal */}
      {heroMovie && (
        <TrailerModal
          open={heroTrailerOpen}
          onClose={() => setHeroTrailerOpen(false)}
          movieTitle={heroMovie.title}
          trailerKey={
            heroMovie.videos?.results?.find((v) => v.type === 'Trailer')?.key ||
            'Way9Dexny3w'
          }
        />
      )}
    </Box>
  );
};

export default HomePage;
