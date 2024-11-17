import React, { useState, useEffect } from 'react';
import Token from '../../utils/Token'; // Ensure this path is correct
import axios from 'axios';
import Slider from '../cssComponents/Slider'; // Ensure this path is correct

function MediaRecommend() {
  const [tvList, setTVList] = useState([]);

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/tv',
    params: {
      include_adult: 'false',
      include_video: 'false',
      language: 'en-US',
      page: '1',
      sort_by: 'popularity.desc',
    },
    headers: {
      accept: 'application/json',
      Authorization: Token,
    },
  };

  const getMovies = () => {
    axios
      .request(options)
      .then((response) => {
        setTVList(response.data.results); // Store the movie list from API response
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {re
    getMovies();
  }, []);

  if (!tvList.length) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className='ml-[8rem]'> 
      <h1 className='text-white text-2xl mt-8 font-bold'>TRENDING TV SHOWS</h1>
      <Slider List={tvList} Time={7000}/> 
    </div>
  );
}

export default MediaRecommend;
