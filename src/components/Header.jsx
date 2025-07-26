import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-7xl w-[98%] rounded-full transition-all duration-300 ease-in-out ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl'
          : 'bg-white/70 backdrop-blur-sm border border-transparent'
      } ${showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
    >
      <div className="flex justify-between items-center px-5 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="text-xl font-bold text-gray-900">
            HireCreatives
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="text-gray-700 hover:text-gray-900 font-medium">
            How It Works
          </a>
          <a href="#explore" className="text-gray-700 hover:text-gray-900 font-medium">
            Explore
          </a>
          <a href="#pricing" className="text-gray-700 hover:text-gray-900 font-medium">
            Pricing
          </a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <Link to="/discover">
            <button className="bg-gray-900 text-white px-5 py-2 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-5 pb-4 pt-2 border-t border-gray-200 bg-white rounded-b-3xl">
          <nav className="flex flex-col space-y-4">
            <a href="#how-it-works" className="text-gray-700 font-medium">
              How It Works
            </a>
            <a href="#explore" className="text-gray-700 font-medium">
              Explore
            </a>
            <a href="#pricing" className="text-gray-700 font-medium">
              Pricing
            </a>
            <Link to="/discover">
              <button className="bg-gray-900 text-white w-full text-center px-5 py-2 rounded-full font-medium mt-2">
                Explore Talent
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
