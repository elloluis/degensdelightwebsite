import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { getCartCount, setIsCartOpen } = useCart();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/product', label: 'Product' },
    { path: '/shop', label: 'Shop' },
    { path: '/distributors', label: 'Distributors' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black bg-opacity-90 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">DD</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">Degen's Delight</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-red-500 ${
                  isActive(link.path) ? 'text-red-500' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart and CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-white hover:text-red-500 transition-colors"
            >
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>
            <Link to="/distributors">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Become a Distributor
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-6">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-red-500 ${
                    isActive(link.path) ? 'text-red-500' : 'text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMenuOpen(false);
                }}
                className="text-left text-sm font-medium text-white hover:text-red-500 transition-colors flex items-center"
              >
                <ShoppingCart size={18} className="mr-2" />
                Cart ({getCartCount()})
              </button>
              <Link to="/distributors" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Become a Distributor
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;