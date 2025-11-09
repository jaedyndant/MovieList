import React from 'react';
import { motion } from 'framer-motion';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
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
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies..."
            className="search-input"
          />
          <motion.button
            type="submit"
            className="search-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </motion.button>
        </motion.div>
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
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          padding: 4px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .search-input {
          width: 100%;
          padding: 16px 24px;
          background: transparent;
          border: none;
          outline: none;
          color: white;
          font-size: 16px;
          font-weight: 400;
          padding-right: 60px;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .search-button {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border: none;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
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
        }
      `}</style>
    </motion.div>
  );
};

export default SearchBar;