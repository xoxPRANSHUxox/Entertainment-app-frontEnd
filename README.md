# Entertainment App - Frontend

## Deplyment Link :- https://entertainment-app-xox.vercel.app/
This repository contains the frontend code for the Bookmark Management System, a web application that allows users to manage their favorite movies and TV shows. The frontend is built with **React.js** and communicates with the backend through RESTful APIs.

---

## Features

- **User Authentication**: Uses Firebase Authentication for secure login and user management.
- **Bookmark Management**: Allows users to add, view, and delete bookmarks.
- **Dynamic User Interface**: Displays content based on the user's login state and bookmarks.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Prerequisites

- **Node.js**: v14 or higher
- **Backend Server**: Ensure the backend server is running.

---

/src
  /components       # Reusable React components
  /context          # Context API for global state management
  /pages            # Main application pages (e.g., Home, Bookmark)
  /styles           # CSS and styling files
  firebase.js       # Firebase configuration
  App.js            # Main application component
  index.js          # Entry point for the application

#Key Features and Functionalities
Authentication:

Users can log in or register via Firebase Authentication.
Bookmark Management:

Add bookmarks by clicking the bookmark icon on a movie or TV show card.
View all bookmarks on the Bookmarks page.
Delete bookmarks with a single click.
Context API:

Used for managing bookmarks globally across the app.

#Technologies Used
React.js: Frontend framework for building user interfaces.
Firebase: Authentication and hosting.
Axios: For making API calls to the backend.
React Toastify: For showing notifications.
CSS: For styling the application.

#API Integration
The frontend communicates with the backend API to perform the following operations:

Fetch Bookmarks: Retrieves bookmarks for the logged-in user.
Add Bookmark: Adds a new bookmark for the logged-in user.
Delete Bookmark: Deletes a specific bookmark by its ID.

#How to Use
Log in with your Firebase credentials.
Browse and add movies/TV shows to your bookmark list by clicking the bookmark icon.
Navigate to the Bookmarks page to view or delete your saved items.
