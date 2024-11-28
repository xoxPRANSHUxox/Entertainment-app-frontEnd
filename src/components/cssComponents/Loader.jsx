import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center space-x-2 h-screen">
      {/* Red Dot */}
      <div className="bg-red-600 w-4 h-4 rounded-full animate-bounce"></div>

      {/* Green Dot */}
      <div className="bg-green-600 w-4 h-4 rounded-full animate-bounce animation-delay-200"></div>

      {/* Blue Dot */}
      <div className="bg-blue-600 w-4 h-4 rounded-full animate-bounce animation-delay-400"></div>

      {/* Yellow Dot */}
      <div className="bg-yellow-600 w-4 h-4 rounded-full animate-bounce animation-delay-600"></div>

      {/* Cyan Dot */}
      <div className="bg-cyan-600 w-4 h-4 rounded-full animate-bounce animation-delay-800"></div>
    </div>
  );
}

export default Loader;
