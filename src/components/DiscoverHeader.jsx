import { useState } from "react";

export default function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white py-3 px-4 md:px-6 shadow flex items-center justify-between fixed top-0 left-0 z-50">
      {/* Logo */}
      <a href="/">
        <div className="text-xl md:text-2xl lg:text-3xl font-bold text-purple-600">
          HireCreative
        </div>
      </a>

      {/* Desktop Search - Hidden on mobile */}
      <div className="hidden lg:flex flex-1 justify-center mx-6">
        <div className="flex items-center border rounded-full px-3 py-1 bg-white w-[350px] max-w-full">
          <span role="img" aria-label="search" className="mr-2 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search for creative professionals..."
            className="outline-none border-none bg-transparent w-full text-gray-700"
            style={{ fontSize: "1rem" }}
          />
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
        <a href="#" className="text-gray-700 hover:text-purple-600 font-medium text-sm lg:text-base">
          Browse Talent
        </a>
        <a href="#" className="text-gray-700 hover:text-purple-600 font-medium text-sm lg:text-base">
          How it Works
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-purple-600 font-medium flex items-center text-sm lg:text-base"
        >
          <span role="img" aria-label="user" className="mr-1">
            👤
          </span>
          Sign In
        </a>
        <button className="bg-purple-600 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm lg:text-base">
          Get Started
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-gray-700 hover:text-purple-600"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
          {/* Mobile Search */}
          <div className="p-4 border-b">
            <div className="flex items-center border rounded-full px-3 py-2 bg-gray-50">
              <span role="img" aria-label="search" className="mr-2 text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search for creative professionals..."
                className="outline-none border-none bg-transparent w-full text-gray-700"
              />
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="py-2">
            <a
              href="#"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-purple-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Talent
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-purple-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-purple-600 font-medium flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <span role="img" aria-label="user" className="mr-2">
                👤
              </span>
              Sign In
            </a>
            <div className="px-4 py-3">
              <button
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}