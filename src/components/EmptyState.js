import React from 'react';
import { motion } from 'framer-motion';

const EmptyState = ({ type = 'search' }) => {
  const content = {
    search: {
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
          <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: 'No movies found',
      subtitle: 'Try searching with different keywords or check your spelling'
    },
    watchlist: {
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
          <path d="M19 14C19 18.4183 15.4183 22 11 22C6.58172 22 3 18.4183 3 14C3 9.58172 6.58172 6 11 6C15.4183 6 19 9.58172 19 14Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 11L11 13L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Your watchlist is empty',
      subtitle: 'Start adding movies you want to watch later'
    },
    initial: {
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
          <path d="M7 4V2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V4H20C20.5523 4 21 4.44772 21 5C21 5.55228 20.5523 6 20 6H19V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V6H4C3.44772 6 3 5.55228 3 5C3 4.44772 3.44772 4 4 4H7Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 1V4H15V1" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      title: 'Discover amazing movies',
      subtitle: 'Search for your favorite films and build your personal watchlist'
    }
  };

  const currentContent = content[type];

  return (
    <motion.div
      className="empty-state"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="empty-icon"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        {currentContent.icon}
      </motion.div>
      
      <motion.h3
        className="empty-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {currentContent.title}
      </motion.h3>
      
      <motion.p
        className="empty-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {currentContent.subtitle}
      </motion.p>

      <style jsx>{`
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px 20px;
          min-height: 300px;
        }

        .empty-icon {
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 24px;
        }

        .empty-title {
          font-size: 24px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 12px;
        }

        .empty-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.6);
          max-width: 400px;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .empty-state {
            padding: 40px 20px;
          }

          .empty-title {
            font-size: 20px;
          }

          .empty-subtitle {
            font-size: 14px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default EmptyState;