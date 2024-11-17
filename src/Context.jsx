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

  const fetchBookmark = async () => {
    const user = auth.currentUser;
    if (user) {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/bookmarks?userId=${user.uid}`);
        setBookmarks(response.data);
      } catch (err) {
        setError('Failed to fetch bookmarks');
      }
      setLoading(false);
    }
  };

  const addBookmark = async (bookmarkData) => {
    const user = auth.currentUser;
    
    if (user) {
      try {
        await axios.post('http://localhost:5000/api/bookmarks', { ...bookmarkData, userId: user.uid });
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
        await axios.delete(`http://localhost:5000/api/bookmarks/${id}`);
        fetchBookmark();
      } catch (err) {
        setError('Failed to delete bookmark');
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
