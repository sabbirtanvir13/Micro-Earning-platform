import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        {/* Sun icon for light mode */}
        <svg
          className={`absolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-300 ${
            theme === 'light' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Moon icon for dark mode */}
        <svg
          className={`absolute inset-0 w-6 h-6 text-blue-400 transition-all duration-300 ${
            theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
    </button>
  );
};

export default ThemeToggle;
