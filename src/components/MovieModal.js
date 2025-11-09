import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMovieDetails } from '../utils/api';

const MovieModal = ({ movie, isOpen, onClose, isInWatchlist, onWatchlistToggle }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && movie) {
      setLoading(true);
      getMovieDetails(movie.imdbID).then(details => {
        setMovieDetails(details);
        setLoading(false);
      });
    }
  }, [isOpen, movie]);

  const handleWatchlistClick = () => {
    onWatchlistToggle(movie);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading movie details...</p>
            </div>
          ) : movieDetails ? (
            <div className="movie-details">
              <div className="movie-header">
                <img
                  src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : '/api/placeholder/300/450'}
                  alt={movieDetails.Title}
                  className="movie-poster-large"
                />
                <div className="movie-info-detailed">
                  <h1 className="movie-title-large">{movieDetails.Title}</h1>
                  <div className="movie-meta-detailed">
                    <span className="year">{movieDetails.Year}</span>
                    <span className="runtime">{movieDetails.Runtime}</span>
                    <span className="rating">⭐ {movieDetails.imdbRating}/10</span>
                    <span className="rated">{movieDetails.Rated}</span>
                  </div>
                  <div className="genres">
                    {movieDetails.Genre?.split(', ').map(genre => (
                      <span key={genre} className="genre-tag">{genre}</span>
                    ))}
                  </div>
                  <motion.button
                    className={`watchlist-btn-large ${isInWatchlist ? 'in-watchlist' : ''}`}
                    onClick={handleWatchlistClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isInWatchlist ? '✓ Remove from Watchlist' : '+ Add to Watchlist'}
                  </motion.button>
                </div>
              </div>
              
              <div className="movie-description">
                <h3>Plot</h3>
                <p>{movieDetails.Plot}</p>
                
                <div className="movie-credits">
                  <div className="credit-item">
                    <strong>Director:</strong> {movieDetails.Director}
                  </div>
                  <div className="credit-item">
                    <strong>Cast:</strong> {movieDetails.Actors}
                  </div>
                  <div className="credit-item">
                    <strong>Writer:</strong> {movieDetails.Writer}
                  </div>
                  {movieDetails.BoxOffice && (
                    <div className="credit-item">
                      <strong>Box Office:</strong> {movieDetails.BoxOffice}
                    </div>
                  )}
                  {movieDetails.Awards && (
                    <div className="credit-item">
                      <strong>Awards:</strong> {movieDetails.Awards}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}

          <style jsx>{`
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.8);
              backdrop-filter: blur(10px);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 1000;
              padding: 20px;
            }

            .modal-content {
              background: #1a1a1a;
              border: 2px solid #333;
              border-radius: 20px;
              max-width: 800px;
              width: 100%;
              max-height: 90vh;
              overflow-y: auto;
              position: relative;
              box-shadow: 0 20px 60px rgba(255, 255, 255, 0.1);
            }

            .close-btn {
              position: absolute;
              top: 20px;
              right: 20px;
              background: rgba(255, 255, 255, 0.1);
              border: none;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              cursor: pointer;
              z-index: 10;
            }

            .loading {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 60px 20px;
              color: rgba(255, 255, 255, 0.7);
            }

            .spinner {
              width: 40px;
              height: 40px;
              border: 3px solid rgba(59, 130, 246, 0.3);
              border-top: 3px solid #3b82f6;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin-bottom: 16px;
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }

            .movie-details {
              padding: 30px;
            }

            .movie-header {
              display: flex;
              gap: 30px;
              margin-bottom: 30px;
            }

            .movie-poster-large {
              width: 200px;
              height: 300px;
              object-fit: cover;
              border-radius: 12px;
              flex-shrink: 0;
            }

            .movie-info-detailed {
              flex: 1;
            }

            .movie-title-large {
              font-size: 28px;
              font-weight: 700;
              margin-bottom: 16px;
              line-height: 1.2;
            }

            .movie-meta-detailed {
              display: flex;
              gap: 20px;
              margin-bottom: 16px;
              font-size: 14px;
              color: rgba(255, 255, 255, 0.7);
            }

            .rating {
              color: #fbbf24;
            }

            .genres {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
              margin-bottom: 24px;
            }

            .genre-tag {
              background: rgba(255, 255, 255, 0.1);
              border: 1px solid #666;
              border-radius: 20px;
              padding: 6px 12px;
              font-size: 12px;
              color: #ccc;
            }

            .watchlist-btn-large {
              background: white;
              border: none;
              border-radius: 12px;
              padding: 14px 28px;
              color: black;
              font-weight: 600;
              cursor: pointer;
              box-shadow: 0 4px 16px rgba(255, 255, 255, 0.3);
            }

            .watchlist-btn-large.in-watchlist {
              background: #333;
              color: white;
            }

            .movie-description h3 {
              font-size: 20px;
              font-weight: 600;
              margin-bottom: 12px;
              color: white;
            }

            .movie-description p {
              line-height: 1.6;
              margin-bottom: 24px;
              color: rgba(255, 255, 255, 0.9);
            }

            .movie-credits {
              display: flex;
              flex-direction: column;
              gap: 12px;
            }

            .credit-item {
              font-size: 14px;
              line-height: 1.5;
            }

            .credit-item strong {
              color: white;
              margin-right: 8px;
            }

            @media (max-width: 768px) {
              .modal-content {
                margin: 10px;
                max-height: 95vh;
              }

              .movie-header {
                flex-direction: column;
                align-items: center;
                text-align: center;
                gap: 20px;
              }

              .movie-poster-large {
                width: 150px;
                height: 225px;
              }

              .movie-title-large {
                font-size: 24px;
              }

              .movie-meta-detailed {
                justify-content: center;
                flex-wrap: wrap;
              }

              .movie-details {
                padding: 20px;
              }
            }
          `}</style>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MovieModal;