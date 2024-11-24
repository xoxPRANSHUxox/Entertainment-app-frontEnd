import React, { useEffect, useState } from 'react';
import { useBookmarks } from '../Context';
import { auth } from '../../firebase'; // Import Firebase authentication
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function BookmarkPage() {
  const { bookmarks, loading, error, fetchBookmark, deleteBookmark } = useBookmarks();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const gotologin = () => {
    navigate('/login');
  };

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchBookmark(); // Fetch bookmarks only if the user is logged in
      }
    });
    return unsubscribe; // Cleanup on component unmount
  }, []);

  // Store user in localStorage to persist across page refresh
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // Store user info in localStorage
    } else {
      localStorage.removeItem('user'); // Remove user info when logged out
    }
  }, [user]);

  // On page load, check if the user is already authenticated
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchBookmark(); // Fetch bookmarks if user data exists
    }
  }, []);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleDelete = (id) => {
    deleteBookmark(id);
    toast.success('Bookmark deleted successfully!');
  };

  if (!user) {
    return (
      <div className="text-center pt-40">
        <p className="text-xl text-gray-400 mb-4">Please log in to view your bookmarks.</p>
        <button
          onClick={gotologin}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-200"
        >
          Log In
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div className="text-white sm:ml-28 pt-8 pl-8">
      <h1 className="text-3xl font-semibold mb-3 mt-20">Your Bookmarks</h1>
      <ToastContainer />

      {Array.isArray(bookmarks) && bookmarks.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center w-full">
          {bookmarks.map((movie) => (
            <div key={movie._id} className="bg-gray-800 rounded-lg p-4 m-4 w-64">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded-lg mb-2"
              />
              <h2 className="text-lg font-bold my-2">{movie.title}</h2>
              <p className="text-xs mb-1">Release Date: {movie.release_date}</p>
              <p className="text-xs">Rating: {movie.vote_average} / 10</p>
              <button
                onClick={() => handleDelete(movie._id)}
                className="mt-2 w-full py-1 bg-red-600 text-white rounded hover:bg-red-500 transition duration-200"
              >
                Delete Bookmark
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">There are no bookmarked movies and TV shows.</p>
      )}
    </div>
  );
}

export default BookmarkPage;
