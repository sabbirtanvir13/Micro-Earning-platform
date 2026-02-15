import { Link } from 'react-router-dom';

const Logo = ({ size = 'medium', showTagline = false, className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const iconSizes = {
    small: 'w-5 h-5',
    medium: 'w-6 h-6',
    large: 'w-7 h-7',
    xlarge: 'w-9 h-9'
  };

  const textSizes = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-3xl',
    xlarge: 'text-4xl'
  };

  return (
    <Link to="/" className={`flex items-center space-x-2 group ${className}`}>
      <div className="relative">
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200 shadow-lg`}>
          <svg 
            className={`${iconSizes[size]} text-white`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            strokeWidth="2"
          >
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
      </div>
      <div>
        <span className={`${textSizes[size]} font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
          MicroEarn
        </span>
        {showTagline && (
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Earn. Grow. Succeed.</div>
        )}
      </div>
    </Link>
  );
};

export default Logo;
