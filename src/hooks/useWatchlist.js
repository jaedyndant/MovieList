import { useState, useEffect } from 'react';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('movieWatchlist');
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  const addToWatchlist = (movie) => {
    const newWatchlist = [...watchlist, movie];
    setWatchlist(newWatchlist);
    localStorage.setItem('movieWatchlist', JSON.stringify(newWatchlist));
  };

  const removeFromWatchlist = (imdbID) => {
    const newWatchlist = watchlist.filter(movie => movie.imdbID !== imdbID);
    setWatchlist(newWatchlist);
    localStorage.setItem('movieWatchlist', JSON.stringify(newWatchlist));
  };

  const isInWatchlist = (imdbID) => {
    return watchlist.some(movie => movie.imdbID === imdbID);
  };

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
};