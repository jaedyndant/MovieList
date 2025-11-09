import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchMovies } from '../utils/api';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [didYouMean, setDidYouMean] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 2) {
      const result = await searchMovies(value);
      if (result.Response === 'True') {
        setSuggestions(result.Search.slice(0, 5));
        setShowSuggestions(true);
        setDidYouMean('');
      } else {
        setSuggestions([]);
        if (value.length > 3) {
          setDidYouMean(generateDidYouMean(value));
        }
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setDidYouMean('');
    }
  };

  const generateDidYouMean = (query) => {
    const commonMovies = ['Batman', 'Superman', 'Spider-Man', 'Avengers', 'Star Wars', 'Harry Potter', 'Lord of the Rings', 'Matrix', 'Inception', 'Interstellar'];
    const closest = commonMovies.find(movie => 
      movie.toLowerCase().includes(query.toLowerCase().substring(0, 3)) ||
      query.toLowerCase().includes(movie.toLowerCase().substring(0, 3))
    );
    return closest || '';
  };

  const handleSuggestionClick = (movie) => {
    setSearchTerm(movie.Title);
    setShowSuggestions(false);
    onSearch(movie.Title);
  };

  const handleDidYouMeanClick = () => {
    setSearchTerm(didYouMean);
    setDidYouMean('');
    onSearch(didYouMean);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="search-container"
    >
      <form onSubmit={handleSubmit} className="search-form">
        <motion.div
          className="search-input-wrapper"
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
        >
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search for movies..."
            className="search-input"
          />
        </motion.div>
        
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              className="suggestions-dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {suggestions.map((movie) => (
                <div
                  key={movie.imdbID}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(movie)}
                >
                  <img src={movie.Poster !== 'N/A' ? movie.Poster : '/api/placeholder/40/60'} alt="" className="suggestion-poster" />
                  <div className="suggestion-info">
                    <div className="suggestion-title">{movie.Title}</div>
                    <div className="suggestion-year">{movie.Year}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {didYouMean && (
          <motion.div
            className="did-you-mean"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Did you mean: <span onClick={handleDidYouMeanClick} className="did-you-mean-suggestion">{didYouMean}</span>?
          </motion.div>
        )}
      </form>

      <style jsx>{`
        .search-container {
          display: flex;
          justify-content: center;
          margin: 2rem 0 3rem;
          padding: 0 1rem;
        }

        .search-form {
          width: 100%;
          max-width: 600px;
        }

        .search-input-wrapper {
          position: relative;
          background: #1a1a1a;
          border: 2px solid #333;
          border-radius: 50px;
          padding: 4px;
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .search-input-wrapper:focus-within {
          border-color: #fff;
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
        }

        .search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          z-index: 1;
        }

        .search-input {
          width: 100%;
          padding: 16px 24px 16px 50px;
          background: transparent;
          border: none;
          outline: none;
          color: white;
          font-size: 16px;
          font-weight: 400;
        }

        .search-input::placeholder {
          color: #666;
        }

        .suggestions-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #1a1a1a;
          border: 2px solid #333;
          border-top: none;
          border-radius: 0 0 16px 16px;
          max-height: 300px;
          overflow-y: auto;
          z-index: 1000;
        }

        .suggestion-item {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          cursor: pointer;
          border-bottom: 1px solid #333;
          transition: background 0.2s ease;
        }

        .suggestion-item:hover {
          background: #333;
        }

        .suggestion-item:last-child {
          border-bottom: none;
        }

        .suggestion-poster {
          width: 40px;
          height: 60px;
          object-fit: cover;
          border-radius: 4px;
          margin-right: 12px;
        }

        .suggestion-info {
          flex: 1;
        }

        .suggestion-title {
          color: white;
          font-weight: 500;
          margin-bottom: 2px;
        }

        .suggestion-year {
          color: #999;
          font-size: 14px;
        }

        .did-you-mean {
          margin-top: 12px;
          text-align: center;
          color: #999;
          font-size: 14px;
        }

        .did-you-mean-suggestion {
          color: white;
          cursor: pointer;
          text-decoration: underline;
        }

        .did-you-mean-suggestion:hover {
          color: #ccc;
        }

        @media (max-width: 768px) {
          .search-input {
            font-size: 14px;
            padding: 14px 20px;
            padding-right: 56px;
          }
          
          .search-button {
            width: 40px;
            height: 40px;
          }

          .search-container {
            margin: 1.5rem 0 2rem;
          }
        }

        @media (max-width: 480px) {
          .search-input {
            font-size: 13px;
            padding: 12px 18px;
            padding-right: 52px;
          }
          
          .search-button {
            width: 36px;
            height: 36px;
            right: 6px;
          }

          .search-container {
            margin: 1rem 0 1.5rem;
            padding: 0 0.5rem;
          }
        }

        @media (max-width: 320px) {
          .search-input {
            font-size: 12px;
            padding: 10px 16px;
            padding-right: 48px;
          }
          
          .search-button {
            width: 32px;
            height: 32px;
          }

          .search-button svg {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default SearchBar;