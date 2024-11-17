import React from 'react'

function Loader() {
  return (
    <div className='flex justify-center items-center'>
      <div className='bg-red-600 w-2 h-2'></div>
      <div className='bg-green-600 w-2 h-2'></div>
      <div className='bg-blue-600 w-2 h-2'></div>
      <div className='bg-yellow-600 w-2 h-2'></div>
      <div className='bg-cyan-600 w-2 h-2'></div>
    </div>
  )
}

export default Loader
