import React, { useState } from "react";

// Extended sample data with 25 entries
const reelsData = [
  {
    name: "ananya_designs",
    title: "UI/UX Designer 🎨",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    likes: "2.4K",
    views: "13.6K"
  },
  {
    name: "ravi_codes",
    title: "Full Stack Developer 💻",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    likes: "3.2K",
    views: "15.8K"
  },
  {
    name: "mehul_clicks",
    title: "Photographer 📷",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    likes: "1.8K",
    views: "9.3K"
  },
  {
    name: "sarah_motion",
    title: "Motion Graphics Artist 🎬",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    likes: "4.1K",
    views: "18.2K"
  },
  {
    name: "alex_creative",
    title: "Creative Director 🎭",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    likes: "2.9K",
    views: "12.4K"
  },
  {
    name: "priya_tech",
    title: "Software Engineer 👩‍💻",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    likes: "5.6K",
    views: "24.1K"
  },
  {
    name: "david_art",
    title: "Digital Artist 🎨",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    likes: "3.8K",
    views: "16.9K"
  },
  {
    name: "lisa_makeup",
    title: "Makeup Artist 💄",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    likes: "7.2K",
    views: "32.5K"
  },
  {
    name: "mike_fitness",
    title: "Fitness Trainer 💪",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    likes: "4.5K",
    views: "21.3K"
  },
  {
    name: "zara_fashion",
    title: "Fashion Designer 👗",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    likes: "6.1K",
    views: "28.7K"
  },
  {
    name: "tom_chef",
    title: "Chef & Food Stylist 👨‍🍳",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    likes: "8.3K",
    views: "35.2K"
  },
  {
    name: "nina_dance",
    title: "Dance Choreographer 💃",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    likes: "9.7K",
    views: "42.1K"
  },
  {
    name: "carlos_music",
    title: "Music Producer 🎵",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    likes: "5.9K",
    views: "26.8K"
  },
  {
    name: "emma_travel",
    title: "Travel Blogger ✈️",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    likes: "4.7K",
    views: "22.4K"
  },
  {
    name: "james_gaming",
    title: "Game Developer 🎮",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    likes: "12.1K",
    views: "58.9K"
  },
  {
    name: "sophie_beauty",
    title: "Beauty Influencer 💅",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    likes: "11.3K",
    views: "49.6K"
  },
  {
    name: "ryan_skateboard",
    title: "Skateboarder 🛹",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    likes: "3.4K",
    views: "17.2K"
  },
  {
    name: "maya_yoga",
    title: "Yoga Instructor 🧘‍♀️",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    likes: "6.8K",
    views: "31.5K"
  },
  {
    name: "ethan_tech",
    title: "Tech Reviewer 📱",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    likes: "8.9K",
    views: "38.7K"
  },
  {
    name: "olivia_diy",
    title: "DIY Crafter 🔨",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    likes: "5.2K",
    views: "23.8K"
  },
  {
    name: "noah_comedy",
    title: "Stand-up Comedian 😂",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    likes: "15.6K",
    views: "67.3K"
  },
  {
    name: "ava_plants",
    title: "Plant Parent 🌱",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    likes: "4.3K",
    views: "19.7K"
  },
  {
    name: "lucas_magic",
    title: "Magician 🎩",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    likes: "7.8K",
    views: "34.2K"
  },
  {
    name: "chloe_pets",
    title: "Pet Trainer 🐕",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    likes: "9.4K",
    views: "41.6K"
  },
  {
    name: "derek_coffee",
    title: "Coffee Enthusiast ☕",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    likes: "3.7K",
    views: "16.1K"
  }
];

const categories = [
  "All Categories",
  "Video Editor", 
  "Graphic Designer",
  "Social Media Manager",
  "Motion Graphics Artist",
  "Copywriter",
  "Creative Director",
  "UI/UX Designer",
  "Photographer"
];

const talentTypes = [
  "All Talent Types",
  "Video Editor",
  "Graphic Designer", 
  "Social Media Manager",
  "Motion Graphics Artist",
  "Copywriter",
  "Creative Director",
  "UI/UX Designer",
  "Photographer"
];

const creativeCategories = [
  {
    id: 1,
    title: "Video Editing",
    description: "Professional video editing for all your content needs",
    experts: "2,150+",
    color: "bg-red-500",
    icon: "🎬"
  },
  {
    id: 2,
    title: "Graphic Design",
    description: "Creative designers for logos, branding, and visual content",
    experts: "3,200+",
    color: "bg-purple-500",
    icon: "🎨"
  },
  {
    id: 3,
    title: "Photography",
    description: "Product, portrait, and commercial photographers",
    experts: "1,800+",
    color: "bg-blue-500",
    icon: "📸"
  },
  {
    id: 4,
    title: "Illustration",
    description: "Custom illustrations and digital artwork",
    experts: "1,200+",
    color: "bg-green-500",
    icon: "✏️"
  },
  {
    id: 5,
    title: "Social Media",
    description: "Social media managers and content creators",
    experts: "2,100+",
    color: "bg-pink-500",
    icon: "📱"
  },
  {
    id: 6,
    title: "Web Design",
    description: "UI/UX designers and web developers",
    experts: "1,900+",
    color: "bg-indigo-500",
    icon: "💻"
  },
  {
    id: 7,
    title: "Audio Production",
    description: "Music producers, sound designers, and audio editors",
    experts: "800+",
    color: "bg-orange-500",
    icon: "🎵"
  },
  {
    id: 8,
    title: "Copywriting",
    description: "Creative writers and content strategists",
    experts: "1,500+",
    color: "bg-teal-500",
    icon: "✍️"
  }
];

