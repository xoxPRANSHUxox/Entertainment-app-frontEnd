import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  signOut,
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

  // Monitor user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        const storedToken = localStorage.getItem("token");
        if (storedToken && storedToken !== token) {
          // If a different session exists, log out the current user
          await signOut(auth);
          localStorage.removeItem("token");
          setUser(null);
          toast.warn("Logged out from the previous session.");
        } else {
          // Save token and set user
          localStorage.setItem("token", token);
          setUser(currentUser);
          navigate("/bookmarks");
        }
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      setUser(userCredential.user);
      toast.success("Login successful!");
      navigate("/bookmarks"); // Redirect to Bookmarks page
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      setUser(null);
      toast.success("Logged out successfully!");
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
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mb-4 font-semibold text-white bg-red-700 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Login
          </button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
}

export default Login;
