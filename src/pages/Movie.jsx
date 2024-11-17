import React, { useEffect, useState } from "react";
import axios from "axios";
import Token from "../utils/Token";
import { FaBookmark } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useBookmarks } from "../context";

function Movie() {
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const { addBookmark } = useBookmarks(); // Fix here

  const getMovie = (pageNumber) => {
    setLoadingMore(true);

    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: pageNumber,
        sort_by: "popularity.desc",
      },
      headers: {
        accept: "application/json",
        Authorization: Token,
      },
    };

    axios
      .request(options)
      .then((response) => {
        if (pageNumber === 1) {
          setMovieList(response.data.results);
        } else {
          setMovieList((prevList) => [...prevList, ...response.data.results]);
        }
        setLoading(false);
        setLoadingMore(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    getMovie(page);
  }, [page]);

  const getMovieTrailer = (movieId) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      params: {
        language: "en-US",
      },
      headers: {
        accept: "application/json",
        Authorization: Token,
      },
    };

    axios
      .request(options)
      .then((response) => {
        const trailerData = response.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailer(trailerData ? trailerData.key : null);
      })
      .catch((error) => {
        console.error(error);
        setTrailer(null);
      });
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    getMovieTrailer(movie.id);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setTrailer(null);
  };

  const loadMore = (e) => {
    e.preventDefault();
    setPage((prevPage) => prevPage + 1);
  };

  const handleAddBookmark = (movie) => {
    const movieData = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    };
  
    addBookmark(movieData); // Use unified addBookmark function
  };

  return (
    <div className="text-white ml-16 pt-8 pl-8">
      <h1 className="text-3xl font-semibold mb-3 pl-12">TRENDING MOVIES</h1>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center items-center w-full">
          {movieList.map((movie) => (
            <div
              key={movie.id}
              className="relative bg-gray-800 rounded-lg p-2 m-4 w-64 cursor-pointer"
              onClick={() => handleMovieClick(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded-lg mb-1"
              />
              <h2 className="text-lg font-bold my-4">{movie.title}</h2>
              <p className="text-xs mb-1">Release Date: {movie.release_date}</p>
              <p className="text-xs">Rating: {movie.vote_average} / 10</p>

              {/* Bookmark Icon */}
              <FaBookmark 
                className="absolute top-4 right-4 text-2xl cursor-pointer text-neutral-300 "
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening modal
                  handleAddBookmark(movie); // Pass entire movie object
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4">
        {!loadingMore ? (
          <button
            onClick={loadMore}
            className="relative px-4 py-2 font-semibold text-white bg-red-700 rounded-lg"
          >
            LOAD MORE
          </button>
        ) : (
          <div>Loading more...</div>
        )}
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 rounded-lg p-8 w-3/4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">{selectedMovie.title}</h2>
            <p className="text-sm mb-2">{selectedMovie.overview}</p>
            <p className="mb-2">Release Date: {selectedMovie.release_date}</p>
            <p className="mb-2">Rating: {selectedMovie.vote_average} / 10</p>

            {trailer ? (
              <iframe
                className="w-full h-64"
                src={`https://www.youtube.com/embed/${trailer}`}
                title={selectedMovie.title}
                allowFullScreen
              ></iframe>
            ) : (
              <p>Loading Trailer...</p>
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
      <ToastContainer />
    </div>
  );
}

export default Movie;