const featuredProfessionals = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Video Editor",
    rating: 4.9,
    reviews: 127,
    location: "Los Angeles, CA",
    hourlyRate: 85,
    responseTime: "2 hours",
    completedProjects: 89,
    badge: "Online"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    title: "Graphic Designer",
    rating: 5.0,
    reviews: 245,
    location: "New York, NY",
    hourlyRate: 75,
    responseTime: "1 hour",
    completedProjects: 156,
    badge: "Online"
  },
  {
    id: 3,
    name: "Emma Thompson",
    title: "Social Media Manager",
    rating: 4.8,
    reviews: 89,
    location: "Austin, TX",
    hourlyRate: 65,
    responseTime: "30 mins",
    completedProjects: 73,
    badge: "Online"
  },
  {
    id: 4,
    name: "David Kim",
    title: "UI/UX Designer",
    rating: 4.9,
    reviews: 156,
    location: "San Francisco, CA",
    hourlyRate: 95,
    responseTime: "4 hours",
    completedProjects: 112,
    badge: "Online"
  },
  {
    id: 5,
    name: "Lisa Park",
    title: "Motion Graphics Artist",
    rating: 4.7,
    reviews: 203,
    location: "Seattle, WA",
    hourlyRate: 88,
    responseTime: "3 hours",
    completedProjects: 145,
    badge: "Online"
  },
  {
    id: 6,
    name: "James Wilson",
    title: "Copywriter",
    rating: 4.9,
    reviews: 167,
    location: "Chicago, IL",
    hourlyRate: 55,
    responseTime: "1 hour",
    completedProjects: 198,
    badge: "Online"
  }
];

