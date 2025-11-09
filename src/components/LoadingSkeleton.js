import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
  return (
    <div className="skeleton-grid">
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          className="skeleton-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="skeleton-poster"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-meta">
              <div className="skeleton-year"></div>
              <div className="skeleton-rating"></div>
            </div>
            <div className="skeleton-button"></div>
          </div>
        </motion.div>
      ))}

      <style jsx>{`
        .skeleton-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 24px;
          padding: 0 1rem;
        }

        .skeleton-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
        }

        .skeleton-poster {
          aspect-ratio: 2/3;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 100%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        .skeleton-content {
          padding: 16px;
        }

        .skeleton-title {
          height: 20px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 100%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
          margin-bottom: 12px;
        }

        .skeleton-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .skeleton-year {
          width: 60px;
          height: 16px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 100%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
        }

        .skeleton-rating {
          width: 80px;
          height: 16px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 100%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 4px;
        }

        .skeleton-button {
          width: 100%;
          height: 36px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 100%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 8px;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @media (max-width: 768px) {
          .skeleton-grid {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .skeleton-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 12px;
            padding: 0 0.5rem;
          }

          .skeleton-content {
            padding: 12px;
          }
        }

        @media (max-width: 320px) {
          .skeleton-grid {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .skeleton-content {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSkeleton;