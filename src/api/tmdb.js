import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

export const getStoredApiKey = () => {
  return import.meta.env.VITE_TMDB_API_KEY || '';
};

const apiClient = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const apiKey = getStoredApiKey();
  if (apiKey) {
    config.params = {
      ...config.params,
      api_key: apiKey,
    };
  }
  return config;
});

export const tmdbApi = {
  // 1. Fetch Trending Movies
  async getTrending(page = 1) {
    const res = await apiClient.get('/trending/movie/week', {
      params: { page },
    });
    return {
      results: res.data.results || [],
      page: res.data.page || 1,
      total_pages: res.data.total_pages || 1,
    };
  },

  // 2. Search Movies
  async searchMovies(query, page = 1) {
    if (!query || !query.trim()) {
      return this.getTrending(page);
    }
    const res = await apiClient.get('/search/movie', {
      params: {
        query: query.trim(),
        page,
        include_adult: false,
      },
    });
    return {
      results: res.data.results || [],
      page: res.data.page || 1,
      total_pages: res.data.total_pages || 1,
    };
  },

  // 3. Movie Details with credits and videos
  async getMovieDetails(id) {
    const res = await apiClient.get(`/movie/${id}`, {
      params: {
        append_to_response: 'credits,videos,similar',
      },
    });
    return res.data;
  },

  // 4. Genres
  async getGenres() {
    const res = await apiClient.get('/genre/movie/list');
    return res.data.genres || [];
  },
};
