import React from "react";
import {BrowserRouter, Link } from "react-router-dom";
import { HiHome } from 'react-icons/hi'; //import home icon
import { MdLocalMovies, MdMovieCreation } from 'react-icons/md'; //import movie icons
import { PiTelevisionBold } from 'react-icons/pi'; // import TV icons
import { CiBookmarkCheck } from 'react-icons/ci'; // import bookmark icons
import { MdOutlineAccountCircle } from "react-icons/md";

function Navbar() {
  return (
    <>
    <div className="fixed top-0 left-0 h-4/5 w-16 bg-gray-900 rounded-xl flex flex-col items-center py-4 mt-6 ml-6 text-white">
          
             <MdMovieCreation className="text-4xl mb-6 text-red-600" />


            <Link to="/">
             <HiHome className="text-4xl mb-6 hover:text-red-600" />
            </Link>

            <Link to="/movie">
             <MdLocalMovies className="text-4xl mb-6 hover:text-red-600" />
            </Link>


            <Link to="/tvseries">
             <PiTelevisionBold className="text-4xl mb-6 hover:text-red-600" />
            </Link>

            <Link to="/bookmarks">
             <CiBookmarkCheck className="text-4xl mb-6 hover:text-red-600" />
            </Link>

            <Link to="/login">
             <MdOutlineAccountCircle className="text-4xl mb-6 mt-24 hover:text-red-600" />
            </Link>


      </div>
    </>
  );
}

export default Navbar;