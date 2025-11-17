import React from 'react';
import ProductLogo from './ProductLogo';

// Recreating the 6-pack carton design from the PDF
const ProductCarton = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="w-full max-w-md mx-auto relative">
        {/* Carton box */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-gray-200">
          {/* Top red band */}
          <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 p-4 text-center">
            <span className="text-white font-bold text-sm">NON-CARBONATED</span>
          </div>
          
          {/* Middle white section with logo */}
          <div className="bg-white p-6">
            <div className="flex items-center justify-between">
              {/* Left side - 6 CANS */}
              <div className="text-left">
                <p className="text-6xl font-bold text-black">6</p>
                <p className="text-sm font-bold text-black">CANS</p>
              </div>
              
              {/* Center - Logo */}
              <div className="flex-1 flex justify-center">
                <ProductLogo size="lg" />
              </div>
              
              {/* Right side - Size info */}
              <div className="text-right">
                <p className="text-lg font-bold text-black">SIX</p>
                <p className="text-xs font-bold text-black">12 FL OZ</p>
                <p className="text-xs font-bold text-black">355 ML</p>
                <p className="text-xs font-bold text-black">CANS</p>
              </div>
            </div>
          </div>
          
          {/* Bottom red band */}
          <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 p-4 text-center">
            <p className="text-white font-bold text-sm">MADE WITH VODKA</p>
            <p className="text-white font-bold text-sm">& 100% REAL JUICE</p>
          </div>
        </div>
        
        {/* 3D effect shadow */}
        <div className="absolute -bottom-2 -right-2 w-full h-full bg-gray-300 rounded-lg -z-10"></div>
      </div>
    </div>
  );
};

export default ProductCarton;