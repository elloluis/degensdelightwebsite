import React from 'react';

// Simple logo component using brand name
const ProductLogo = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-5xl'
  };

  return (
    <div className={`${sizes[size]} ${className} flex items-center justify-center`}>
      <div className="text-center">
        <div className={`${textSizes[size]} font-bold text-black mb-1`}>
          DEGEN'S
        </div>
        <div className={`${textSizes[size]} font-bold text-red-600`}>
          DELIGHT
        </div>
        <div className="text-xs md:text-sm text-gray-600 mt-1">
          CRANBERRY VODKA RTD
        </div>
      </div>
    </div>
  );
};

export default ProductLogo;