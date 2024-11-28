import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { auth } from '../firebase';

const BookmarkContext = createContext();

export const useBookmarks = () => useContext(BookmarkContext);

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Keep track of the logged-in user

  const BASE_URL = 'https://entertainment-app-backend-ggrw.onrender.com';

  // Fetch bookmarks from the backend
  const fetchBookmark = async () => {
    if (!user) {
      return; // If no user, simply exit
    }

    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/bookmarks?userId=${user.uid}`);
      setBookmarks(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      toast.error('Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const addBookmark = async (bookmarkData) => {
    if (!user) {
      toast.warn('Please log in to add bookmarks');
      return;
    }
  
    try {
      // Add the userId to the bookmark data
      const data = { ...bookmarkData, userId: user.uid };  // Make sure user.uid is available
      await axios.post(`${BASE_URL}/bookmarks`, data);
      
      // Optionally fetch updated bookmarks
      fetchBookmark(); // Refresh the bookmark list
      toast.success('Bookmark added successfully');
    } catch (err) {
      setError('Failed to add bookmark');
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to add bookmark');
    }
  };
  

  // Delete a bookmark
  const deleteBookmark = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      fetchBookmark(); // Refresh the bookmark list
      toast.success('Bookmark deleted successfully');
    } catch (err) {
      setError('Failed to delete bookmark');
      console.error(err);
      toast.error('Failed to delete bookmark');
    }
  };

  // Monitor Firebase user authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user when logged in
        fetchBookmark(); // Fetch bookmarks once the user is detected
      } else {
        setUser(null);
        setBookmarks([]); // Clear bookmarks if the user logs out
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  return (
    <BookmarkContext.Provider value={{ bookmarks, fetchBookmark, addBookmark, deleteBookmark, loading, error }}>
      {children}
    </BookmarkContext.Provider>
  );
};