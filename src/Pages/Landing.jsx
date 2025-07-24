import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* -----------------------------------------------------------
 * Icons (union of both codebases)
 * ----------------------------------------------------------- */
import {
  ArrowRight,
  Menu,
  X,
  Play,
  Pause,
  /* From marketing sections */
  Filter,
  ShieldCheck,
  CheckCircle2,
  Zap,
  DollarSign,
  Users,
  Globe2,
  Search,
  Video as VideoIcon,
  FileCheck2,
  Handshake,
  Shield,
  Timer,
  Wallet,
  Settings,
} from "lucide-react";

/* -----------------------------------------------------------
 * PUBLIC TEST VIDEO URLS (direct MP4 streams, cross‑origin friendly)
 * ----------------------------------------------------------- */
const VIDEO_SOURCES = {
  flower:
    "https://videos.pexels.com/video-files/4464847/4464847-uhd_2560_1440_25fps.mp4",
  bunny:
    "https://videos.pexels.com/video-files/8100336/8100336-uhd_2732_1440_25fps.mp4",
  bear: "https://videos.pexels.com/video-files/30063526/12895043_1920_1080_25fps.mp4",
  sample5s:
    "https://videos.pexels.com/video-files/6980544/6980544-uhd_2560_1440_25fps.mp4",
  sample10s:
    "https://videos.pexels.com/video-files/2235742/2235742-hd_1280_720_30fps.mp4",
  ocean:
    "https://videos.pexels.com/video-files/7414127/7414127-hd_1920_1080_24fps.mp4",
  city: "https://videos.pexels.com/video-files/2889410/2889410-hd_1920_1080_30fps.mp4",
  forest:
    "https://videos.pexels.com/video-files/33048633/14085868_1920_1080_25fps.mp4",
  night:
    "https://videos.pexels.com/video-files/7514220/7514220-uhd_2560_1440_25fps.mp4",
  hero: "https://res.cloudinary.com/dhtp47auy/video/upload/v1753077039/reel_uadkgg.mp4", // Hero video
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
 * CAROUSEL DATA - Creative Specialists
 * ----------------------------------------------------------- */
const carouselData = [
  {
    id: 1,
    title: "SEO Specialists",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    tools: ["NOTION"],
  },
  {
    id: 2,
    title: "Content SEO Specialists",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    tools: ["COPY.AI", "GRAMMARLY", "NOTION", "ASANA"],
  },
  {
    id: 3,
    title: "Digital Marketing Specialists",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    tools: ["HUBSPOT", "SALESFORCE"],
  },
  {
    id: 4,
    title: "Motion Graphics Designers",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    tools: ["ILLUSTRATOR", "PHOTOSHOP", "AFTER EFFECTS"],
  },
  {
    id: 5,
    title: "Social Media Managers",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
    tools: ["SLACK", "NOTION"],
  },
  {
    id: 6,
    title: "UI/UX Designers",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
    tools: ["FIGMA", "SKETCH", "PRINCIPLE"],
  },
];

/* ===========================================================
 * Header Component
 * =========================================================== */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              HireCreatives
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="text-gray-700 hover:text-gray-900 font-medium flex items-center transition-colors duration-200">
                How It Works
                <svg
                  className="ml-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <a
              href="#explore"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Explore
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Pricing
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Link to="/discover">
              <button
                type="button"
                className="bg-gray-900 text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
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
              <button className="bg-gray-900 text-white px-6 py-2 rounded-full font-medium w-fit">
                Explore Talent
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

/* ===========================================================
 * Hero Video Section Component
 * =========================================================== */
const HeroVideoSection = React.forwardRef((props, ref) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay may fail silently on some browsers.
      });
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <section
      ref={ref}
      id="hero-video-section"
      className="relative h-screen min-h-[600px] overflow-hidden bg-black"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        poster="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1920&h=1080&fit=crop"
      >
        <source src={VIDEO_SOURCES.hero} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Optional Controls */}
      {/* <div className="absolute bottom-8 right-8 flex space-x-2 z-10">
        <button
          onClick={togglePlay}
          className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all duration-200"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button
          onClick={toggleMute}
          className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all duration-200"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      </div> */}
    </section>
  );
});
HeroVideoSection.displayName = "HeroVideoSection";

