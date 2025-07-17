import { Link } from "react-router-dom";
import { Moon, ArrowRight } from "lucide-react";


const Header = ({isDarkMode, setIsDarkMode}) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        isDarkMode
          ? "bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50"
          : "bg-white/80 backdrop-blur-lg border-b border-gray-200/50"
      } transition-all duration-300`}
    >
      <div className="w-full px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to=""></Link>
        <h1 className="text-lg sm:text-xl font-bold">HIRECREATIVES</h1>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-lg ${
            isDarkMode
              ? "bg-gray-800 text-white hover:bg-gray-700"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          }`}
        >
          <Moon className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
