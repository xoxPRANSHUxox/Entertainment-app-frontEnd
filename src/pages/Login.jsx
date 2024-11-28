import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to the signup page
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent page refresh
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      navigate("/bookmarks"); // Redirect to bookmarks or another page
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevent page refresh
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token); // Save the token to localStorage
      navigate("/bookmarks"); // Redirect to bookmarks or another page
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout Successful");
      setUser(null);
    } catch (err) {
      toast.error(`Logout failed: ${err.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {user ? (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-80 border border-gray-700">
          <h2 className="text-white text-2xl mb-4 text-center">
            Welcome, {user.email}
          </h2>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-80 border border-gray-700"
        >
          <h2 className="text-white text-2xl mb-6 text-center">Login</h2>

          <div className="mb-4">
            <label className="text-gray-400" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-400" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
              required
              autoComplete="current-password" // Added autocomplete attribute
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mb-4 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Login
          </button>

          <button
            onClick={handleSignUpClick}
            type="button"
            className="w-full py-2 font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-500 transition duration-200"
          >
            Sign Up
          </button>

          <p className="text-xs text-center text-gray-400 mt-4">
            If you don’t have an account, please sign up first.
          </p>
        </form>
      )}
      <ToastContainer />
    </div>
  );
}

export default Login;
