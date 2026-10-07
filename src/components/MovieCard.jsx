import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Tooltip,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { IMAGE_BASE_URL } from '../api/tmdb';
import { useMovies } from '../context/MovieContext';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovies();
  const [imageError, setImageError] = useState(false);

  const favorited = isFavorite(movie.id);

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'TBA';

  const rating =
    typeof movie.vote_average === 'number'
      ? movie.vote_average.toFixed(1)
      : 'N/A';

  const posterUrl =
    !imageError && movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : null;

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <Card
      onClick={handleCardClick}
      className="movie-card-hover"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 12px 30px rgba(99, 102, 241, 0.22)'
              : '0 12px 28px rgba(99, 102, 241, 0.16)',
          '& .movie-poster': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      {/* Poster Image with Fallback */}
      <Box sx={{ position: 'relative', overflow: 'hidden', aspectRatio: '2/3', bgcolor: 'action.hover' }}>
        {posterUrl ? (
          <CardMedia
            component="img"
            className="movie-poster"
            image={posterUrl}
            alt={movie.title}
            onError={() => setImageError(true)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
            }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(236,72,153,0.1) 100%)',
              p: 2,
              textAlign: 'center',
            }}
          >
            <MovieFilterIcon sx={{ fontSize: 56, color: 'text.secondary', mb: 1, opacity: 0.6 }} />
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              {movie.title}
            </Typography>
          </Box>
        )}

        {/* Favorite Icon Button */}
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 2,
          }}
        >
          <Tooltip title={favorited ? 'Remove from Favorites' : 'Add to Favorites'}>
            <IconButton
              size="small"
              onClick={handleFavoriteClick}
              aria-label={favorited ? 'Remove favorite' : 'Add favorite'}
              sx={{
                bgcolor: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(8px)',
                color: favorited ? '#F43F5E' : '#FFFFFF',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(15, 23, 42, 0.95)',
                  transform: 'scale(1.15)',
                  color: '#F43F5E',
                },
              }}
            >
              {favorited ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Rating Floating Badge */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            zIndex: 2,
          }}
        >
          <Chip
            size="small"
            icon={<StarIcon sx={{ fontSize: '15px !important', color: '#FBBF24 !important' }} />}
            label={rating}
            sx={{
              bgcolor: 'rgba(15, 23, 42, 0.85)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.8rem',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              px: 0.5,
            }}
          />
        </Box>
      </Box>

      {/* Card Info */}
      <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
          <Chip
            label={releaseYear}
            size="small"
            variant="outlined"
            sx={{
              height: 22,
              fontSize: '0.72rem',
              fontWeight: 600,
              color: 'text.secondary',
              borderColor: 'divider',
            }}
          />
          {movie.vote_count > 0 && (
            <Typography variant="caption" color="text.secondary">
              {movie.vote_count.toLocaleString()} votes
            </Typography>
          )}
        </Box>

        <Typography
          variant="subtitle1"
          component="h3"
          sx={{
            fontWeight: 700,
            fontSize: '1rem',
            lineHeight: 1.3,
            mb: 0.8,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          {movie.title}
        </Typography>

        {movie.overview && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: '0.82rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              mt: 'auto',
              lineHeight: 1.4,
            }}
          >
            {movie.overview}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
