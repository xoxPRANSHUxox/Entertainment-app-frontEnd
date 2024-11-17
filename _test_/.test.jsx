import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BookmarkProvider, useBookmarks } from './context'; // Adjust the path as needed
import { auth } from '../firebase'; // Mock Firebase authentication
import axios from 'axios';
import '@testing-library/jest-dom';

// Mock Firebase auth
jest.mock('../firebase', () => ({
  auth: {
    currentUser: { uid: 'gCsrtCtiTpd5zvfbnY2WcBtH5bv1' },
    onAuthStateChanged: jest.fn((callback) => callback({ uid: 'gCsrtCtiTpd5zvfbnY2WcBtH5bv1' })),
  },
}));

// Mock Axios
jest.mock('axios');

const MockComponent = () => {
  const { bookmarks, fetchBookmark, addBookmark, deleteBookmark, loading, error } = useBookmarks();

  return (
    <div>
      <h1>Bookmark Test</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id}>
              {bookmark.title}
              <button onClick={() => deleteBookmark(bookmark.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={fetchBookmark}>Fetch Bookmarks</button>
      <button onClick={() => addBookmark({ id: '1034541', title: 'Terrifier 3' })}>Add Bookmark</button>
    </div>
  );
};

describe('BookmarkProvider Tests', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: '1034541',
          title: 'Terrifier 3',
          poster_path: '/l1175hgL5DoXnqeZQCcU3eZIdhX.jpg',
          release_date: '2024-10-09',
          vote_average: 6.927,
        },
      ],
    });

    axios.post.mockResolvedValue({});
    axios.delete.mockResolvedValue({});
  });

  it('should render the loading state initially', () => {
    render(
      <BookmarkProvider>
        <MockComponent />
      </BookmarkProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should fetch and display bookmarks', async () => {
    render(
      <BookmarkProvider>
        <MockComponent />
      </BookmarkProvider>
    );

    fireEvent.click(screen.getByText(/fetch bookmarks/i));

    await waitFor(() => {
      expect(screen.getByText(/terrifier 3/i)).toBeInTheDocument();
    });
  });

  it('should add a new bookmark', async () => {
    render(
      <BookmarkProvider>
        <MockComponent />
      </BookmarkProvider>
    );

    fireEvent.click(screen.getByText(/add bookmark/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/bookmarks', {
        id: '1034541',
        title: 'Terrifier 3',
        userId: 'gCsrtCtiTpd5zvfbnY2WcBtH5bv1',
      });
    });
  });

  it('should delete a bookmark', async () => {
    render(
      <BookmarkProvider>
        <MockComponent />
      </BookmarkProvider>
    );

    fireEvent.click(screen.getByText(/fetch bookmarks/i));
    await waitFor(() => {
      fireEvent.click(screen.getByText(/delete/i));
    });

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('http://localhost:5000/api/bookmarks/1034541');
    });
  });

  it('should handle errors during fetch', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch bookmarks'));

    render(
      <BookmarkProvider>
        <MockComponent />
      </BookmarkProvider>
    );

    fireEvent.click(screen.getByText(/fetch bookmarks/i));

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch bookmarks/i)).toBeInTheDocument();
    });
  });
});
