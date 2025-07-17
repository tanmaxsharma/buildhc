import { Link } from "react-router-dom";

export default function TopNav() {
  return (
    <nav className="w-full bg-white py-3 px-6 shadow flex items-center justify-between fixed top-0 left-0 z-50">
      <Link to="/">
        <div className="text-3xl font-bold text-purple-600">HireCreative</div>
      </Link>
      <div className="flex-1 flex justify-center">
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
      <div className="flex items-center space-x-6">
        <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">
          Browse Talent
        </a>
        <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">
          How it Works
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-purple-600 font-medium flex items-center"
        >
          <span role="img" aria-label="user" className="mr-1">
            👤
          </span>{" "}
          Sign In
        </a>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
          Get Started
        </button>
      </div>
    </nav>
  );
}
