import React from "react";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi"; //import home icon
import { MdLocalMovies, MdMovieCreation } from "react-icons/md"; //import movie icons
import { PiTelevisionBold } from "react-icons/pi"; // import TV icons
import { CiBookmarkCheck } from "react-icons/ci"; // import bookmark icons
import { MdOutlineAccountCircle } from "react-icons/md";

function Navbar() {
  return (
    <div className="fixed z-10 top-8 left-4 h-[50px] w-auto sm:h-4/5 flex-row sm:w-16 bg-gray-900 rounded-xl sm:flex sm:flex-col sm:items-center sm:p-2 sm:mt-6 sm:ml-6 text-white sm:justify-between">
      <div className="flex sm:flex-col flex-row justify-between w-full">
        <MdMovieCreation className="text-4xl m-2 sm:mb-6 text-red-600" />

        <Link to="/">
          <HiHome className="text-4xl m-2 sm:mb-6 hover:text-red-600" />
        </Link>

        <Link to="/movie">
          <MdLocalMovies className="text-4xl m-2  sm:mb-6 hover:text-red-600" />
        </Link>

        <Link to="/tvseries">
          <PiTelevisionBold className="text-4xl m-2 sm:mb-6 hover:text-red-600" />
        </Link>

        <Link to="/bookmarks">
          <CiBookmarkCheck className="text-4xl m-2 sm:mb-6 hover:text-red-600" />
        </Link>

        <Link to="/login">
          <MdOutlineAccountCircle className="text-4xl m-2 sm:mt-24 hover:text-red-600" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
