import React, { useState, useRef } from "react";
import DiscoverHeader from "../components/DiscoverHeader";
import BrowseSection from "../components/BrowserSection.jsx";

// Categories and Talent Types (must match reelsData)
const categories = [
  "All Categories",
  "Real Estate",
  "Commercial",
  "Restaurant",
  "Corporate Events",
  "Fashion",
  "Travel & Tourism",
  "Sports",
  "Music",
  "Food & Beverage",
  "Entertainment",
  "Technology",
  "Beauty & Lifestyle",
  "Health & Fitness",
  "Art & Design",
  "Pets",
  "Lifestyle",
  "Comedy",
  "Gaming",
];

const talentTypes = [
  "All Talent Types",
  "UI/UX Designer",
  "Video Editor",
  "Photographer",
  "Motion Graphics Artist",
  "Creative Director",
  "Software Engineer",
  "Digital Artist",
  "Makeup Artist",
  "Fitness Trainer",
  "Fashion Designer",
  "Chef",
  "Choreographer",
  "Music Producer",
  "Blogger",
  "Game Developer",
  "Influencer",
  "Skateboarder",
  "Yoga Instructor",
  "Tech Reviewer",
  "Crafter",
  "Comedian",
  "Plant Care",
  "Magician",
  "Pet Trainer",
  "Coffee Expert",
];

// Sample reelsData with matching categories and talentTypes
const reelsData = [
  {
    name: "ananya_designs",
    title: "UI/UX Designer 🎨",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    likes: "2.4K",
    views: "13.6K",
    category: "Real Estate",
    talentType: "UI/UX Designer",
  },
  {
    name: "ravi_codes",
    title: "Video Editor 💻",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    likes: "3.2K",
    views: "15.8K",
    category: "Technology",
    talentType: "Video Editor",
  },
  {
    name: "mehul_clicks",
    title: "Photographer 📷",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    likes: "1.8K",
    views: "9.3K",
    category: "Commercial",
    talentType: "Photographer",
  },
  {
    name: "sarah_motion",
    title: "Motion Graphics Artist 🎬",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    likes: "4.1K",
    views: "18.2K",
    category: "Entertainment",
    talentType: "Motion Graphics Artist",
  },
  {
    name: "alex_creative",
    title: "Creative Director 🎭",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    likes: "2.9K",
    views: "12.4K",
    category: "Corporate Events",
    talentType: "Creative Director",
  },
  {
    name: "priya_tech",
    title: "Software Engineer 👩‍💻",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    likes: "5.6K",
    views: "24.1K",
    category: "Technology",
    talentType: "Software Engineer",
  },
  {
    name: "david_art",
    title: "Digital Artist 🎨",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    likes: "3.8K",
    views: "16.9K",
    category: "Art & Design",
    talentType: "Digital Artist",
  },
  {
    name: "lisa_makeup",
    title: "Makeup Artist 💄",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    likes: "7.2K",
    views: "32.5K",
    category: "Beauty & Lifestyle",
    talentType: "Makeup Artist",
  },
  {
    name: "mike_fitness",
    title: "Fitness Trainer 💪",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    likes: "4.5K",
    views: "21.3K",
    category: "Health & Fitness",
    talentType: "Fitness Trainer",
  },
  {
    name: "zara_fashion",
    title: "Fashion Designer 👗",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    likes: "6.1K",
    views: "28.7K",
    category: "Fashion",
    talentType: "Fashion Designer",
  },
  {
    name: "tom_chef",
    title: "Chef & Food Stylist 👨‍🍳",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    likes: "8.3K",
    views: "35.2K",
    category: "Food & Beverage",
    talentType: "Chef",
  },
  {
    name: "nina_dance",
    title: "Choreographer 💃",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    likes: "9.7K",
    views: "42.1K",
    category: "Entertainment",
    talentType: "Choreographer",
  },
  {
    name: "carlos_music",
    title: "Music Producer 🎵",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    likes: "5.9K",
    views: "26.8K",
    category: "Music",
    talentType: "Music Producer",
  },
  {
    name: "emma_travel",
    title: "Blogger ✈️",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    likes: "4.7K",
    views: "22.4K",
    category: "Travel & Tourism",
    talentType: "Blogger",
  },
  {
    name: "james_gaming",
    title: "Game Developer 🎮",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    likes: "12.1K",
    views: "58.9K",
    category: "Gaming",
    talentType: "Game Developer",
  },
  {
    name: "sophie_beauty",
    title: "Influencer 💅",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    likes: "11.3K",
    views: "49.6K",
    category: "Beauty & Lifestyle",
    talentType: "Influencer",
  },
  {
    name: "ryan_skateboard",
    title: "Skateboarder 🛹",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    likes: "3.4K",
    views: "17.2K",
    category: "Sports",
    talentType: "Skateboarder",
  },
  {
    name: "maya_yoga",
    title: "Yoga Instructor 🧘‍♀️",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    likes: "6.8K",
    views: "31.5K",
    category: "Health & Fitness",
    talentType: "Yoga Instructor",
  },
  {
    name: "ethan_tech",
    title: "Tech Reviewer 📱",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    likes: "8.9K",
    views: "38.7K",
    category: "Technology",
    talentType: "Tech Reviewer",
  },
  {
    name: "olivia_diy",
    title: "Crafter 🔨",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    likes: "5.2K",
    views: "23.8K",
    category: "Art & Design",
    talentType: "Crafter",
  },
  {
    name: "noah_comedy",
    title: "Comedian 😂",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    likes: "15.6K",
    views: "67.3K",
    category: "Comedy",
    talentType: "Comedian",
  },
  {
    name: "ava_plants",
    title: "Plant Parent 🌱",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    likes: "4.3K",
    views: "19.7K",
    category: "Lifestyle",
    talentType: "Plant Care",
  },
  {
    name: "lucas_magic",
    title: "Magician 🎩",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    likes: "7.8K",
    views: "34.2K",
    category: "Entertainment",
    talentType: "Magician",
  },
  {
    name: "chloe_pets",
    title: "Pet Trainer 🐕",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    likes: "9.4K",
    views: "41.6K",
    category: "Pets",
    talentType: "Pet Trainer",
  },
  {
    name: "derek_coffee",
    title: "Coffee Enthusiast ☕",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    likes: "3.7K",
    views: "16.1K",
    category: "Food & Beverage",
    talentType: "Coffee Expert",
  },
];

