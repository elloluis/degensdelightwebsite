import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { brandInfo } from '../mock';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">DD</span>
              </div>
              <span className="text-white font-bold text-xl">{brandInfo.name}</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              {brandInfo.description}
            </p>
            <p className="text-xs text-gray-500">
              {brandInfo.manufacturer}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/product" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Product
                </Link>
              </li>
              <li>
                <Link to="/distributors" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Distributors
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail size={16} className="text-red-500" />
                <a href={`mailto:${brandInfo.email}`} className="hover:text-red-500 transition-colors">
                  {brandInfo.email}
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone size={16} className="text-red-500" />
                <span>{brandInfo.phone}</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-400 text-sm">
                <MapPin size={16} className="text-red-500 mt-1" />
                <span>{brandInfo.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Degen's Delight. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-xs text-gray-500 hover:text-red-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-gray-500 hover:text-red-500 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
          
          {/* Government Warning */}
          <div className="mt-6 p-4 bg-gray-900 rounded-lg">
            <p className="text-xs text-gray-400">
              <strong>GOVERNMENT WARNING:</strong> (1) According to the Surgeon General, women should not drink alcoholic beverages during pregnancy because of the risk of birth defects. (2) Consumption of alcoholic beverages impairs your ability to drive a car or operate machinery, and may cause health problems.
            </p>
          </div>
          
          {/* Admin Link - Small at the very bottom */}
          <div className="mt-4 text-center">
            <Link 
              to="/admin/login" 
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors underline"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;