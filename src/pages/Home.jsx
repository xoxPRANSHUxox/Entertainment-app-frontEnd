import React from 'react'
import axios from 'axios'
import Searchbar from '../components/cssComponents/Searchbar'
import MediaRecommend from '../components/homeMedia/MediaRecommend'
import RecommendedTVSHOw from '../components/homeMedia/RecommendedTVSHOw'

function Home() {
  return (
    <div className=''>
      <Searchbar />
      <MediaRecommend />
      <RecommendedTVSHOw/>
    </div>
  )
}

export default Home
