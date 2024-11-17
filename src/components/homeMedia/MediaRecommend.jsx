import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from '../cssComponents/Slider'; // Ensure this path is correct
import token from '../../utils/Token';

function MediaRecommend() {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie',
    params: {
      include_adult: 'false',
      include_video: 'false',
      language: 'en-US',
      page: page.toString(), 
      sort_by: 'popularity.desc',
    },
    headers: {
      accept: 'application/json',
      Authorization: token,
    },
  };

  // Fetch movies by page
  const getMovies = (nextPage = 1) => {
    setLoading(true); // Set loading to true when fetching data
    axios
      .request({ ...options, params: { ...options.params, page: nextPage } })
      .then((response) => {
        setMovieList((prevList) => [...prevList, ...response.data.results]); // Append new movies
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  // Load the initial movies on component mount
  useEffect(() => {
    getMovies(page);
  }, [page]); // Re-fetch movies when the page number changes

  // Callback to load more movies when slider reaches the end
  const handleEndOfSlider = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1); // Increment the page
    }
  };

  if (!movieList.length) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className='ml-[8rem]'>
      <h1 className='text-white text-2xl font-bold my-4'>TRENDING MOVIES</h1>
      <Slider List={movieList} Time={5000} onEndOfSlider={handleEndOfSlider} />
      {loading && <div>Loading more...</div>} {/* Show loading message */}
    </div>
  );
}

export default MediaRecommend;
