import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { auth } from '../firebase';

const BookmarkContext = createContext();

export const useBookmarks = () => useContext(BookmarkContext);

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your Render backend URL
  const BASE_URL = 'https://entertainment-app-backend-ggrw.onrender.com/api';

  const fetchBookmark = async () => {
    const user = auth.currentUser;
    if (user) {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/bookmarks`, {
          headers: { Authorization: `Bearer ${await user.getIdToken()}` }, // Send Firebase token for auth
        });
        setBookmarks(response.data);
      } catch (err) {
        setError('Failed to fetch bookmarks');
        console.error(err);
      }
      setLoading(false);
    }
  };

  const addBookmark = async (bookmarkData) => {
    const user = auth.currentUser;
    if (user) {
      try {
        await axios.post(
          `${BASE_URL}/bookmarks`,
          { ...bookmarkData, userId: user.uid },
          { headers: { Authorization: `Bearer ${await user.getIdToken()}` } } // Send Firebase token for auth
        );
        fetchBookmark(); // Refresh bookmarks after adding
        toast.success('Bookmark added successfully');
      } catch (err) {
        if (err.response && err.response.status === 400 && err.response.data.message === 'Bookmark with this ID already exists for this user') {
          // Show a warning if the bookmark already exists for the logged-in user
          toast.warn('You already bookmarked this item.');
        } else {
          // Generic error handling for other errors
          toast.error('An error occurred while adding the bookmark.');
          console.error(err);
        }
      }
    } else {
      toast.warn('Please log in to add bookmarks');
    }
  };

  const deleteBookmark = async (id) => {
    const user = auth.currentUser;
    if (user) {
      try {
        await axios.delete(`${BASE_URL}/bookmarks/${id}`, {
          headers: { Authorization: `Bearer ${await user.getIdToken()}` }, // Send Firebase token for auth
        });
        fetchBookmark();
      } catch (err) {
        setError('Failed to delete bookmark');
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchBookmark();
  }, []);

  return (
    <BookmarkContext.Provider value={{ bookmarks, fetchBookmark, addBookmark, deleteBookmark, loading, error }}>
      {children}
    </BookmarkContext.Provider>
  );
};