/* ===========================================================
 * Auto Carousel Component
 * =========================================================== */
const AutoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = 320; // w-80 = 320px
      const gap = 24; // gap-6 = 24px
      const scrollPosition = currentIndex * (cardWidth + gap);
      carouselRef.current.style.transform = `translateX(-${scrollPosition}px)`;
    }
  }, [currentIndex]);

  const CarouselCard = ({ specialist }) => (
    <div className="w-80 h-96 bg-white rounded-3xl shadow-xl relative overflow-hidden flex-shrink-0 hover:shadow-2xl transition-all duration-500 hover:scale-105">
      {/* Background Circle */}
      <div className="absolute top-8 right-8 w-64 h-64 bg-gradient-to-br from-cyan-300 to-teal-400 rounded-full -translate-y-16 translate-x-16" />
      {/* Title */}
      <div className="absolute top-8 left-8 z-10">
        <h3 className="text-xl font-bold text-gray-900 leading-tight max-w-48">
          {specialist.title}
        </h3>
      </div>
      {/* Profile Image */}
      <div className="absolute bottom-20 left-8 z-10">
        <img
          src={specialist.image}
          alt={specialist.title}
          className="w-32 h-32 rounded-2xl object-cover shadow-lg"
        />
      </div>
      {/* Tools */}
      <div className="absolute bottom-8 left-8 right-8 z-10">
        <div className="flex flex-wrap gap-2">
          {specialist.tools.map((tool, index) => (
            <span
              key={index}
              className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-full font-medium"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Creative Specialists
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Talented professionals ready to bring your projects to life with
            expertise and passion
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              ref={carouselRef}
              className="flex gap-6 transition-transform duration-700 ease-in-out"
              style={{ width: `${carouselData.length * 344}px` }}
            >
              {[...carouselData, ...carouselData.slice(0, 3)].map(
                (specialist, index) => (
                  <CarouselCard
                    key={`${specialist.id}-${index}`}
                    specialist={specialist}
                  />
                )
              )}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-12 space-x-3">
            {carouselData.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-purple-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===========================================================
 * VideoCard component
 * =========================================================== */
const VideoCard = ({ src, poster }) => {
  const vidRef = useRef(null);
  const [errored, setErrored] = useState(false);
  const [manuallyPlaying, setManuallyPlaying] = useState(false);

  useEffect(() => {
    const el = vidRef.current;
    if (!el) return;

    const tryPlay = () => {
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    tryPlay();

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

  const handleError = () => setErrored(true);

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
      className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-square transition-all duration-500 hover:scale-105 hover:shadow-2xl"
      onClick={handleToggle}
    >
      {errored ? (
        <img
          src={poster}
          alt=""
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <video
          ref={vidRef}
          src={src}
          poster={poster}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          autoPlay
          loop
          muted
          playsInline
          onError={handleError}
        />
      )}

      {/* Hover dark overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

/* ===========================================================
 * Creative Cards for Hero Section
 * =========================================================== */
const CreativeCard = ({ image, name, role, message, className = "" }) => (
  <div
    className={`bg-white rounded-2xl p-4 shadow-lg max-w-xs hover:shadow-xl transition-all duration-300 ${className}`}
  >
    <div className="flex items-start space-x-3">
      <img
        src={image}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-900">{name}</div>
        <div className="text-xs text-gray-500 mb-2">{role}</div>
        <div className="text-sm text-gray-700 leading-relaxed">{message}</div>
      </div>
    </div>
  </div>
);

/* ===========================================================
 * ============  MARKETING SECTIONS FROM PREV CODE  ==========
 * Slight ID suffixes to avoid collisions with existing anchors
 * =========================================================== */

/* Scroll-trigger animation hook */
const useScrollAnimation = () => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    elementsRef.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return addToRefs;
};

/* Generic UI Primitives */
const PrimaryButton = ({ children, href = "#", className = "" }) => (
  <a
    href={href}
    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${className}`}
  >
    {children}
    <ArrowRight className="h-4 w-4" />
  </a>
);

const SecondaryButton = ({ children, href = "#", className = "" }) => (
  <a
    href={href}
    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-all duration-300 hover:scale-105 ${className}`}
  >
    {children}
    <ArrowRight className="h-4 w-4" />
  </a>
);

const Section = ({
  id,
  children,
  className = "",
  containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
}) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    <div className={containerClass}>{children}</div>
  </section>
);

const SectionHeader = ({
  kicker,
  title,
  subtitle,
  align = "center",
  className = "",
}) => {
  const alignMap = {
    center: "text-center mx-auto",
    left: "text-left",
    right: "text-right ml-auto",
  };
  return (
    <div className={`max-w-3xl ${alignMap[align]} ${className}`}>
      {kicker && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
          {kicker}
        </p>
      )}
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
};

/* Unlock Elite Creatives Section */
const Unlock = () => {
  const addToRefs = useScrollAnimation();
  return (
    <Section id="unlock-elite">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div ref={addToRefs} className="section-hidden order-2 md:order-1">
          <SectionHeader
            kicker="Elite Talent"
            title="Unlock Elite Creatives, Effortlessly"
            subtitle="Browse authentic portfolios in an addictive, TikTok-style feed—see real projects, not just resumes."
            align="left"
          />
          <ul className="mt-8 space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 text-indigo-600" />
              Authentic project reels & case studies.
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 text-indigo-600" />
              Instant messaging & booking.
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 text-indigo-600" />
              Global talent, localized budgets.
            </li>
          </ul>
        </div>
        <div ref={addToRefs} className="section-hidden order-1 md:order-2">
          <img
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1470&q=80"
            alt="Portfolio grid demo"
            className="w-full rounded-2xl shadow-xl ring-1 ring-gray-200"
          />
        </div>
      </div>
    </Section>
  );
};

/* Smart Talent Filtering Section */
const FilterChip = ({ icon, label }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm hover:shadow-md transition-shadow">
    {icon}
    {label}
  </span>
);

const SmartFiltering = () => {
  const addToRefs = useScrollAnimation();
  return (
    <Section id="explore-features" className="bg-gray-50">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div ref={addToRefs} className="section-hidden">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1470&q=80"
            alt="Talent filtering UI"
            className="w-full rounded-2xl shadow-xl ring-1 ring-gray-200"
          />
        </div>
        <div ref={addToRefs} className="section-hidden">
          <SectionHeader
            kicker="Search & Match"
            title="Find Talent Your Way"
            subtitle="Sort instantly by skills, price, and availability to match your needs and budget—with zero hidden costs."
            align="left"
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <FilterChip icon={<Filter />} label="Skill" />
            <FilterChip icon={<DollarSign />} label="Budget" />
            <FilterChip icon={<Timer />} label="Availability" />
            <FilterChip icon={<Globe2 />} label="Location" />
          </div>
        </div>
      </div>
    </Section>
  );
};

/* Top 1% Screening Section */
const screeningItems = [
  {
    icon: <VideoIcon className="h-6 w-6" />,
    title: "Portfolio Quality",
    desc: "Strong work samples reviewed by experts.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Turnaround Speed",
    desc: "Measured delivery benchmarks.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "English Fluency",
    desc: "Language & communication checks.",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "Attention to Detail",
    desc: "Pixel-level QA review.",
  },
];

// const Screening = () => {
//   const addToRefs = useScrollAnimation();
//   return (
//     <Section id="screening-quality">
//       <div className="flex flex-col items-center">
//         <div ref={addToRefs} className="section-hidden">
//           <SectionHeader
//             kicker="Quality"
//             title="Only the Top 1% Make the Cut"
//             subtitle="Every candidate passes our industry-best screening, tailored for their specialty. Every showcased project is manually verified for authenticity."
//           />
//         </div>
//         <ul className="mt-12 grid w-full max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
//           {screeningItems.map((item) => (
//             <li
//               key={item.title}
//               ref={addToRefs}
//               className="section-hidden group rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
//             >
//               <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
//                 {item.icon}
//               </div>
//               <h3 className="font-semibold text-gray-900">{item.title}</h3>
//               <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </Section>
//   );
// };

// Updated PricingCard with icons + visuals
const PricingCard = ({ title, priceDesc, bullets, icon }) => (
  <div className="relative flex flex-col rounded-2xl border border-indigo-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300">
    <div className="mb-4 flex justify-center">
      <img src={icon} alt={`${title} icon`} className="h-12 w-12" />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 text-center">{title}</h3>
    <p className="mt-2 text-lg text-indigo-600 text-center">{priceDesc}</p>
    <ul className="mt-6 space-y-3 text-gray-700">
      {bullets.map((b) => (
        <li key={b} className="flex items-start gap-2 text-sm">
          <CheckCircle2 className="mt-0.5 h-4 w-4 text-indigo-600" />
          {b}
        </li>
      ))}
    </ul>
  </div>
);

const Pricing = () => {
  const addToRefs = useScrollAnimation();
  return (
    <Section id="pricing-details" className="bg-gray-50 py-16">
      <div className="flex flex-col items-center">
        <div ref={addToRefs} className="section-hidden">
          <SectionHeader
            kicker="Pricing"
            title="Transparent, Simple Pricing. No Guesswork."
            subtitle="No hidden markups. Know exactly what you pay before you hire."
          />
        </div>
        <div className="mt-12 grid w-full max-w-5xl gap-8 md:grid-cols-2">
          <div ref={addToRefs} className="section-hidden">
            <PricingCard
              title="Clear Placement Fee"
              priceDesc="Just 1 month of candidate's annual salary."
              icon="https://res.cloudinary.com/dhtp47auy/image/upload/v1753368860/undraw_remote-worker_0l91_nqfawq.svg"
              bullets={[
                "Upfront & visible on profile",
                "Due at hiring",
                "One-time fee",
              ]}
            />
          </div>
          <div ref={addToRefs} className="section-hidden">
            <PricingCard
              title="Low Monthly Maintenance"
              priceDesc="Flat support + payroll management."
              icon="https://res.cloudinary.com/dhtp47auy/image/upload/v1753368859/undraw_screen-time_f7ev_fpbmrz.svg"
              bullets={[
                "Secure payments",
                "Ongoing talent support",
                "Issue resolution",
              ]}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

/* Direct Hiring Advantage Section */
const DirectHiring = () => {
  const addToRefs = useScrollAnimation();

  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div ref={addToRefs} className="section-hidden space-y-10">
            {/* Main Heading */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 leading-tight">
                Hire top creatives—fast and transparently.
              </h1>
              <p className="text-gray-600 mt-3 leading-relaxed">
                Scroll real portfolios, connect instantly, and hire the top 1%
                of creative talent with zero hassle.
              </p>
            </div>

            {/* Direct Hiring Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Direct Hiring. Zero Middlemen.
              </h2>
              <p className="text-gray-600 mb-5 leading-relaxed">
                Skip agencies and recruiters—your budget goes straight to the
                experts who deliver the work.
              </p>
            </div>

            {/* Transparent Pricing Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Transparent, Simple Pricing.
              </h2>
              <p className="text-gray-600 mb-5 leading-relaxed">
                One upfront placement fee plus a low monthly charge—no hidden
                costs, no guesswork.
              </p>
            </div>

            {/* Expertly Trained Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Vetted & Expertly Trained.
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Every creative is tested for quality, speed, English fluency,
                and attention to detail.
              </p>
            </div>
          </div>

          {/* Right Content - Images and Stats Grid */}
          <div
            ref={addToRefs}
            className="section-hidden grid grid-cols-2 gap-4"
          >
            {/* First Image - spans full width */}
            <div className="col-span-2 rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Professional working on laptop"
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Top Right Stat */}
            <div className="bg-cyan-300 rounded-3xl p-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">70%</div>
              <div className="text-gray-800 font-medium text-sm">
                Average savings on creative costs with global top talent
              </div>
            </div>

            {/* Middle Stat */}
            <div className="bg-green-300 rounded-3xl p-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">07d</div>
              <div className="text-gray-800 font-medium text-sm">
                Average time to hire top 1% creatives ready to work
              </div>
            </div>

            {/* Bottom Stat */}
            <div className="bg-purple-300 rounded-3xl p-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">4%</div>
              <div className="text-gray-800 font-medium text-sm">
                Replacement rate—expertly vetted talent you can trust
              </div>
            </div>

            {/* Second Image */}
            <div className="rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581368121163-0d9c85127cdd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Professional in workspace"
                className="w-full h-32 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Protection / Rights Section */
const ProtectionCard = ({ icon, title, desc }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
      {icon}
    </div>
    <h3 className="font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 text-sm text-gray-600">{desc}</p>
  </div>
);

const Protection = () => {
  const addToRefs = useScrollAnimation();
  return (
    <Section id="protection-rights" className="bg-gray-50">
      <div className="flex flex-col items-center">
        <div ref={addToRefs} className="section-hidden">
          <SectionHeader
            kicker="Trust"
            title="Your Rights & Results, Always Protected"
            subtitle="Robust agreements, secure IP, and ongoing partnership from onboarding through delivery."
          />
        </div>
        <div className="mt-12 grid w-full max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div ref={addToRefs} className="section-hidden">
            <ProtectionCard
              icon={<ShieldCheck className="h-8 w-8" />}
              title="Rock-Solid Contracts"
              desc="IP & deliverables secured in legally reviewed agreements."
            />
          </div>
          <div ref={addToRefs} className="section-hidden">
            <ProtectionCard
              icon={<FileCheck2 className="h-8 w-8" />}
              title="Clear Deliverables"
              desc="Milestone-based work tracking & acceptance."
            />
          </div>
          <div ref={addToRefs} className="section-hidden">
            <ProtectionCard
              icon={<Settings className="h-8 w-8" />}
              title="Ongoing Partnership"
              desc="Support from onboarding to payroll & dispute resolution."
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

/* How It Works (3 Steps) */
const steps = [
  {
    id: 1,
    title: "Scroll",
    description: "Explore portfolios in a seamless, short-video feed.",
    img: "https://cdn.prod.website-files.com/65f82769357f2cd4f6b6e20e/6614ffcebef262d3802179d2_hiw_img1%402x.webp",
  },
  {
    id: 2,
    title: "Select",
    description: "Filter by skills, price & more; connect instantly.",
    img: "https://cdn.prod.website-files.com/65f82769357f2cd4f6b6e20e/6614ffcecd4993ceaf2e0144_hiw_img2%402x.webp",
  },
  {
    id: 3,
    title: "Hired",
    description: "Sign, onboard & collaborate often in under 24 hrs.",
    img: "https://cdn.prod.website-files.com/65f82769357f2cd4f6b6e20e/6614ffd29cb927fa32ece0bc_hiw_img3%402x.webp",
  },
];

const HowItWorks = () => {
  const addToRefs = useScrollAnimation();

  return (
    <Section id="how-it-works-marketing">
      <div className="flex flex-col items-center">
        {/* Heading */}
        <div ref={addToRefs} className="section-hidden">
          <SectionHeader
            kicker="Process"
            title="How HireCreatives Works"
            subtitle="Three simple steps from discovery to done."
          />
        </div>

        {/* Steps */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.id}
              ref={addToRefs}
              className="section-hidden flex flex-col items-center text-center"
            >
              {/* Step Number */}
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mb-4">
                {step.id}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 mb-4 text-gray-600">{step.description}</p>

              {/* Image */}
              <div className="w-full rounded-xl overflow-hidden shadow-md">
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-52 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const HireCreativesBenefits = () => {
  return (
    <section className="relative py-20 px-4 sm:px-10 bg-white overflow-hidden">
      {/* Background SVG line image */}
      <img
        src="https://cdn.prod.website-files.com/65f82769357f2cd4f6b6e20e/66156a7df86116541db731a6_cta_card-img.svg"
        alt="Background Line"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 opacity-60 pointer-events-none hidden md:block"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 ">
            Only the Top 1% Make the Cut
          </h2>
          <p className="text-lg text-gray-700">
            Every HireCreatives candidate passes our industry-best screening,
            tailored for their specialty. For video editors, our process
            rigorously tests for:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Portfolio quality</li>
            <li>Turnaround speed</li>
            <li>English fluency</li>
            <li>Precision and attention to detail</li>
          </ul>
          <button className="mt-4 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
            Hire Top Talent
          </button>
        </div>

        {/* Right Side Avatars */}
        <div className="flex justify-center md:justify-end relative">
          <div className="relative w-80 h-80">
            {/* Avatar 1 */}
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Avatar 1"
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            {/* Avatar 2 */}
            <img
              src="https://randomuser.me/api/portraits/men/46.jpg"
              alt="Avatar 2"
              className="absolute top-1/4 left-0 transform -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            {/* Avatar 3 */}
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="Avatar 3"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            {/* Avatar 4 */}
            <img
              src="https://randomuser.me/api/portraits/men/35.jpg"
              alt="Avatar 4"
              className="absolute bottom-0 right-0 w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

/* Global animation styles injected once at render */
const GlobalStyles = () => (
  <style>{`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .section-hidden { opacity: 0; transform: translateY(30px); }
    .animate-fade-in-up { opacity: 1 !important; transform: translateY(0) !important; animation: fadeInUp 0.8s ease-out forwards; }
    .delay-0 { animation-delay: 0s; }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
  `}</style>
);

/* ===========================================================
 * Landing Page (MAIN)
 * =========================================================== */
const Landing = () => {
  // --- GSAP refs ---
  const scrollRowRef = useRef(null); // Scroll · Select · Hired row
  const heroVideoRef = useRef(null); // trigger element (video section)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // --- LENIS SMOOTH SCROLL INIT ---
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // GSAP time is in seconds, Lenis expects ms
    });
    gsap.ticker.lagSmoothing(0);

    // Clean up Lenis on unmount
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <div className="pt-20 min-h-screen relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 overflow-hidden flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative">
            {/* Profile Images */}
            <div className="flex items-center space-x-1 mb-6">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face"
                alt="Creative 1"
                className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                alt="Creative 2"
                className="w-12 h-12 rounded-full border-2 border-white shadow-sm -ml-2"
              />
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face"
                alt="Creative 3"
                className="w-12 h-12 rounded-full border-2 border-white shadow-sm -ml-2"
              />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              The Smarter Way to Hire Creative Talent.
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg">
              Welcome to HireCreatives—the world's first creative hiring
              platform where you scroll verified portfolios like a social feed,
              connect instantly, and hire the top 1% of talent.
            </p>

            <Link to="/discover">
              <button
                type="button"
                className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
              >
                <span>Explore Talent</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* Right Content - Creative Cards */}
          <div className="relative hidden lg:block">
            {/* Main Creative Card */}
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
                alt="Featured Creative"
                className="w-80 h-96 rounded-2xl object-cover shadow-xl"
              />
            </div>

            {/* Floating Message Cards */}
            <CreativeCard
              image="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face"
              name="Candy"
              role="Your Recruiter"
              message="Hey! We're ready to place Simon for your Video Editor Role!"
              className="absolute -top-4 -right-8 z-20"
            />

            <CreativeCard
              image="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face"
              name="Scale Chart"
              role=""
              message="Scale your team, scale your business"
              className="absolute bottom-20 -left-8 z-20 bg-teal-100"
            />

            {/* Second Creative Image */}
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face"
              alt="Creative 2"
              className="absolute bottom-0 right-12 w-64 h-80 rounded-2xl object-cover shadow-lg z-5"
            />
          </div>
        </div>

        {/* Scroll · Select · Hired  --- GSAP LIFT TARGET */}
        <div className="mt-16 lg:mt-24 w-full flex justify-center px-4">
          <div
            ref={scrollRowRef}
            className="scroll-select-card flex flex-row items-center justify-center gap-6 sm:gap-12 text-gray-800 flex-wrap
                       bg-white/90 backdrop-blur-md px-8 py-6 rounded-3xl border border-gray-200
                       shadow-md will-change-transform transform-gpu"
          >
            {/* Scroll */}
            <div className="flex flex-col items-center">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="6" y="2" width="12" height="20" rx="4" />
                <path
                  d="M12 17v-3m0 0l-1.5 1.5M12 14l1.5 1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="7" r="1" fill="currentColor" />
              </svg>
              <span className="font-bold text-lg sm:text-xl">Scroll</span>
            </div>

            <span className="text-2xl font-bold">·</span>

            {/* Select */}
            <div className="flex flex-col items-center">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M3 3l7 18 2-8 8-2L3 3z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-bold text-lg sm:text-xl">Select</span>
            </div>

            <span className="text-2xl font-bold">·</span>

            {/* Hired */}
            <div className="flex flex-col items-center">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12l-3 3a2 2 0 11-2.83-2.83L9.17 9l2.83 2.83zM12 12l3-3a2 2 0 012.83 2.83L14.83 15l-2.83-2.83z"
                />
              </svg>
              <span className="font-bold text-lg sm:text-xl">Hired</span>
            </div>
          </div>
        </div>
      </div>

      {/* HERO VIDEO SECTION (ScrollTrigger trigger) */}
      <HeroVideoSection ref={heroVideoRef} />

      {/* AUTO CAROUSEL SECTION */}
      <AutoCarousel />

      {/* PORTFOLIO VIDEO GRID */}
      <section
        id="explore"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Made with love, on HireCreatives
          </h2>
          <p className="mb-8 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Browse stunning portfolios from talented Creators, ready to bring
            your vision to life with exceptional creativity and professional
            excellence.
          </p>
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            View All Portfolios
          </button>
        </div>

        {/* 3x3 Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {portfolioItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex flex-col items-center"
            >
              <VideoCard src={item.video} poster={item.poster} />
              <span className="mt-3 text-base font-semibold text-gray-900 text-center">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ====== INSERTED MARKETING SECTIONS BEFORE FOOTER ====== */}
      <Unlock />
      <SmartFiltering />
      {/* <Screening /> */}
      {/* keep original #pricing anchor satisfied by a small wrapper */}
      <div id="pricing">
        <Pricing />
      </div>
      <DirectHiring />
      <Protection />
      <HowItWorks />
      <HireCreativesBenefits />

      {/* FOOTER SECTION */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-2xl font-bold">HireCreatives</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              The world's premier platform for connecting exceptional creative
              talent with innovative companies. Transform your projects with the
              power of creativity.
            </p>

            {/* Get Started Button with Link */}
            <Link to="/login">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 mx-auto shadow-xl hover:shadow-2xl transform hover:scale-105">
                <span>Get Started Today</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </footer>

      {/* Animation CSS */}
      <GlobalStyles />
    </div>
  );
};

export default Landing;
