import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Token from '../../utils/Token';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Function to fetch search results
  const fetchResults = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]); // Clear results if searchQuery is empty
      return;
    }

    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie',
      params: {
        query: searchQuery,
        language: 'en-US',
        include_adult: 'false',
      },
      headers: {
        accept: 'application/json',
        Authorization: Token,
      },
    };

    try {
      const response = await axios.request(options);
      const filteredResults = response.data.results
        ? response.data.results.filter((item) => item.poster_path !== null)
        : [];
      setResults(filteredResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Handler function to update the query state and fetch results
  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    fetchResults(newQuery); // Fetch results when input changes
  };

  // Function to fetch movie trailer
  const fetchTrailer = async (movieId) => {
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      params: { language: 'en-US' },
      headers: { accept: 'application/json', Authorization: Token },
    };

    try {
      const response = await axios.request(options);
      const trailerData = response.data.results.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      setTrailer(trailerData ? trailerData.key : null);
    } catch (error) {
      console.error('Error fetching trailer:', error);
      setTrailer(null);
    }
  };

  // Handler for movie selection
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    fetchTrailer(movie.id);
  };

  // Close modal and reset trailer
  const closeModal = () => {
    setSelectedMovie(null);
    setTrailer(null);
  };

  // Handle scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="px-4 py-6 sm:px-6 md:px-8 lg:px-12 z-0">
      <form className="mt-16 ml-4 sm:ml-20 sm:mt-0 w-[20rem] max-w-4xl bg-transparent rounded-lg sticky top-0 z-10 bg-gray-800">
        <label htmlFor="default-search" className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-white dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-3 pl-10 text-sm text-white rounded-lg bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-none"
            placeholder="Search for movies or TV series"
            value={query}
            onChange={handleChange}
            required
          />
        </div>
      </form>

      <div className="max-w-4xl mx-20 mt-16">
        {results.length > 0 && (
          <div className="flex flex-wrap justify-start">
            {results.map((result) => (
              <div
                key={result.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 cursor-pointer"
                onClick={() => handleMovieClick(result)}
              >
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                    alt={result.title}
                    className="w-full h-auto"
                  />
                  <div className="p-3">
                    <h3 className="text-sm text-white">{result.title}</h3>
                    <p className="text-xs text-gray-400">Release Date: {result.release_date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 rounded-lg p-8 w-3/4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">{selectedMovie.title}</h2>
            {trailer ? (
              <iframe
                className="w-full h-64"
                src={`https://www.youtube.com/embed/${trailer}`}
                title={selectedMovie.title}
                allowFullScreen
              ></iframe>
            ) : (
              <p className="text-gray-300">Loading Trailer...</p>
            )}

            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-700 rounded-lg text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all z-50"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default SearchBar;
