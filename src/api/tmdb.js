import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

// Default demo API key (can be overridden in settings or .env)
const DEFAULT_API_KEY = '844dba0bfd8f3a4f3799f6130ef9e335';

export const getStoredApiKey = () => {
  return import.meta.env.VITE_TMDB_API_KEY || DEFAULT_API_KEY;
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

// Curated high quality mock dataset with real poster & backdrop assets and YouTube trailer IDs
export const MOCK_GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasy' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
];

export const MOCK_MOVIES = [
  {
    id: 693134,
    title: 'Dune: Part Two',
    overview: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.',
    poster_path: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    backdrop_path: '/xOMo8BRK7PfcJv9JCnx7s520frd.jpg',
    release_date: '2024-02-27',
    vote_average: 8.3,
    vote_count: 5320,
    genre_ids: [878, 12],
    genres: [{ id: 878, name: 'Science Fiction' }, { id: 12, name: 'Adventure' }],
    runtime: 166,
    credits: {
      cast: [
        { id: 1, name: 'Timothée Chalamet', character: 'Paul Atreides', profile_path: '/BE2sdjpgsa2rNTFa66f7upkaOP.jpg' },
        { id: 2, name: 'Zendaya', character: 'Chani', profile_path: '/tyFvN1iSmvsm5v7cW27o8nSjL7A.jpg' },
        { id: 3, name: 'Rebecca Ferguson', character: 'Lady Jessica', profile_path: '/6NRiSp787e6K4q1yL2yPcvLwXqG.jpg' },
        { id: 4, name: 'Javier Bardem', character: 'Stilgar', profile_path: '/6h1bA6iL5B32qK3j7X9fN2cM0lP.jpg' },
      ],
    },
    videos: {
      results: [
        { id: 'v1', key: 'Way9Dexny3w', name: 'Official Trailer 3', site: 'YouTube', type: 'Trailer' },
      ],
    },
  },
  {
    id: 872585,
    title: 'Oppenheimer',
    overview: 'The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.',
    poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdrop_path: '/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg',
    release_date: '2023-07-19',
    vote_average: 8.1,
    vote_count: 8650,
    genre_ids: [18],
    genres: [{ id: 18, name: 'Drama' }],
    runtime: 180,
    credits: {
      cast: [
        { id: 5, name: 'Cillian Murphy', character: 'J. Robert Oppenheimer', profile_path: '/262k79Fh3GZ0W1j7yK7d2kF8a9.jpg' },
        { id: 6, name: 'Emily Blunt', character: 'Katherine Oppenheimer', profile_path: '/nPJXaRMvuFLvgm17hug09a4ebL4.jpg' },
        { id: 7, name: 'Matt Damon', character: 'Leslie Groves', profile_path: '/elSlNgV8xVifsbHpF2PavRuTyUt.jpg' },
        { id: 8, name: 'Robert Downey Jr.', character: 'Lewis Strauss', profile_path: '/5qHNjhtjMD4YWH3fq0lAQnq19Rf.jpg' },
      ],
    },
    videos: {
      results: [
        { id: 'v2', key: 'uYPbbksJxIg', name: 'Official Trailer', site: 'YouTube', type: 'Trailer' },
      ],
    },
  },
  {
    id: 569094,
    title: 'Spider-Man: Across the Spider-Verse',
    overview: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    poster_path: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    backdrop_path: '/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    release_date: '2023-05-31',
    vote_average: 8.4,
    vote_count: 6700,
    genre_ids: [16, 28, 12, 878],
    genres: [{ id: 16, name: 'Animation' }, { id: 28, name: 'Action' }, { id: 878, name: 'Science Fiction' }],
    runtime: 140,
    credits: {
      cast: [
        { id: 9, name: 'Shameik Moore', character: 'Miles Morales (voice)', profile_path: '/2L2s0vJ9Z5L2Qe7Xv7A8mX3e2a.jpg' },
        { id: 10, name: 'Hailee Steinfeld', character: 'Gwen Stacy (voice)', profile_path: '/dxSDn11xVp7H9x1B2y3a2C4d5E.jpg' },
        { id: 11, name: 'Oscar Isaac', character: 'Miguel O\'Hara (voice)', profile_path: '/cY0U3xZz1B8vG3kY2mN4oP5qR.jpg' },
      ],
    },
    videos: {
      results: [
        { id: 'v3', key: 'cqGjhVJWtEg', name: 'Official Trailer 2', site: 'YouTube', type: 'Trailer' },
      ],
    },
  },
  {
    id: 157336,
    title: 'Interstellar',
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop_path: '/rAiYTsqJJR0KP8x443pE9P2nveC.jpg',
    release_date: '2014-11-05',
    vote_average: 8.4,
    vote_count: 35120,
    genre_ids: [12, 18, 878],
    genres: [{ id: 12, name: 'Adventure' }, { id: 18, name: 'Drama' }, { id: 878, name: 'Science Fiction' }],
    runtime: 169,
    credits: {
      cast: [
        { id: 12, name: 'Matthew McConaughey', character: 'Cooper', profile_path: '/sY2mwpafcwqyuoGAAT3GRHbqiOw.jpg' },
        { id: 13, name: 'Anne Hathaway', character: 'Brand', profile_path: '/tLKitBbjhaRbM4n5GPhZk7tAcNk.jpg' },
        { id: 14, name: 'Jessica Chastain', character: 'Murph', profile_path: '/lodMzLKSuhgLpY2u8Ew6m3dC1rS.jpg' },
      ],
    },
    videos: {
      results: [
        { id: 'v4', key: 'zSWdZVtXT7E', name: 'Official Trailer', site: 'YouTube', type: 'Trailer' },
      ],
    },
  },
  {
    id: 27205,
    title: 'Inception',
    overview: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets, is offered a chance to regain his old life as payment for a task considered to be impossible: "inception".',
    poster_path: '/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    backdrop_path: '/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg',
    release_date: '2010-07-15',
    vote_average: 8.4,
    vote_count: 36200,
    genre_ids: [28, 878, 12],
    genres: [{ id: 28, name: 'Action' }, { id: 878, name: 'Science Fiction' }, { id: 12, name: 'Adventure' }],
    runtime: 148,
    credits: {
      cast: [
        { id: 15, name: 'Leonardo DiCaprio', character: 'Dom Cobb', profile_path: '/wo2AlTn0m0JCU7zfsFs9Ee8zHV.jpg' },
        { id: 16, name: 'Joseph Gordon-Levitt', character: 'Arthur', profile_path: '/dhv9B37E64bW07pPzNfXhJvL8gK.jpg' },
        { id: 17, name: 'Elliot Page', character: 'Ariadne', profile_path: '/c5A1w9x0L8vQ4mZ1bF7yC3uD9a.jpg' },
      ],
    },
    videos: {
      results: [
        { id: 'v5', key: 'YoHD9XEInc0', name: 'Official Trailer', site: 'YouTube', type: 'Trailer' },
      ],
    },
  },
  {
    id: 155,
    title: 'The Dark Knight',
    overview: 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent, but finds himself in a cat-and-mouse game against the criminal mastermind known as The Joker.',
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop_path: '/dqK9Hag1054tghRQSqLSfrkvQnA.jpg',
    release_date: '2008-07-16',
    vote_average: 8.5,
    vote_count: 32400,
    genre_ids: [18, 28, 80, 53],
    genres: [{ id: 18, name: 'Drama' }, { id: 28, name: 'Action' }, { id: 80, name: 'Crime' }],
    runtime: 152,
    credits: {
      cast: [
        { id: 18, name: 'Christian Bale', character: 'Bruce Wayne / Batman', profile_path: '/b7fTC9WFkgq6O87OGKQOk0m6R4.jpg' },
        { id: 19, name: 'Heath Ledger', character: 'Joker', profile_path: '/5Y9HnYYa9jF25A0FqZz5Xv4l4hL.jpg' },
        { id: 20, name: 'Gary Oldman', character: 'James Gordon', profile_path: '/2v9Fs9wqZz4aJ2l8v9qK8mX2yA.jpg' },
      ],
    },
    videos: {
      results: [
        { id: 'v6', key: 'EXeTwQWrcwY', name: 'Official Trailer', site: 'YouTube', type: 'Trailer' },
      ],
    },
  },
  {
    id: 299534,
    title: 'Avengers: Endgame',
    overview: 'After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers assemble once more.',
    poster_path: '/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    backdrop_path: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    release_date: '2019-04-24',
    vote_average: 8.3,
    vote_count: 25100,
    genre_ids: [12, 878, 28],
    genres: [{ id: 12, name: 'Adventure' }, { id: 878, name: 'Science Fiction' }, { id: 28, name: 'Action' }],
    runtime: 181,
    credits: {
      cast: [
        { id: 21, name: 'Robert Downey Jr.', character: 'Tony Stark / Iron Man', profile_path: '/5qHNjhtjMD4YWH3fq0lAQnq19Rf.jpg' },
        { id: 22, name: 'Chris Evans', character: 'Steve Rogers / Captain America', profile_path: '/bOHRz63Q5M6V3h4wB6n5F7k9X.jpg' },
        { id: 23, name: 'Mark Ruffalo', character: 'Bruce Banner / Hulk', profile_path: '/z3xZ1B9vG3kY2mN4oP5qR6sT7u.jpg' },
      ],
    },
    videos: {
      results: [
        { id: 'v7', key: 'TcMBFSGVi1c', name: 'Official Trailer', site: 'YouTube', type: 'Trailer' },
      ],
    },
  },
  {
    id: 496243,
    title: 'Parasite',
    overview: 'All unemployed, Ki-taek\'s family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.',
    poster_path: '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    backdrop_path: '/hiKmp9Sm9k2t8xZ14XJkZlQz7M2.jpg',
    release_date: '2019-05-30',
    vote_average: 8.5,
    vote_count: 17800,
    genre_ids: [35, 53, 18],
    genres: [{ id: 35, name: 'Comedy' }, { id: 53, name: 'Thriller' }, { id: 18, name: 'Drama' }],
    runtime: 132,
    credits: {
      cast: [
        { id: 24, name: 'Song Kang-ho', character: 'Kim Ki-taek', profile_path: '/8hK4Xv2Y3a2C4d5E6F7g8H9i0.jpg' },
        { id: 25, name: 'Lee Sun-kyun', character: 'Park Dong-ik', profile_path: '/9jL5Xv2Y3a2C4d5E6F7g8H9i0.jpg' },
        { id: 26, name: 'Cho Yeo-jeong', character: 'Choi Yeon-gyo', profile_path: '/1aB2C3d4E5f6G7h8I9j0K1l2.jpg' },
      ],
    },
    videos: {
      results: [
        { id: 'v8', key: '5xH0R_fxnyQ', name: 'Official Trailer', site: 'YouTube', type: 'Trailer' },
      ],
    },
  },
  {
    id: 129,
    title: 'Spirited Away',
    overview: 'A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.',
    poster_path: '/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
    backdrop_path: '/Ab8mkHmkYADjU7wQiOkia99GQI.jpg',
    release_date: '2001-07-20',
    vote_average: 8.5,
    vote_count: 16400,
    genre_ids: [16, 14, 12],
    genres: [{ id: 16, name: 'Animation' }, { id: 14, name: 'Fantasy' }, { id: 12, name: 'Adventure' }],
    runtime: 125,
    credits: {
      cast: [
        { id: 27, name: 'Rumi Hiiragi', character: 'Chihiro Ogino (voice)', profile_path: '/7yC3uD9a0L8vQ4mZ1bF7yC3uD.jpg' },
        { id: 28, name: 'Miyu Irino', character: 'Haku (voice)', profile_path: '/8zD4uE0b1M9wR5n2cG8zD4uE.jpg' },
      ],
    },
    videos: {
      results: [
        { id: 'v9', key: 'ByXuk9QqQkk', name: 'Official Trailer', site: 'YouTube', type: 'Trailer' },
      ],
    },
  },
  {
    id: 550,
    title: 'Fight Club',
    overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.',
    poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    backdrop_path: '/hZkgoQYus5vegHoetLkCJzb17zJ.jpg',
    release_date: '1999-10-15',
    vote_average: 8.4,
    vote_count: 28900,
    genre_ids: [18, 53],
    genres: [{ id: 18, name: 'Drama' }, { id: 53, name: 'Thriller' }],
    runtime: 139,
    credits: {
      cast: [
        { id: 29, name: 'Edward Norton', character: 'The Narrator', profile_path: '/e6aB2C3d4E5f6G7h8I9j0K1l2.jpg' },
        { id: 30, name: 'Brad Pitt', character: 'Tyler Durden', profile_path: '/f7bC3d4E5f6G7h8I9j0K1l2m3.jpg' },
        { id: 31, name: 'Helena Bonham Carter', character: 'Marla Singer', profile_path: '/g8cD4e5F6g7H8i9J0k1L2m3n4.jpg' },
      ],
    },
    videos: {
      results: [
        { id: 'v10', key: 'qtRKDV93gkQ', name: 'Official Trailer', site: 'YouTube', type: 'Trailer' },
      ],
    },
  },
  {
    id: 238,
    title: 'The Godfather',
    overview: 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch Vito Corleone barely survives an attempt on his life, his youngest son steps up.',
    poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    backdrop_path: '/tmU7GeKVybMWF92GlZ16G7wh5.jpg',
    release_date: '1972-03-14',
    vote_average: 8.7,
    vote_count: 20100,
    genre_ids: [18, 80],
    genres: [{ id: 18, name: 'Drama' }, { id: 80, name: 'Crime' }],
    runtime: 175,
    credits: {
      cast: [
        { id: 32, name: 'Marlon Brando', character: 'Don Vito Corleone', profile_path: '/h9dE5f6G7h8I9j0K1l2m3n4o5.jpg' },
        { id: 33, name: 'Al Pacino', character: 'Michael Corleone', profile_path: '/i0eF6g7H8i9J0k1L2m3n4o5p6.jpg' },
        { id: 34, name: 'James Caan', character: 'Sonny Corleone', profile_path: '/j1fG7h8I9j0K1l2m3n4o5p6q7.jpg' },
      ],
    },
    videos: {
      results: [
        { id: 'v11', key: 'UaVTIH8mujA', name: 'Official Trailer', site: 'YouTube', type: 'Trailer' },
      ],
    },
  },
  {
    id: 11,
    title: 'Star Wars: A New Hope',
    overview: 'Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team up together.',
    poster_path: '/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
    backdrop_path: '/zqkmTXzjkAgMfHNOS5rmum9j5ds.jpg',
    release_date: '1977-05-25',
    vote_average: 8.2,
    vote_count: 20400,
    genre_ids: [12, 28, 878],
    genres: [{ id: 12, name: 'Adventure' }, { id: 28, name: 'Action' }, { id: 878, name: 'Science Fiction' }],
    runtime: 121,
    credits: {
      cast: [
        { id: 35, name: 'Mark Hamill', character: 'Luke Skywalker', profile_path: '/k2gH8i9J0k1L2m3n4o5p6q7r8.jpg' },
        { id: 36, name: 'Harrison Ford', character: 'Han Solo', profile_path: '/l3hI9j0K1l2m3n4o5p6q7r8s9.jpg' },
        { id: 37, name: 'Carrie Fisher', character: 'Princess Leia', profile_path: '/m4iJ0k1L2m3n4o5p6q7r8s9t0.jpg' },
      ],
    },
    videos: {
      results: [
        { id: 'v12', key: 'vZ734NWnAHA', name: 'Official Trailer', site: 'YouTube', type: 'Trailer' },
      ],
    },
  },
];

