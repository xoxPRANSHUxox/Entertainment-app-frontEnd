import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { MdLocalMovies, MdMovieCreation, MdOutlineAccountCircle } from "react-icons/md";
import { PiTelevisionBold } from "react-icons/pi";
import { CiBookmarkCheck } from "react-icons/ci";

function Navbar() {
  const [bgColor, setBgColor] = useState("bg-gray-900");
  const location = useLocation();

  // Change navbar background color on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBgColor("bg-gray-800 shadow-lg");
      } else {
        setBgColor("bg-gray-900");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine the active link
  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`fixed z-50 h-[50px] w-full sm:h-4/5 flex-row sm:w-16 rounded-xl sm:flex sm:flex-col sm:items-center sm:p-2 sm:mt-6 sm:ml-6 text-white sm:justify-between transition-all duration-300 ${bgColor}`}
    >
      <div className="flex sm:flex-col flex-row justify-between w-full">
        <MdMovieCreation className="text-4xl m-2 sm:mb-6 text-red-600 animate-pulse" />

        <Link to="/">
          <HiHome
            className={`text-4xl m-2 sm:mb-6 transform transition-transform duration-300 ${
              isActive("/") ? "text-red-500 scale-110" : "hover:text-red-600 hover:scale-105"
            }`}
          />
        </Link>

        <Link to="/movie">
          <MdLocalMovies
            className={`text-4xl m-2 sm:mb-6 transform transition-transform duration-300 ${
              isActive("/movie") ? "text-red-500 scale-110" : "hover:text-red-600 hover:scale-105"
            }`}
          />
        </Link>

        <Link to="/tvseries">
          <PiTelevisionBold
            className={`text-4xl m-2 sm:mb-6 transform transition-transform duration-300 ${
              isActive("/tvseries") ? "text-red-500 scale-110" : "hover:text-red-600 hover:scale-105"
            }`}
          />
        </Link>

        <Link to="/bookmarks">
          <CiBookmarkCheck
            className={`text-4xl m-2 sm:mb-6 transform transition-transform duration-300 ${
              isActive("/bookmarks") ? "text-red-500 scale-110" : "hover:text-red-600 hover:scale-105"
            }`}
          />
        </Link>

        <Link to="/login">
          <MdOutlineAccountCircle
            className="text-4xl m-2 sm:mt-24 transform transition-transform duration-300 hover:text-red-600 hover:scale-105"
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
