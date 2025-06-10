import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);

    // Clean up
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top ${isVisible ? 'visible' : 'hidden'} group`}
      aria-label="Back to top"
    >
      <div className="relative">
        {/* Main button */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center transition-all duration-300 transform hover:scale-110 group-hover:-translate-y-1">
          <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:animate-bounce-gentle" />
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
        
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Back to top
        <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </button>
  );
};

export default BackToTop;