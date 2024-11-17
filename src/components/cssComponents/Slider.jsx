import React, { useRef, useState, useEffect } from 'react';
import './Slider.css'; // Ensure the correct path

function Slider({ List, Time }) {
  const sliderRef = useRef(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Function to scroll right (auto and manual)
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  // Function to scroll left (manual)
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isUserInteracting && List.length > 0) {
        scrollRight();
      }
    }, Time || 5000); // Use the passed 'Time' prop or default to 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isUserInteracting, List.length, Time]);

  // Stop auto-scrolling when the user interacts
  const handleUserInteraction = () => {
    setIsUserInteracting(true);
    setTimeout(() => setIsUserInteracting(false), 10000); // Resume after 10 seconds
  };

  return (
    <div className="relative">
      {List && List.length > 0 ? (
        <>
          {/* Scrollable slider container */}
          <div
            ref={sliderRef}
            className="slider-container"
            onMouseDown={handleUserInteraction}
            onTouchStart={handleUserInteraction}
          >
            <div className="slider-content">
              {List.map((movie) => (
                <div key={movie.id} className="slider-item hover:opacity-20">
                  <img
                    src={movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : '/path/to/placeholder.jpg'} // Placeholder if poster_path is missing
                    alt={movie.title}
                    className="slider-image"
                  />
                  </div>
              ))}
            </div>
          </div>

          {/* Left scroll button */}
          <button
            onClick={() => {
              scrollLeft();
              handleUserInteraction();
            }}
            className="scroll-btn left-0"
          >
            &#9664;
          </button>

          {/* Right scroll button */}
          <button
            onClick={() => {
              scrollRight();
              handleUserInteraction();
            }}
            className="scroll-btn right-0"
          >
            &#9654;
          </button>
        </>
      ) : (
        <p>No content available</p>
      )}
    </div>
  );
}

export default Slider;
