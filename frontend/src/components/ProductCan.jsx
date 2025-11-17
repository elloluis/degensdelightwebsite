import React from 'react';
import ProductLogo from './ProductLogo';

// Recreating the can design from the PDF
const ProductCan = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="w-64 h-96 mx-auto relative">
        {/* Can body - vibrant red */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-600 via-red-700 to-red-800 rounded-t-lg shadow-2xl">
          {/* Top rim - metallic silver */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-lg"></div>
          
          {/* Bottom rim - metallic silver */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-gray-300 to-gray-400"></div>
          
          {/* White label band */}
          <div className="absolute top-16 left-4 right-4 bg-white rounded-lg p-4 border-t-2 border-b-2 border-red-600 shadow-lg">
            {/* Logo */}
            <div className="flex justify-center mb-3">
              <ProductLogo size="md" />
            </div>
            
            {/* Text content */}
            <div className="text-center space-y-1">
              <p className="text-sm font-bold text-black tracking-wide">MADE WITH VODKA</p>
              <p className="text-sm font-bold text-black tracking-wide">& 100% REAL JUICE</p>
              <div className="h-2"></div>
              <p className="text-xs font-bold text-black tracking-wide">NON-CARBONATED</p>
              <p className="text-xs font-bold text-black tracking-wide">LOW IN CALORIES</p>
              <div className="h-2"></div>
              <p className="text-xs text-gray-600">12 FL OZ | 355 mL</p>
            </div>
          </div>
          
          {/* Shine effect */}
          <div className="absolute top-8 left-8 w-16 h-32 bg-white opacity-20 rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCan;