import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { tmdbApi, getStoredApiKey } from '../api/tmdb';

const MovieContext = createContext();

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  // Movie lists
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSearchedQuery, setLastSearchedQuery] = useState(() => {
    return localStorage.getItem('movie_explorer_last_search') || '';
  });
  const [searchHistory, setSearchHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('movie_explorer_search_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorites state persisted locally
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('movie_explorer_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filters state (Bonus requirement: filter by genre, year, rating, and sort)
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    minRating: 0,
    sortBy: 'popularity.desc',
  });

  // Pagination & UX Mode (Bonus: 'infinite' or 'load_more' toggle)
  const [paginationMode, setPaginationMode] = useState(() => {
    return localStorage.getItem('movie_explorer_pagination_mode') || 'infinite';
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [isMockData, setIsMockData] = useState(false);
  const [apiKey, setApiKeyState] = useState(getStoredApiKey());

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('movie_explorer_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save lastSearchedQuery to localStorage
  useEffect(() => {
    if (lastSearchedQuery) {
      localStorage.setItem('movie_explorer_last_search', lastSearchedQuery);
    }
  }, [lastSearchedQuery]);

  // Save search history
  useEffect(() => {
    localStorage.setItem('movie_explorer_search_history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Save pagination mode
  useEffect(() => {
    localStorage.setItem('movie_explorer_pagination_mode', paginationMode);
  }, [paginationMode]);

  // Load genres on mount
  useEffect(() => {
    let mounted = true;
    tmdbApi.getGenres().then((data) => {
      if (mounted) setGenres(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Fetch Trending
  const fetchTrending = useCallback(async (pageNum = 1, reset = false) => {
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    try {
      const res = await tmdbApi.getTrending(pageNum);
      setIsMockData(Boolean(res.isMock));

      setTrendingMovies((prev) => (pageNum === 1 || reset ? res.results : [...prev, ...res.results]));
      setMovies((prev) => (pageNum === 1 || reset ? res.results : [...prev, ...res.results]));
      setPage(res.page);
      setTotalPages(res.total_pages);
    } catch (err) {
      setError('Unable to load trending movies at this moment. Please check your connection.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Search Movies
  const searchMovies = useCallback(async (query, pageNum = 1, reset = true) => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSearchQuery('');
      fetchTrending(1, true);
      return;
    }

    if (pageNum === 1) {
      setLoading(true);
      setPage(1);
    } else {
      setLoadingMore(true);
    }
    setError(null);
    setSearchQuery(trimmed);

    // Save persistence for last search and search history
    setLastSearchedQuery(trimmed);
    setSearchHistory((prev) => {
      const updated = [trimmed, ...prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())];
      return updated.slice(0, 8); // Keep top 8 recent searches
    });

    try {
      const res = await tmdbApi.searchMovies(trimmed, pageNum);
      setIsMockData(Boolean(res.isMock));

      if (res.results.length === 0 && pageNum === 1) {
        setError(`No movies found for "${trimmed}". Try another title or check filters.`);
      }

      setMovies((prev) => (pageNum === 1 || reset ? res.results : [...prev, ...res.results]));
      setPage(res.page);
      setTotalPages(res.total_pages);
    } catch (err) {
      setError(`Failed to search movies: ${err.message}`);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [fetchTrending]);

  // Load initial movies (either last searched or trending)
  useEffect(() => {
    if (lastSearchedQuery) {
      searchMovies(lastSearchedQuery, 1, true);
    } else {
      fetchTrending(1, true);
    }
  }, []); // Run once on initial mount

  // Load next page
  const loadMore = useCallback(() => {
    if (loading || loadingMore || page >= totalPages) return;
    const nextPage = page + 1;
    if (searchQuery) {
      searchMovies(searchQuery, nextPage, false);
    } else {
      fetchTrending(nextPage, false);
    }
  }, [loading, loadingMore, page, totalPages, searchQuery, searchMovies, fetchTrending]);

  // Toggle Favorite
  const toggleFavorite = useCallback((movie) => {
    if (!movie || !movie.id) return;
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      if (exists) {
        return prev.filter((item) => item.id !== movie.id);
      } else {
        return [
          {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            overview: movie.overview,
            genre_ids: movie.genre_ids || movie.genres?.map((g) => g.id) || [],
          },
          ...prev,
        ];
      }
    });
  }, []);

  const isFavorite = useCallback(
    (movieId) => favorites.some((item) => item.id === Number(movieId)),
    [favorites]
  );

  const removeFavorite = useCallback((movieId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== Number(movieId)));
  }, []);

  // Filter setters
  const setFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      genre: '',
      year: '',
      minRating: 0,
      sortBy: 'popularity.desc',
    });
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    fetchTrending(1, true);
  }, [fetchTrending]);

  const updateApiKey = useCallback((newKey) => {
    setStoredApiKey(newKey);
    setApiKeyState(newKey);
    // Reload trending with new key
    fetchTrending(1, true);
  }, [fetchTrending]);

  // Filter & Sort Logic applied on current movies
  const filteredMovies = useMemo(() => {
    let result = [...movies];

    // Filter by genre
    if (filters.genre) {
      result = result.filter((m) => {
        const ids = m.genre_ids || m.genres?.map((g) => g.id) || [];
        return ids.includes(Number(filters.genre));
      });
    }

    // Filter by year
    if (filters.year) {
      result = result.filter((m) => {
        if (!m.release_date) return false;
        const releaseYear = new Date(m.release_date).getFullYear().toString();
        return releaseYear === filters.year.toString();
      });
    }

    // Filter by rating
    if (filters.minRating > 0) {
      result = result.filter((m) => (m.vote_average || 0) >= Number(filters.minRating));
    }

    // Sort order
    if (filters.sortBy === 'vote_average.desc') {
      result.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
    } else if (filters.sortBy === 'release_date.desc') {
      result.sort((a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0));
    } else if (filters.sortBy === 'title.asc') {
      result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }

    return result;
  }, [movies, filters]);

  const hasMore = page < totalPages;

  return (
    <MovieContext.Provider
      value={{
        movies,
        filteredMovies,
        trendingMovies,
        genres,
        searchQuery,
        lastSearchedQuery,
        searchHistory,
        favorites,
        filters,
        paginationMode,
        page,
        totalPages,
        hasMore,
        loading,
        loadingMore,
        error,
        isMockData,
        apiKey,
        // Methods
        fetchTrending,
        searchMovies,
        loadMore,
        toggleFavorite,
        isFavorite,
        removeFavorite,
        setFilter,
        resetFilters,
        clearSearch,
        setPaginationMode,
        updateApiKey,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
