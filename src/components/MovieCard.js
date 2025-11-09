import React from 'react';
import { motion } from 'framer-motion';

const MovieCard = ({ movie, onCardClick, isInWatchlist, onWatchlistToggle }) => {
  const handleWatchlistClick = (e) => {
    e.stopPropagation();
    onWatchlistToggle(movie);
  };

  return (
    <motion.div
      className="movie-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={() => onCardClick(movie)}
    >
      <div className="movie-poster">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/300/450'}
          alt={movie.Title}
          loading="lazy"
        />
        <motion.div
          className="movie-overlay"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className="more-info-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            More Info
          </motion.button>
        </motion.div>
      </div>
      
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <div className="movie-meta">
          <span className="movie-year">{movie.Year}</span>
          {(movie.imdbRating || movie.Ratings) && (
            <span className="movie-rating">
              ⭐ {movie.imdbRating || (movie.Ratings && movie.Ratings[0] ? movie.Ratings[0].Value : 'N/A')}
            </span>
          )}
        </div>
        
        <motion.button
          className={`watchlist-btn ${isInWatchlist ? 'in-watchlist' : ''}`}
          onClick={handleWatchlistClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isInWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
        </motion.button>
      </div>

      <style jsx>{`
        .movie-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .movie-poster {
          position: relative;
          aspect-ratio: 2/3;
          overflow: hidden;
        }

        .movie-poster img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .movie-card:hover .movie-poster img {
          transform: scale(1.05);
        }

        .movie-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 20px;
        }

        .more-info-btn {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border: none;
          border-radius: 25px;
          padding: 12px 24px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
        }

        .movie-info {
          padding: 16px;
        }

        .movie-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .movie-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }

        .movie-rating {
          color: #fbbf24;
        }

        .watchlist-btn {
          width: 100%;
          padding: 10px;
          border: 1px solid rgba(59, 130, 246, 0.5);
          border-radius: 8px;
          background: transparent;
          color: #3b82f6;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .watchlist-btn:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: #3b82f6;
        }

        .watchlist-btn.in-watchlist {
          background: linear-gradient(45deg, #10b981, #059669);
          border-color: #10b981;
          color: white;
        }

        @media (max-width: 768px) {
          .movie-title {
            font-size: 14px;
          }
          
          .movie-meta {
            font-size: 12px;
          }
          
          .watchlist-btn {
            font-size: 12px;
            padding: 8px;
          }

          .movie-info {
            padding: 12px;
          }
        }

        @media (max-width: 480px) {
          .movie-title {
            font-size: 13px;
            -webkit-line-clamp: 1;
          }
          
          .movie-meta {
            font-size: 11px;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
          
          .watchlist-btn {
            font-size: 11px;
            padding: 6px;
          }

          .movie-info {
            padding: 10px;
          }

          .more-info-btn {
            padding: 8px 16px;
            font-size: 12px;
          }
        }

        @media (max-width: 320px) {
          .movie-title {
            font-size: 12px;
          }
          
          .movie-meta {
            font-size: 10px;
          }
          
          .watchlist-btn {
            font-size: 10px;
            padding: 5px;
          }

          .movie-info {
            padding: 8px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default MovieCard;