// Helper to filter mock movies locally
const filterMockMovies = (movies, { genre, year, minRating, query }) => {
  return movies.filter((m) => {
    if (query && !m.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }
    if (genre && !m.genre_ids.includes(Number(genre))) {
      return false;
    }
    if (year) {
      const releaseYear = new Date(m.release_date).getFullYear().toString();
      if (releaseYear !== year.toString()) return false;
    }
    if (minRating && m.vote_average < Number(minRating)) {
      return false;
    }
    return true;
  });
};

export const tmdbApi = {
  // 1. Fetch Trending Movies
  async getTrending(page = 1) {
    try {
      const res = await apiClient.get('/trending/movie/week', {
        params: { page },
      });
      return {
        results: res.data.results || [],
        page: res.data.page || 1,
        total_pages: res.data.total_pages || 1,
        isMock: false,
      };
    } catch (err) {
      console.warn('TMDb getTrending failed, falling back to mock dataset:', err.message);
      // Return mock data fallback
      return {
        results: MOCK_MOVIES,
        page: 1,
        total_pages: 1,
        isMock: true,
        mockWarning: 'Using offline demo catalog (TMDb live connection unavailable or limited)',
      };
    }
  },

  // 2. Search Movies
  async searchMovies(query, page = 1) {
    if (!query || !query.trim()) {
      return this.getTrending(page);
    }
    try {
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
        isMock: false,
      };
    } catch (err) {
      console.warn('TMDb searchMovies failed, searching mock dataset:', err.message);
      const filtered = filterMockMovies(MOCK_MOVIES, { query });
      return {
        results: filtered,
        page: 1,
        total_pages: 1,
        isMock: true,
      };
    }
  },

  // 3. Movie Details with credits and videos
  async getMovieDetails(id) {
    try {
      const res = await apiClient.get(`/movie/${id}`, {
        params: {
          append_to_response: 'credits,videos,similar',
        },
      });
      return { ...res.data, isMock: false };
    } catch (err) {
      console.warn(`TMDb getMovieDetails(${id}) failed, matching mock:`, err.message);
      const mockMovie = MOCK_MOVIES.find((m) => m.id === Number(id));
      if (mockMovie) {
        return {
          ...mockMovie,
          similar: { results: MOCK_MOVIES.filter((m) => m.id !== Number(id)).slice(0, 4) },
          isMock: true,
        };
      }
      // If not in primary mock, return first with matching title or synthetic
      return {
        ...MOCK_MOVIES[0],
        id: Number(id),
        title: `Movie #${id}`,
        isMock: true,
      };
    }
  },

  // 4. Genres
  async getGenres() {
    try {
      const res = await apiClient.get('/genre/movie/list');
      return res.data.genres || MOCK_GENRES;
    } catch (err) {
      console.warn('TMDb getGenres failed, using mock genres:', err.message);
      return MOCK_GENRES;
    }
  },

  // 5. Test API Connection
  async testConnection(customKey) {
    try {
      const keyToTest = customKey || getStoredApiKey();
      const res = await axios.get(`${TMDB_BASE_URL}/configuration`, {
        params: { api_key: keyToTest },
        timeout: 5000,
      });
      return { success: true, images: res.data.images };
    } catch (err) {
      return { success: false, error: err.response?.data?.status_message || err.message };
    }
  },
};
