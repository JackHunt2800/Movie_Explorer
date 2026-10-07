import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  IconButton,
  Avatar,
  Stack,
  CircularProgress,
  Alert,
  Tooltip,
  Paper,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LanguageIcon from '@mui/icons-material/Language';
import GroupIcon from '@mui/icons-material/Group';
import MovieIcon from '@mui/icons-material/Movie';
import { tmdbApi, IMAGE_BASE_URL, BACKDROP_BASE_URL } from '../api/tmdb';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import TrailerModal from '../components/TrailerModal';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovies();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerOpen, setTrailerOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);
    setError(null);

    tmdbApi
      .getMovieDetails(id)
      .then((data) => {
        if (mounted) {
          setMovie(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError('Failed to load movie details. Please try again.');
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={48} color="primary" />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Movie not found.'}
        </Alert>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
          Back to Movies
        </Button>
      </Container>
    );
  }

  const favorited = isFavorite(movie.id);

  // Find trailer key
  const trailerVideo =
    movie.videos?.results?.find(
      (v) => (v.type === 'Trailer' || v.type === 'Teaser') && v.site === 'YouTube'
    ) || movie.videos?.results?.[0];

  const trailerKey = trailerVideo ? trailerVideo.key : null;

  // Cast members
  const cast = movie.credits?.cast ? movie.credits.cast.slice(0, 8) : [];

  // Similar movies
  const similarMovies = movie.similar?.results ? movie.similar.results.slice(0, 4) : [];

  // Format runtime
  const formatRuntime = (mins) => {
    if (!mins) return 'N/A';
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <Box sx={{ pb: 8 }}>
      {/* Backdrop Header */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: 320, md: 460 },
          backgroundImage: movie.backdrop_path
            ? `url(${BACKDROP_BASE_URL}${movie.backdrop_path})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg, rgba(11,15,25,0.5) 0%, rgba(11,15,25,0.92) 80%, #0B0F19 100%)'
                : 'linear-gradient(180deg, rgba(248,250,252,0.4) 0%, rgba(248,250,252,0.92) 80%, #F8FAFC 100%)',
          },
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, pt: 3 }}>
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              color: 'text.primary',
              bgcolor: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(8px)',
              borderRadius: 50,
              px: 2,
              mb: 2,
            }}
          >
            Back
          </Button>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxWidth="xl" sx={{ mt: { xs: -14, md: -20 }, position: 'relative', zIndex: 3 }}>
        <Grid container spacing={4}>
          {/* Left: Poster & Quick Action Buttons */}
          <Grid size={{ xs: 12, md: 4, lg: 3.5 }}>
            <Paper
              elevation={8}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ position: 'relative', aspectRatio: '2/3', bgcolor: 'action.hover' }}>
                {movie.poster_path ? (
                  <Box
                    component="img"
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MovieIcon sx={{ fontSize: 60, opacity: 0.5 }} />
                  </Box>
                )}
              </Box>

              <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {/* Watch Trailer Button */}
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<PlayCircleFilledWhiteIcon />}
                  onClick={() => setTrailerOpen(true)}
                  sx={{ py: 1.3, fontWeight: 700 }}
                >
                  Watch Official Trailer
                </Button>

                {/* Add to Favorites Button */}
                <Button
                  fullWidth
                  variant={favorited ? 'outlined' : 'contained'}
                  color="primary"
                  size="large"
                  startIcon={favorited ? <FavoriteIcon sx={{ color: '#F43F5E' }} /> : <FavoriteBorderIcon />}
                  onClick={() => toggleFavorite(movie)}
                  sx={{ py: 1.3, fontWeight: 700 }}
                >
                  {favorited ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Right: Movie Info, Overview, Cast */}
          <Grid size={{ xs: 12, md: 8, lg: 8.5 }}>
            <Box sx={{ pt: { xs: 0, md: 4 } }}>
              {/* Title & Tagline */}
              <Typography
                variant="h3"
                component="h1"
                className="heading-display"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '2rem', sm: '2.8rem', md: '3.2rem' },
                  lineHeight: 1.15,
                  mb: 1,
                }}
              >
                {movie.title}
              </Typography>

              {movie.tagline && (
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ fontStyle: 'italic', mb: 2, fontSize: '1.1rem' }}
                >
                  "{movie.tagline}"
                </Typography>
              )}

              {/* Chips & Badges Bar */}
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                flexWrap="wrap"
                useFlexGap
                sx={{ mb: 3, rowGap: 1 }}
              >
                {/* Rating */}
                <Chip
                  icon={<StarIcon sx={{ fontSize: '16px !important', color: '#FBBF24 !important' }} />}
                  label={`${movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'} / 10`}
                  sx={{
                    fontWeight: 700,
                    bgcolor: 'rgba(251, 191, 36, 0.15)',
                    color: '#FBBF24',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                  }}
                />

                {/* Release Year */}
                <Chip
                  icon={<CalendarMonthIcon sx={{ fontSize: '15px !important' }} />}
                  label={movie.release_date || 'N/A'}
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />

                {/* Runtime */}
                {movie.runtime > 0 && (
                  <Chip
                    icon={<AccessTimeIcon sx={{ fontSize: '15px !important' }} />}
                    label={formatRuntime(movie.runtime)}
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                )}

                {/* Language */}
                {movie.original_language && (
                  <Chip
                    icon={<LanguageIcon sx={{ fontSize: '15px !important' }} />}
                    label={movie.original_language.toUpperCase()}
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                )}
              </Stack>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ display: 'block', mb: 1, textTransform: 'uppercase' }}>
                    Genres
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ rowGap: 1 }}>
                    {movie.genres.map((g) => (
                      <Chip
                        key={g.id}
                        label={g.name}
                        color="primary"
                        variant="filled"
                        sx={{ fontWeight: 600, fontSize: '0.8rem' }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Synopsis / Overview */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom className="heading-display">
                  Storyline
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}
                >
                  {movie.overview || 'No storyline synopsis available for this title.'}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Cast & Actors Section */}
              {cast.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <GroupIcon color="primary" />
                    <Typography variant="h6" fontWeight={700} className="heading-display">
                      Top Cast & Characters
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    {cast.map((actor) => (
                      <Grid size={{ xs: 6, sm: 4, md: 3 }} key={actor.id}>
                        <Paper
                          sx={{
                            p: 1.5,
                            borderRadius: 3,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            bgcolor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                          }}
                        >
                          <Avatar
                            src={
                              actor.profile_path
                                ? `${IMAGE_BASE_URL}${actor.profile_path}`
                                : undefined
                            }
                            alt={actor.name}
                            sx={{ width: 44, height: 44 }}
                          >
                            {actor.name.charAt(0)}
                          </Avatar>
                          <Box sx={{ overflow: 'hidden' }}>
                            <Typography
                              variant="body2"
                              fontWeight={700}
                              noWrap
                              sx={{ fontSize: '0.85rem' }}
                            >
                              {actor.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              noWrap
                              sx={{ display: 'block', fontSize: '0.75rem' }}
                            >
                              {actor.character || 'Cast'}
                            </Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Similar / Recommended Movies */}
        {similarMovies.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" fontWeight={800} gutterBottom className="heading-display">
              You Might Also Like
            </Typography>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {similarMovies.map((similar) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={similar.id}>
                  <MovieCard movie={similar} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>

      {/* Embedded Trailer Modal */}
      <TrailerModal
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        movieTitle={movie.title}
        trailerKey={trailerKey}
      />
    </Box>
  );
};

export default MovieDetailsPage;
