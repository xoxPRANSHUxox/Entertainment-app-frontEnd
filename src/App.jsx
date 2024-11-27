import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Movie from "./pages/Movie";
import Navbar from "./components/cssComponents/Navbar";
import Bookmark from "./pages/Bookmark";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Tvseries from "./pages/Tvseries";
function App() {
  return (
    <>
    <div className="relative min-h-screen bg-neutral-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      
  <Router>
    <div>
      <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/tvseries" element={<Tvseries/>} />
          <Route path="/bookmarks" element={<Bookmark/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </div>
      </Router>
      </div>
    </>
  );
}

export default App;
