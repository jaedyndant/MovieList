import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import LoadingSkeleton from './components/LoadingSkeleton';
import EmptyState from './components/EmptyState';
import { searchMovies } from './utils/api';
import { useWatchlist } from './hooks/useWatchlist';
import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentView, setCurrentView] = useState('search'); // 'search' or 'watchlist'
  const [hasSearched, setHasSearched] = useState(false);
  
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const handleSearch = async (query) => {
    setLoading(true);
    setHasSearched(true);
    setCurrentView('search');
    
    const result = await searchMovies(query);
    
    if (result.Response === 'True') {
      setMovies(result.Search);
    } else {
      setMovies([]);
    }
    
    setLoading(false);
  };

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleWatchlistToggle = (movie) => {
    if (isInWatchlist(movie.imdbID)) {
      removeFromWatchlist(movie.imdbID);
    } else {
      addToWatchlist(movie);
    }
  };

  const showWatchlist = () => {
    setCurrentView('watchlist');
    setMovies(watchlist);
    setLoading(false);
  };

  const showSearch = () => {
    setCurrentView('search');
    if (hasSearched) {
      handleSearch(searchTerm);
    } else {
      setMovies([]);
    }
  };

  return (
    <div className="app">
      <div className="background-gradient"></div>
      <div className="background-particles"></div>
      <motion.header
        className="header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="header-content">
          <motion.h1
            className="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            🎬 MovieList
          </motion.h1>
          
          <nav className="nav">
            <motion.button
              className={`nav-btn ${currentView === 'search' ? 'active' : ''}`}
              onClick={showSearch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Search
            </motion.button>
            <motion.button
              className={`nav-btn ${currentView === 'watchlist' ? 'active' : ''}`}
              onClick={showWatchlist}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watchlist ({watchlist.length})
            </motion.button>
          </nav>
        </div>
      </motion.header>


      <main className="main">
        <div className="container">
          {currentView === 'search' && (
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
            />
          )}

          {currentView === 'watchlist' && (
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2>My Watchlist</h2>
              <p>Movies you want to watch later</p>
            </motion.div>
          )}


          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingSkeleton />
              </motion.div>
            ) : movies.length > 0 ? (
              <motion.div
                key="movies"
                className="movies-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {movies.map((movie, index) => (
                  <motion.div
                    key={movie.imdbID}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MovieCard
                      movie={movie}
                      onCardClick={handleCardClick}
                      isInWatchlist={isInWatchlist(movie.imdbID)}
                      onWatchlistToggle={handleWatchlistToggle}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EmptyState 
                  type={currentView === 'watchlist' ? 'watchlist' : hasSearched ? 'search' : 'initial'} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>


      <MovieModal
        movie={selectedMovie}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isInWatchlist={selectedMovie ? isInWatchlist(selectedMovie.imdbID) : false}
        onWatchlistToggle={handleWatchlistToggle}
      />

      <style jsx>{`
        .app {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .background-gradient {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #000000;
          z-index: -2;
        }

        .background-particles {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
          z-index: -1;
        }

        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid #333;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          cursor: pointer;
        }

        .nav {
          display: flex;
          gap: 1rem;
        }

        .nav-btn {
          background: transparent;
          border: 1px solid #333;
          border-radius: 25px;
          padding: 10px 20px;
          color: #999;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          border-color: #fff;
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }

        .nav-btn.active {
          background: white;
          border-color: white;
          color: black;
        }

        .main {
          padding: 2rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
          color: white;
        }

        .section-header p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 16px;
        }

        .movies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 24px;
          padding: 0 1rem;
        }

        @media (max-width: 1200px) {
          .movies-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .header-content {
            padding: 1rem;
            flex-direction: column;
            gap: 1rem;
          }

          .logo {
            font-size: 20px;
            text-align: center;
          }

          .nav {
            gap: 0.5rem;
            width: 100%;
            justify-content: center;
          }

          .nav-btn {
            padding: 8px 16px;
            font-size: 14px;
            flex: 1;
            max-width: 120px;
          }

          .movies-grid {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 16px;
            padding: 0;
          }

          .section-header h2 {
            font-size: 24px;
          }

          .section-header p {
            font-size: 14px;
          }

          .main {
            padding: 1rem 0;
          }
        }

        @media (max-width: 480px) {
          .header-content {
            padding: 0.75rem;
          }

          .logo {
            font-size: 18px;
          }

          .nav-btn {
            padding: 6px 12px;
            font-size: 12px;
          }

          .movies-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 12px;
          }

          .section-header h2 {
            font-size: 20px;
          }

          .container {
            padding: 0 0.5rem;
          }
        }

        @media (max-width: 320px) {
          .movies-grid {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .nav-btn {
            font-size: 11px;
            padding: 5px 8px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;