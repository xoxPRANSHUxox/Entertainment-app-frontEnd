import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App'; // Update with your main App component path
import { BookmarkProvider } from './context'; // Update with your context path

describe('App Component', () => {
  it('renders the app with the header and default content', () => {
    render(
      <BookmarkProvider>
        <App />
      </BookmarkProvider>
    );

    // Check for the presence of header or any default UI
    expect(screen.getByText(/Welcome to Entertainment App/i)).toBeInTheDocument();
  });

  it('renders the bookmarks page when navigated', async () => {
    render(
      <BookmarkProvider>
        <App />
      </BookmarkProvider>
    );

    // Simulate navigation if you have links or buttons
    const bookmarkNav = screen.getByText(/Bookmarks/i);
    userEvent.click(bookmarkNav);

    // Check for the presence of the bookmarks content
    expect(await screen.findByText(/Your Bookmarks/i)).toBeInTheDocument();
  });

  it('shows a message when no bookmarks are available', async () => {
    render(
      <BookmarkProvider>
        <App />
      </BookmarkProvider>
    );

    // Simulate navigation to bookmarks
    const bookmarkNav = screen.getByText(/Bookmarks/i);
    userEvent.click(bookmarkNav);

    // Check for "no bookmarks" message
    expect(await screen.findByText(/There are no bookmarked movies and TV shows./i)).toBeInTheDocument();
  });
});
