import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Paper,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useMovies();
  const [filterQuery, setFilterQuery] = useState('');
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const filteredFavorites = useMemo(() => {
    if (!filterQuery.trim()) return favorites;
    const query = filterQuery.toLowerCase().trim();
    return favorites.filter((m) => m.title.toLowerCase().includes(query));
  }, [favorites, filterQuery]);

  const handleClearAll = () => {
    favorites.forEach((m) => removeFavorite(m.id));
    setClearDialogOpen(false);
  };

  return (
    <Box sx={{ py: 5, minHeight: '80vh' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
            mb: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: 2.5,
                bgcolor: 'rgba(236, 72, 153, 0.15)',
                color: '#EC4899',
                display: 'flex',
              }}
            >
              <FavoriteIcon sx={{ fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={900} className="heading-display">
                Your Saved Favorites
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {favorites.length} {favorites.length === 1 ? 'film' : 'films'} stored in your local library
              </Typography>
            </Box>
          </Box>

          {favorites.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteSweepIcon />}
              onClick={() => setClearDialogOpen(true)}
              sx={{ borderRadius: 50, px: 2 }}
            >
              Clear All Favorites
            </Button>
          )}
        </Box>

        {/* Search Within Favorites */}
        {favorites.length > 0 && (
          <Box sx={{ mb: 4, maxWidth: 450 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Filter your saved films..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" fontSize="small" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 50, bgcolor: 'background.paper' },
              }}
            />
          </Box>
        )}

        {/* Favorites Grid or Empty State */}
        {favorites.length === 0 ? (
          <Paper
            sx={{
              p: { xs: 5, sm: 8 },
              textAlign: 'center',
              borderRadius: 4,
              border: '1px dashed',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              maxWidth: 600,
              mx: 'auto',
              mt: 4,
            }}
          >
            <FavoriteIcon sx={{ fontSize: 68, color: '#EC4899', opacity: 0.35, mb: 2 }} />
            <Typography variant="h5" fontWeight={800} gutterBottom className="heading-display">
              No Favorite Movies Yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
              Click the heart icon on any movie card or details page to save films here for instant access anytime.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ExploreIcon />}
              onClick={() => navigate('/')}
              sx={{ borderRadius: 50, px: 4, py: 1.2, fontWeight: 700 }}
            >
              Discover Trending Movies
            </Button>
          </Paper>
        ) : filteredFavorites.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 4, bgcolor: 'background.paper' }}>
            <Typography variant="h6" fontWeight={600} color="text.secondary">
              No saved movies match "{filterQuery}".
            </Typography>
            <Button variant="text" onClick={() => setFilterQuery('')} sx={{ mt: 1 }}>
              Reset Filter
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredFavorites.map((movie) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Clear Confirmation Dialog */}
      <Dialog open={clearDialogOpen} onClose={() => setClearDialogOpen(false)}>
        <DialogTitle>Clear all saved favorites?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action will remove all {favorites.length} saved movies from your local storage. You cannot undo this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setClearDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleClearAll} color="error" variant="contained">
            Clear All
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FavoritesPage;
