import React, { useState, useRef, useEffect } from "react";
import { Moon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/* -----------------------------------------------------------
 * PUBLIC TEST VIDEO URLS (direct MP4 streams, cross‑origin friendly)
 * ----------------------------------------------------------- */
const VIDEO_SOURCES = {
  flower:
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  bunny: "https://www.w3schools.com/html/mov_bbb.mp4",
  bear: "https://www.w3schools.com/html/movie.mp4",
  sample5s: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
  sample10s: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
  ocean: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
  city: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
  forest:
    "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
  night: "https://sample-videos.com/video321/mp4/720/wave_720.mp4",
};

/* -----------------------------------------------------------
 * POSTER IMAGES (any placeholder; replace later)
 * ----------------------------------------------------------- */
const POSTER = {
  editor: "https://picsum.photos/id/237/600/600",
  designer: "https://picsum.photos/id/1027/600/600",
  manager: "https://picsum.photos/id/1033/600/600",
  motion: "https://picsum.photos/id/1041/600/600",
  copywriter: "https://picsum.photos/id/1049/600/600",
  director: "https://picsum.photos/id/1056/600/600",
  ui: "https://picsum.photos/id/1067/600/600",
  photographer: "https://picsum.photos/id/1070/600/600",
  vfx: "https://picsum.photos/id/1076/600/600",
};

/* -----------------------------------------------------------
 * 3x3 GRID WITH CREATIVE CATEGORIES
 * ----------------------------------------------------------- */
const portfolioItems = [
  { name: "Video Editor", video: VIDEO_SOURCES.flower, poster: POSTER.editor },
  {
    name: "Graphic Designer",
    video: VIDEO_SOURCES.bunny,
    poster: POSTER.designer,
  },
  {
    name: "Social Media Manager",
    video: VIDEO_SOURCES.bear,
    poster: POSTER.manager,
  },
  {
    name: "Motion Graphics Artist",
    video: VIDEO_SOURCES.sample5s,
    poster: POSTER.motion,
  },
  {
    name: "Copywriter",
    video: VIDEO_SOURCES.sample10s,
    poster: POSTER.copywriter,
  },
  {
    name: "Creative Director",
    video: VIDEO_SOURCES.ocean,
    poster: POSTER.director,
  },
  { name: "UI/UX Designer", video: VIDEO_SOURCES.city, poster: POSTER.ui },
  {
    name: "Photographer",
    video: VIDEO_SOURCES.forest,
    poster: POSTER.photographer,
  },
  { name: "CGI/VFX Artist", video: VIDEO_SOURCES.night, poster: POSTER.vfx },
];

/* -----------------------------------------------------------
 * AUTO-SCROLL STRIP IMAGES (can replace w/ logos)
 * ----------------------------------------------------------- */
const scrollImages = [
  "https://picsum.photos/id/1015/500/300",
  "https://picsum.photos/id/1016/500/300",
  "https://picsum.photos/id/1018/500/300",
  "https://picsum.photos/id/1021/500/300",
  "https://picsum.photos/id/1025/500/300",
  "https://picsum.photos/id/1035/500/300",
];

/* ===========================================================
 * VideoCard component
 * - Autoplay muted inline
 * - IntersectionObserver: play/pause when visible
 * - Manual click fallback: tap to toggle
 * - Error fallback to poster
 * =========================================================== */
const VideoCard = ({ src, poster, label }) => {
  const vidRef = useRef(null);
  const [errored, setErrored] = useState(false);
  const [manuallyPlaying, setManuallyPlaying] = useState(false);

  useEffect(() => {
    const el = vidRef.current;
    if (!el) return;

    const tryPlay = () => {
      const p = el.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          /* autoplay blocked; wait for user */
        });
      }
    };

    // try at mount
    tryPlay();

    // observe visibility
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!el) return;
          if (entry.isIntersecting && !manuallyPlaying) {
            tryPlay();
          } else if (!manuallyPlaying) {
            el.pause();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [manuallyPlaying]);

  const handleError = () => {
    setErrored(true);
  };

  const handleToggle = () => {
    const el = vidRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
      setManuallyPlaying(true);
    } else {
      el.pause();
      setManuallyPlaying(false);
    }
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden group cursor-pointer aspect-square transition-all duration-300 hover:scale-105"
      onClick={handleToggle}
    >
      {errored ? (
        <img
          src={poster}
          alt={label}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <video
          ref={vidRef}
          src={src}
          poster={poster}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          autoPlay
          loop
          muted
          playsInline
          onError={handleError}
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Category label at top */}
      <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1.5 rounded-full text-white text-sm font-semibold shadow-lg">
        {label}
      </div>

      {/* Play icon appears if paused / errored */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          errored ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {!errored && (
          <div className="w-14 h-14 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-0 h-0 border-l-[16px] border-t-[10px] border-b-[10px] border-l-white border-t-transparent border-b-transparent ml-1" />
          </div>
        )}
      </div>
    </div>
  );
};

const Landing = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
      } relative overflow-hidden`}
    >
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 ${
          isDarkMode
            ? "bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50"
            : "bg-white/80 backdrop-blur-lg border-b border-gray-200/50"
        } transition-all duration-300`}
      >
        <div className="w-full px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link to =''></Link>
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

      {/* HERO SECTION - Full Screen */}
      <div className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6">
        {/* Main Hero Content */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 leading-tight">
            Hire the World's Top Creators
          </h1>
          <p
            className={`text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Reach out to the perfect editor for your next project today.
          </p>
          <Link to={"/discover"}>
            <button
              className={`px-6 cursor-pointer sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto shadow-xl ${
                isDarkMode
                  ? "bg-white text-gray-900 hover:bg-gray-100"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              Discover Creators
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

        {/* AUTO-SCROLL STRIP - At bottom of henpm ro */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <div className="flex space-x-4 sm:space-x-6 animate-scroll px-4 sm:px-6">
            {[...scrollImages, ...scrollImages].map((img, i) => (
              <div
                key={i}
                className="min-w-[200px] sm:min-w-[250px] h-[120px] sm:h-[150px] rounded-xl overflow-hidden relative shrink-0"
              >
                <img
                  src={img}
                  alt={`scroll-${i}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PORTFOLIO VIDEO GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            Made with love, on Hirecreatives
          </h2>
          <p
            className={`mb-4 text-sm sm:text-base ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Browse stunning portfolios from talented Creators, ready to bring
            your vision to life.
          </p>
          <button
            className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            View All Portfolios
          </button>
        </div>

        {/* 3x3 Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {portfolioItems.map((item, index) => (
            <VideoCard
              key={`${item.name}-${index}`}
              src={item.video}
              poster={item.poster}
              label={item.name}
            />
          ))}
        </div>
      </section>

      {/* CSS for auto-scroll marquee */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            display: flex;
            width: max-content;
            animation: scroll 25s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Landing;