function TopNav() {
  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Left side - Logo */}
        <div className="flex items-center">
          <div className="text-2xl font-bold text-purple-600">HireCreative</div>
        </div>
        
        {/* Center - Search Bar */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search for creative professionals..."
              className="w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        
        {/* Right side - Navigation */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-purple-600">Browse Talent</button>
          <button className="text-gray-600 hover:text-purple-600">How it Works</button>
          <button className="text-gray-600 hover:text-purple-600">👤 Sign In</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ isOpen, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedTalentType, setSelectedTalentType] = useState("All Talent Types");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative w-80 bg-white h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center">
              <span className="mr-2">🔧</span>
              Filters
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
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
              {talentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <div className="mt-3 space-y-2">
              {["Video Editor", "Graphic Designer", "Social Media Manager", "Motion Graphics Artist", "Copywriter", "Creative Director", "UI/UX Designer", "Photographer"].map(type => (
                <label key={type} className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ category }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center space-x-4">
        <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl`}>
          {category.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{category.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{category.description}</p>
          <p className="text-xs text-gray-500">{category.experts} experts</p>
        </div>
      </div>
    </div>
  );
}

function ProfessionalCard({ professional }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-gray-700">
            {professional.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
            {professional.badge}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-lg mb-1">{professional.name}</h3>
          <div className="flex items-center space-x-1 mb-2">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm font-semibold">{professional.rating}</span>
            <span className="text-xs text-gray-500">({professional.reviews})</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-700 font-medium mb-1">{professional.title}</p>
        <p className="text-xs text-gray-500 mb-3">{professional.location}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span className="flex items-center">
            <span className="mr-1">⏱️</span>
            {professional.responseTime}
          </span>
          <span className="flex items-center">
            <span className="mr-1">📋</span>
            {professional.completedProjects} projects
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900">
            ${professional.hourlyRate}
            <span className="text-sm font-normal text-gray-500">/hour</span>
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors font-medium">
            Hire Now
          </button>
        </div>
      </div>
    </div>
  );
}

function BrowseSection() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Find the Perfect Creative Professional</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Browse through thousands of vetted creative professionals ready to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Browsing
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Post a Project
            </button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          <p className="text-lg text-gray-600">
            Find the right creative professional for your specific needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {creativeCategories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      {/* Featured Professionals Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Professionals</h2>
          <p className="text-lg text-gray-600">
            Handpicked top-rated professionals available for hire
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProfessionals.map(professional => (
            <ProfessionalCard key={professional.id} professional={professional} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            View All Professionals
          </button>
        </div>
      </div>

      {/* How It Works Section */}
      <HowItWorksSection />
      
      {/* Ready to Start Section */}
      <ReadyToStartSection />
      
      {/* Footer */}
      <FooterSection />
    </div>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      title: "Browse & Search",
      description: "Search through thousands of vetted creative professionals by skill, location, or budget.",
      icon: "🔍",
      color: "bg-blue-500"
    },
    {
      step: 2,
      title: "Review Profiles",
      description: "View portfolios, ratings, and previous work to find the perfect match for your project.",
      icon: "👥",
      color: "bg-purple-500"
    },
    {
      step: 3,
      title: "Hire Instantly",
      description: "Send a message or start a project immediately. Most professionals respond within hours.",
      icon: "⚡",
      color: "bg-orange-500"
    },
    {
      step: 4,
      title: "Get Results",
      description: "Collaborate seamlessly and receive high-quality work delivered on time, every time.",
      icon: "✅",
      color: "bg-green-500"
    }
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started in minutes, not days. Our streamlined process makes hiring creative talent as easy as online shopping.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="text-center">
              <div className="relative mb-6">
                <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="absolute -top-2 -right-2 bg-white border-2 border-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-700">{step.step}</span>
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReadyToStartSection() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of businesses who trust us with their creative projects.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            Start Hiring Today
          </button>
          <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

function FooterSection() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">HireCreative</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              The fastest way to hire world-class creative professionals. Connect with vetted talent and get your projects done right.
            </p>
            <div className="flex space-x-4 mt-4">
              <span className="text-gray-400 hover:text-white cursor-pointer">📘</span>
              <span className="text-gray-400 hover:text-white cursor-pointer">🐦</span>
              <span className="text-gray-400 hover:text-white cursor-pointer">📷</span>
              <span className="text-gray-400 hover:text-white cursor-pointer">💼</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">For Clients</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">Browse Talent</li>
              <li className="hover:text-white cursor-pointer">How It Works</li>
              <li className="hover:text-white cursor-pointer">Success Stories</li>
              <li className="hover:text-white cursor-pointer">Pricing</li>
              <li className="hover:text-white cursor-pointer">Enterprise</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">For Creatives</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">Join as Professional</li>
              <li className="hover:text-white cursor-pointer">Find Work</li>
              <li className="hover:text-white cursor-pointer">Resources</li>
              <li className="hover:text-white cursor-pointer">Community</li>
              <li className="hover:text-white cursor-pointer">Support</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center">
                <span className="mr-2">📧</span>
                hello@hirecreative.com
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 HireCreative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function VideoControls() {
  return (
    <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
      <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
        Video Editing
      </span>
      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
        Gaming
      </span>
    </div>
  );
}

function ActionButtons({ likes, views }) {
  return (
    <div className="absolute right-4 bottom-20 z-20 flex flex-col space-y-4">
      <div className="flex flex-col items-center">
        <button className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30 transition-all">
          <span className="text-white text-xl">❤️</span>
        </button>
        <span className="text-white text-xs mt-1">{likes}</span>
      </div>
      
      <div className="flex flex-col items-center">
        <button className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30 transition-all">
          <span className="text-white text-xl">💬</span>
        </button>
        <span className="text-white text-xs mt-1">89</span>
      </div>
      
      <div className="flex flex-col items-center">
        <button className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30 transition-all">
          <span className="text-white text-xl">📤</span>
        </button>
        <span className="text-white text-xs mt-1">Share</span>
      </div>
      
      <div className="flex flex-col items-center">
        <button className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30 transition-all">
          <span className="text-white text-xl">👁️</span>
        </button>
        <span className="text-white text-xs mt-1">{views}</span>
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
      
      <VideoControls />
      
      <div className="absolute bottom-6 left-4 z-20 text-white max-w-72">
        <h2 className="text-lg font-bold mb-1">@{name}</h2>
        <p className="text-sm opacity-90">{title}</p>
        <p className="text-xs opacity-75 mt-1">Professional video editing with motion graphics and color grading</p>
      </div>
      
      <ActionButtons likes={likes} views={views} />
    </div>
  );
}

function NavigationTabs({ activeTab, onTabChange, onFilterClick }) {
  return (
    <div className="w-full bg-black border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-16 z-40">
      <div className="flex items-center space-x-1">
        <button
          onClick={() => onTabChange('discover')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'discover' 
              ? 'bg-white text-black' 
              : 'text-white hover:bg-gray-800'
          }`}
        >
          <span className="mr-2">▶️</span>
          Discover
        </button>
        <button
          onClick={() => onTabChange('browse')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'browse' 
              ? 'bg-white text-black'
              : 'text-white hover:bg-gray-800'
          }`}
        >
          <span className="mr-2">🔲</span>
          Browse
        </button>
      </div>
      
      {activeTab === 'discover' && (
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

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <TopNav />
      <NavigationTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onFilterClick={() => setSidebarOpen(true)}
      />
      
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {activeTab === 'discover' ? (
        <div className="reel-container">
          {reelsData.map((reel, index) => (
            <ReelCard key={index} {...reel} />
          ))}
        </div>
      ) : (
        <BrowseSection />
      )}
      
      <style jsx>{`
        .reel-container {
          height: calc(100vh - 120px);
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
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
      `}</style>
    </div>
  );
}

export default App;