// Sidebar for filters
function Sidebar({
  isOpen,
  onClose,
  selectedCategory,
  setSelectedCategory,
  selectedTalentType,
  setSelectedTalentType,
  onDone,
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-40 flex">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-xs sm:max-w-sm md:w-80 bg-white h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center">
              <span className="mr-2">🔧</span>
              Filters
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Category</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Talent Type</h3>
            <select
              value={selectedTalentType}
              onChange={(e) => setSelectedTalentType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {talentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <button
            className="w-full bg-purple-600 text-white py-2 rounded font-semibold"
            onClick={onDone}
          >
            Done
          </button>
          <button
            className="w-full mt-2 text-gray-600 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function ReelCard({ name, title, videoUrl, likes, views }) {
  return (
    <div className="reel-card">
      <video
        src={videoUrl}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute bottom-6 left-4 z-20 text-white max-w-72">
        <h2 className="text-lg font-bold mb-1">@{name}</h2>
        <p className="text-sm opacity-90">{title}</p>
      </div>
      <div className="absolute right-4 bottom-20 z-20 flex flex-col space-y-4">
        <span className="text-white text-xs mt-1">{likes} ❤️</span>
        <span className="text-white text-xs mt-1">{views} 👁️</span>
      </div>
    </div>
  );
}

function NavigationTabs({ activeTab, onTabChange, onFilterClick }) {
  return (
    <div className="w-full bg-black border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-[64px] z-40">
      <div className="flex items-center space-x-1">
        <button
          onClick={() => onTabChange("discover")}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === "discover"
              ? "bg-white text-black"
              : "text-white hover:bg-gray-800"
          }`}
        >
          <span className="mr-2">▶️</span>
          Discover
        </button>
        <button
          onClick={() => onTabChange("browse")}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === "browse"
              ? "bg-white text-black"
              : "text-white hover:bg-gray-800"
          }`}
        >
          <span className="mr-2">🔲</span>
          Browse
        </button>
      </div>
      {activeTab === "discover" && (
        <div className="flex items-center space-x-4">
          <span className="text-white text-sm">⏰ 2:45</span>
          <button
            onClick={onFilterClick}
            className="flex items-center text-white hover:text-purple-400 transition-colors"
          >
            <span className="mr-2">🔧</span>
            Filters
          </button>
        </div>
      )}
    </div>
  );
}

function Discover() {
  const [activeTab, setActiveTab] = useState("discover");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedTalentType, setSelectedTalentType] =
    useState("All Talent Types");
  const [filteredReels, setFilteredReels] = useState(reelsData);

  // Swipe logic
  const reelContainerRef = useRef(null);
  const touchStartY = useRef(null);

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (!reelContainerRef.current || touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    if (Math.abs(deltaY) > 50) {
      const cards = Array.from(reelContainerRef.current.children);
      const scrollTop = reelContainerRef.current.scrollTop;
      const cardHeight = cards[0]?.offsetHeight || 1;
      let currentIndex = Math.round(scrollTop / cardHeight);
      if (deltaY > 0 && currentIndex < cards.length - 1) {
        reelContainerRef.current.scrollTo({
          top: cardHeight * (currentIndex + 1),
          behavior: "smooth",
        });
      } else if (deltaY < 0 && currentIndex > 0) {
        reelContainerRef.current.scrollTo({
          top: cardHeight * (currentIndex - 1),
          behavior: "smooth",
        });
      }
    }
    touchStartY.current = null;
  };

  // Filtering logic
  const handleFilterDone = () => {
    let filtered = reelsData;
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(
        (reel) =>
          reel.category &&
          reel.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (selectedTalentType !== "All Talent Types") {
      filtered = filtered.filter(
        (reel) =>
          reel.talentType &&
          reel.talentType.toLowerCase() === selectedTalentType.toLowerCase()
      );
    }
    setFilteredReels(filtered);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Top Navigation Bar */}
      <DiscoverHeader />

      <div className="pt-[64px]">
        <NavigationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onFilterClick={() => setSidebarOpen(true)}
        />
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTalentType={selectedTalentType}
          setSelectedTalentType={setSelectedTalentType}
          onDone={handleFilterDone}
        />
        {activeTab === "discover" ? (
          <div
            className="reel-container"
            ref={reelContainerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {(filteredReels.length > 0 ? filteredReels : []).map(
              (reel, index) => (
                <ReelCard key={index} {...reel} />
              )
            )}
            {filteredReels.length === 0 && (
              <div className="flex items-center justify-center h-full text-white text-xl">
                No reels found for selected filters.
              </div>
            )}
          </div>
        ) : (
          <BrowseSection />
        )}
      </div>
      <style jsx>{`
        .reel-container {
          height: calc(100vh - 120px);
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          overscroll-behavior-y: contain;
        }
        .reel-container::-webkit-scrollbar {
          display: none;
        }
        .reel-card {
          scroll-snap-align: start;
          height: calc(100vh - 120px);
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          background-color: black;
        }
        @media (max-width: 768px) {
          .reel-container {
            height: 100vh;
            scroll-snap-type: y mandatory;
          }
          .reel-card {
            height: 100vh;
            max-width: 100vw;
          }
        }
      `}</style>
    </div>
  );
}

export default Discover;
