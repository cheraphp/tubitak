import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white text-4xl mb-8 mx-auto animate-bounce-slow">
          <i className="bi bi-exclamation-triangle"></i>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link className="btn btn-primary" to="/">
          <i className="bi bi-house"></i>
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default Error;