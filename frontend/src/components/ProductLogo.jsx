import React from 'react';

// Recreating the circular logo from the PDF
const ProductLogo = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-xl'
  };

  return (
    <div className={`${sizes[size]} relative`}>
      {/* Outer black circle */}
      <div className="absolute inset-0 rounded-full border-8 border-black bg-white flex items-center justify-center">
        {/* Content container */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Top arc text - DEGEN'S DELIGHT */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
            <span className={`${textSizes[size]} font-bold text-black tracking-wider`}>
              DEGEN'S DELIGHT
            </span>
          </div>

          {/* Center - Cranberries illustration placeholder */}
          <div className="flex items-center justify-center space-x-1">
            <div className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-lg"></div>
            <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-red-700 to-red-900 shadow-lg -ml-2"></div>
            <div className="w-5 h-5 md:w-7 md:h-7 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-lg -ml-2"></div>
            {/* Small green leaves */}
            <div className="absolute -top-1 right-8 w-3 h-3 md:w-4 md:h-4 bg-green-600 rounded-full opacity-80"></div>
            <div className="absolute top-2 right-6 w-2 h-4 md:w-3 md:h-5 bg-green-500 rounded-full opacity-70 transform rotate-45"></div>
          </div>

          {/* Bottom arc text - CRANBERRY */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
            <span className={`${textSizes[size]} font-bold text-red-600 tracking-wider`}>
              CRANBERRY
            </span>
          </div>

          {/* Right side - ABV */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <div className="flex flex-col items-center">
              <span className={`${textSizes[size]} font-bold text-black`}>5%</span>
              <span className="text-xs text-black">ALC</span>
              <span className="text-xs text-black">VOL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLogo;