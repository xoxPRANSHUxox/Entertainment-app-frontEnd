import React, { useEffect, useState } from "react";
import axios from "axios";
import Token from "../utils/Token";
import { FaBookmark } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useBookmarks } from "../Context";

function TVSeries() {
  const [page, setPage] = useState(1);
  const [tvSeriesList, setTvSeriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const {addBookmark} = useBookmarks();


  const getTVSeries = (pageNumber) => {
    setLoadingMore(true);
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/tv",
      params: {
        include_adult: "true",
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
          setTvSeriesList(response.data.results);
        } else {
          setTvSeriesList((prevList) => [...prevList, ...response.data.results]);
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
    getTVSeries(page);
  }, [page]);

  const getSeriesTrailer = (seriesId) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/${seriesId}/videos`,
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

  const handleSeriesClick = (series) => {
    setSelectedSeries(series);
    getSeriesTrailer(series.id);
  };

  const closeModal = () => {
    setSelectedSeries(null);
    setTrailer(null);
  };

  const loadMore = (e) => {
    e.preventDefault();
    setPage((prevPage) => prevPage + 1);
  };

  const handleAddBookmark = (series) => {
    const tvData = {
      id: series.id,
      title: series.name, // Map 'name' to 'title'
      release_date: series.first_air_date, // Map 'first_air_date' to 'release_date'
      poster_path: series.poster_path,
      vote_average: series.vote_average,
    };
  
    addBookmark(tvData); // Use unified addBookmark function
  };;
  

  return (
    <div className="text-white sm:ml-16 pt-28 sm:pt-8">
      <h1 className="text-3xl font-semibold mb-3 pl-12">TRENDING TV SERIES</h1>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center items-center w-full">
          {tvSeriesList.map((series) => (
            <div
              key={series.id}
              className="relative bg-gray-800 rounded-lg p-2 m-4 w-64 cursor-pointer"
              onClick={() => handleSeriesClick(series)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                alt={series.name}
                className="w-full h-auto rounded-lg mb-1"
              />
              <h2 className="text-lg font-bold my-4">{series.name}</h2>
              <p className="text-xs mb-1">First Air Date: {series.first_air_date}</p>
              <p className="text-xs">Rating: {series.vote_average} / 10</p>

              {/* Bookmark Icon */}
              <FaBookmark 
                className="absolute top-4 right-4 text-2xl cursor-pointer text-neutral-300 "
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening modal
                  handleAddBookmark(series); // Pass entire series object
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

      {selectedSeries && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 rounded-lg p-8 w-3/4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">{selectedSeries.name}</h2>
            <p className="text-sm mb-2">{selectedSeries.overview}</p>
            <p className="mb-2">First Air Date: {selectedSeries.first_air_date}</p>
            <p className="mb-2">Rating: {selectedSeries.vote_average} / 10</p>

            {trailer ? (
              <iframe
                className="w-full h-64"
                src={`https://www.youtube.com/embed/${trailer}`}
                title={selectedSeries.name}
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

export default TVSeries;