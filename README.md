# 🎬 CinePulse — Movie Explorer

> *"Discover Your Favorite Films"*

A modern, cinematic web application that allows movie lovers to search films, discover trending releases, view deep cast & storyline insights, watch official YouTube trailers, and save their favorites. Built with **React 19**, **React Context API**, **Material-UI (MUI)**, and powered by **The Movie Database (TMDb) API**.

---

## 🌟 Key Features Implemented

### 1. User Interface & Experience
- **Cinematic Dark & Light Modes**: Seamless theme toggle with persisted theme state in `localStorage` and customized Material-UI color tokens (deep midnight slate `#0B0F19` and pristine light `#F8FAFC`).
- **Hero Showcase Banner**: Displays the week's #1 trending movie with dynamic backdrop, rating badge, overview, and quick-action buttons.
- **Responsive Movie Cards**: Shows high-resolution posters, rating badges with star icon, release year chip, vote count, title, and synopsis snippet with smooth hover zoom animations.
- **Mobile-First Responsive Layout**: Adaptive grid layouts across mobile, tablet, and desktop screens with a slide-out navigation drawer.

### 2. State Management with React Context API
The application uses pure **React Context API** with structured modular providers:
- **`MovieContext`**:
  - Fetches and stores trending movies from TMDb API.
  - Manages real-time search queries and search results.
  - **Persistent Last Search**: Saves the user's last searched movie query in `localStorage` and automatically restores it upon reload.
  - **Search History**: Tracks recent searches with clickable chips for one-click re-search.
  - **Local Storage Favorites**: Full CRUD support for saving and removing favorite films with instant reactive badge counter updates in the navbar.
  - **Filter & Sort State**: Real-time filtering by genre, release year, minimum rating, and sorting (popularity, rating, newest, alphabetical).
  - **Customizable Pagination Mode**: Allows toggling between **Infinite Scroll** and **Load More Button** (Bonus Intern Feature).
- **`AuthContext`**:
  - Handles user login with username and password validation.
  - Stores authenticated user session in `localStorage`.
- **`ThemeContext`**:
  - Manages dark/light theme switching and persists user preference.

### 3. API Integration & Robust Fallback Architecture
- **TMDb API v3 Client**: Built using `axios` with interceptors for automatic API key attachment.
  - `GET /trending/movie/week`: Weekly trending films.
  - `GET /search/movie`: Movie search with pagination.
  - `GET /movie/{id}`: Full film details with appended `credits`, `videos`, and `similar`.
  - `GET /genre/movie/list`: Movie genres list.
- **Graceful Error Handling & Demo Fallback**:
  - If TMDb API rate limits, returns 401, or if network connectivity is offline, the app seamlessly falls back to an offline demo catalog with real imagery and trailers so the reviewer never sees a blank screen.
  - **In-App API Key Configuration**: Evaluators can open the API key modal (key icon in the navbar) to input their personal TMDb API key and test connection live.

### 4. Movie Details & Official Trailers
- **Detailed View (`/movie/:id`)**:
  - Full-width backdrop header with gradient vignette.
  - High-res poster, rating score, release date, runtime in hours & minutes, language, and genre tags.
  - Complete storyline overview.
  - Top cast & characters with actor avatars and roles.
  - Similar films recommendation carousel.
- **YouTube Trailer Modal**:
  - Embedded YouTube player with autoplay support and clean modal dialog.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **State Management**: React Context API (`MovieContext`, `AuthContext`, `ThemeContext`)
- **UI & Components**: Material-UI (MUI v6/v9) + Emotion (`@emotion/react`, `@emotion/styled`)
- **Icons**: `@mui/icons-material`
- **Routing**: `react-router-dom` v7
- **HTTP Client**: `axios`
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *Outfit*)

---

## 📂 Project Architecture

```
Movie Explorer_Loons/
├── public/                     # Static assets & favicon
├── src/
│   ├── api/
│   │   └── tmdb.js             # TMDb API client, axios configuration, mock fallback
│   ├── components/
│   │   ├── FilterBar.jsx       # Genre, year, rating, sorting & scroll mode controls
│   │   ├── Footer.jsx          # Footer with TMDb API attribution
│   │   ├── MovieCard.jsx       # Reusable movie poster card with ratings & favorites
│   │   ├── MovieSkeleton.jsx   # Skeleton loading placeholder grid
│   │   ├── Navbar.jsx          # Responsive navbar with favorites badge & theme switch
│   │   ├── SearchBar.jsx       # Search input with debounce, last search chip & history
│   │   └── TrailerModal.jsx    # Modal dialog with embedded YouTube trailer player
│   ├── context/
│   │   ├── AuthContext.jsx     # Authentication context with localStorage persistence
│   │   ├── MovieContext.jsx    # Pure React Context API managing movie data & filters
│   │   └── ThemeContext.jsx    # Dark/light theme context with MUI ThemeProvider
│   ├── pages/
│   │   ├── FavoritesPage.jsx   # Saved favorites library with search & clear
│   │   ├── HomePage.jsx        # Hero showcase, search, filter, and movie grid
│   │   ├── LoginPage.jsx       # User login page with demo autofill
│   │   └── MovieDetailsPage.jsx# Deep movie view with cast, trailers & similar films
│   ├── App.css
│   ├── App.jsx                 # App shell with providers and React Router routes
│   ├── index.css               # Global cinematic typography and custom scrollbars
│   └── main.jsx                # Application root entry point
├── .env.example                # Example environment variables
├── package.json                # Project dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Comprehensive project documentation
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**

### 1. Clone the repository
```bash
git clone <repository_url>
cd "Movie Explorer_Loons"
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your TMDb API key:
```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```
*(Note: A built-in demo key is pre-configured so the app works immediately out of the box without requiring manual API key generation).*

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
```bash
npm run build
```

---

## 🌐 Deployment Instructions (Vercel / Netlify)

### Deploy on Vercel
1. Push the code to GitHub / GitLab.
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Select your repository.
4. Set Build Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, add `VITE_TMDB_API_KEY` (optional).
6. Click **Deploy**.

### Deploy on Netlify
1. Create a `netlify.toml` file or configure via UI:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
2. Add single-page application redirect rule (`/* /index.html 200`).
3. Deploy!

---

## 📋 Feature Checklist Reference

- [x] **User Login interface** with username and password.
- [x] **Search bar** with relevant results and debouncing.
- [x] **Grid of movie posters** with title, release year, and rating.
- [x] **Detailed view** with overview, genres, cast, and trailer link.
- [x] **Trending movies section** displaying popular films from TMDb.
- [x] **Light/Dark mode** implemented for optimal user experience.
- [x] **TMDb API integration** with axios.
- [x] **Infinite scrolling** + **"Load More" button** toggle (Bonus).
- [x] **Graceful error handling** with user-friendly alerts and offline demo fallback.
- [x] **React Context API** state management for all movie data.
- [x] **Local storage persistence** for the user's last searched movie.
- [x] **Local storage persistence** for favorite movies list.
- [x] **Filter movies by genre, year, or rating** (Bonus).
- [x] **YouTube trailer player** modal (Bonus).
- [x] **Material-UI (MUI)** modern styling and components.
- [x] **React Router** navigation (`/`, `/movie/:id`, `/favorites`, `/login`).
- [x] **Mobile-first responsive design**.
