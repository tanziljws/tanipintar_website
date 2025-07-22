import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img 
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-110" 
                src={logo} 
                alt="TaniPintar Logo" 
              />
              <span className="ml-2 text-xl font-bold text-primary transition-colors duration-300 group-hover:text-green-600">
                TaniPintar
              </span>
            </Link>
          </div>
          <div className="hidden md:flex md:space-x-8">
            <Link 
              to="/" 
              className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-primary ${location.pathname === '/' ? 'text-primary' : 'text-gray-700'}`}
            >
              <span>Beranda</span>
              {location.pathname === '/' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300"></span>
              )}
            </Link>
            <Link 
              to="/peta" 
              className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-primary ${location.pathname === '/peta' ? 'text-primary' : 'text-gray-700'}`}
            >
              <span>Peta Sebaran</span>
              {location.pathname === '/peta' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300"></span>
              )}
            </Link>
            <Link 
              to="/edukasi" 
              className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-primary ${location.pathname === '/edukasi' ? 'text-primary' : 'text-gray-700'}`}
            >
              <span>Edukasi</span>
              {location.pathname === '/edukasi' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300"></span>
              )}
            </Link>
            <Link 
              to="/kontak" 
              className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-primary ${location.pathname === '/kontak' ? 'text-primary' : 'text-gray-700'}`}
            >
              <span>Kontak</span>
              {location.pathname === '/kontak' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300"></span>
              )}
            </Link>
          </div>
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu} 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none transition-colors duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          <Link 
            to="/" 
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${location.pathname === '/' ? 'bg-primary-50 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-primary'}`}
          >
            Beranda
          </Link>
          <Link 
            to="/peta" 
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${location.pathname === '/peta' ? 'bg-primary-50 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-primary'}`}
          >
            Peta Sebaran
          </Link>
          <Link 
            to="/kontak" 
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${location.pathname === '/kontak' ? 'bg-primary-50 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-primary'}`}
          >
            Kontak
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
