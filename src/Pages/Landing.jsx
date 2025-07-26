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
  // hero: "https://res.cloudinary.com/dhtp47auy/video/upload/v1753077039/reel_uadkgg.mp4", // Hero video
};

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
  // {
  //   name: "Motion Graphics Artist",
  //   video: VIDEO_SOURCES.sample5s,
  //   poster: POSTER.motion,
  // },
  // {
  //   name: "Copywriter",
  //   video: VIDEO_SOURCES.sample10s,
  //   poster: POSTER.copywriter,
  // },
  // {
  //   name: "Creative Director",
  //   video: VIDEO_SOURCES.ocean,
  //   poster: POSTER.director,
  // },
  // { name: "UI/UX Designer", video: VIDEO_SOURCES.city, poster: POSTER.ui },
  // {
  //   name: "Photographer",
  //   video: VIDEO_SOURCES.forest,
  //   poster: POSTER.photographer,
  // },
  // { name: "CGI/VFX Artist", video: VIDEO_SOURCES.night, poster: POSTER.vfx },
];

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
    </section>
  );
});
HeroVideoSection.displayName = "HeroVideoSection";

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

const Unlock = () => {
  const addToRefs = useScrollAnimation();

  return (
    <Section id="unlock-elite">
      <div className="grid md:grid-cols-2 gap-12 items-stretch">
        {/* Left Content */}
        <div
          ref={addToRefs}
          className="section-hidden order-2 md:order-1 flex flex-col justify-center h-full px-4 max-w-2xl mx-auto"
        >
          <div>
            <p className="text-indigo-600 font-semibold text-2xl mb-2">
              Elite Talent
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Unlock Elite Creatives, Effortlessly
            </h2>
            <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-8">
              Browse authentic portfolios in an addictive, TikTok-style <br />{" "}
              feed see real projects, not just resumes.
            </p>

            <ul className="space-y-5 text-gray-800 text-lg">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-indigo-600 mt-1" />
                <span>Authentic project reels & case studies.</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-indigo-600 mt-1" />
                <span>Instant messaging & booking.</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-indigo-600 mt-1" />
                <span>Global talent, localized budgets.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Image */}
        <div
          ref={addToRefs}
          className="section-hidden order-1 md:order-2 flex items-center justify-center h-full max-w-2xl mx-auto"
        >
          <img
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1470&q=80"
            alt="Portfolio grid demo"
            className="w-full rounded-2xl shadow-xl ring-1 ring-gray-200 object-cover"
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
      <div className="grid md:grid-cols-2 gap-12 items-stretch">
        {/* Left Image */}
        <div
          ref={addToRefs}
          className="section-hidden order-1 md:order-1 flex items-center justify-center h-full max-w-2xl mx-auto"
        >
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1470&q=80"
            alt="Talent filtering UI"
            className="w-full rounded-2xl shadow-xl ring-1 ring-gray-200 object-cover"
          />
        </div>

        {/* Right Content */}
        <div
          ref={addToRefs}
          className="section-hidden order-2 md:order-2 flex flex-col justify-center h-full px-4 max-w-2xl mx-auto"
        >
          <div>
            {/* Enhanced Kicker */}
            <p className="text-indigo-600 font-semibold text-2xl mb-2">
              Search & Match
            </p>

            {/* Main Title */}
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Find Talent Your Way
            </h2>

            {/* Subtitle */}
            <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-8">
              Sort instantly by skills, price, and availability to match your
              needs and budget — with zero hidden costs.
            </p>

            {/* Feature Chips */}
            <div className="flex flex-wrap gap-4">
              <FilterChip icon={<Filter />} label="Skill" />
              <FilterChip icon={<DollarSign />} label="Budget" />
              <FilterChip icon={<Timer />} label="Availability" />
              <FilterChip icon={<Globe2 />} label="Location" />
            </div>
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

// Header #Pricing
const Pricing = () => {
  const addToRefs = useScrollAnimation();
  return (
    <Section id="pricing-details" className="bg-gray-50 py-16">
      <div className="flex flex-col items-center">
        {/* Top SectionHeader */}
        <div ref={addToRefs} className="section-hidden text-center mb-8">
          <p className="text-indigo-600 font-semibold text-2xl mb-2">Pricing</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            Transparent, Simple Pricing. No Guesswork.
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-xl mx-auto">
            No hidden markups. Know exactly what you pay before you hire.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-6 grid w-full max-w-4xl gap-6 md:grid-cols-2">
          {/* Card 1 */}
          <div
            ref={addToRefs}
            className="section-hidden border rounded-2xl p-6 md:p-8 bg-white shadow-sm flex flex-col items-center text-center"
          >
            <img
              src="https://res.cloudinary.com/dhtp47auy/image/upload/v1753368860/undraw_remote-worker_0l91_nqfawq.svg"
              alt="Remote Worker"
              className="w-32 h-32 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">
              Clear Placement Fee
            </h3>
            <p className="text-indigo-600 font-medium mt-1 mb-4">
              Just 1 month of candidate's annual salary.
            </p>
            <ul className="flex flex-col gap-2 mt-auto">
              {[
                "Upfront & visible on profile",
                "Due at hiring",
                "One-time fee",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-center text-gray-700"
                >
                  <span className="text-indigo-600 mr-2">✔️</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 */}
          <div
            ref={addToRefs}
            className="section-hidden border rounded-2xl p-6 md:p-8 bg-white shadow-sm flex flex-col items-center text-center"
          >
            <img
              src="https://res.cloudinary.com/dhtp47auy/image/upload/v1753368859/undraw_screen-time_f7ev_fpbmrz.svg"
              alt="Screen Time"
              className="w-32 h-32 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">
              Low Monthly Maintenance
            </h3>
            <p className="text-indigo-600 font-medium mt-1 mb-4">
              Flat support + payroll management.
            </p>
            <ul className="flex flex-col gap-2 mt-auto">
              {[
                "Ongoing talent support",
                "Secure payments",
                "Issue resolution",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-center text-gray-700"
                >
                  <span className="text-indigo-600 mr-2">✔️</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

const DirectHiring = () => {
  const addToRefs = useScrollAnimation();

  return (
    <div className="bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            ref={addToRefs}
            className="section-hidden space-y-10 text-left pr-4 max-w-2xl"
          >
            {/* Main Heading */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Hire top creatives fast <br /> and transparently.
              </h1>
              <p className="text-gray-600 mt-3 text-lg leading-relaxed">
                Scroll real portfolios, connect instantly, and hire the top 1%{" "}
                <br />
                of creative talent with zero hassle.
              </p>
            </div>

            {/* Direct Hiring Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Direct Hiring. Zero Middlemen.
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Skip agencies and recruiters—your budget goes straight to the{" "}
                <br />
                experts who deliver the work.
              </p>
            </div>

            {/* Transparent Pricing Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Transparent, Simple Pricing.
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                One upfront placement fee plus a low monthly charge <br />
                no hidden costs, no guesswork.
              </p>
            </div>

            {/* Expertly Trained Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Vetted & Expertly Trained.
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Every creative is tested for quality, speed, English fluency,
                and <br />
                attention to detail.
              </p>
            </div>
          </div>

          {/* Right Content - Images and Stats Grid */}
          <div
            ref={addToRefs}
            className="section-hidden grid grid-cols-2 gap-4 max-w-2xl"
          >
            {/* First Image */}
            <div className="col-span-2 rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?q=80&w=1170&auto=format&fit=crop"
                alt="Professional working on laptop"
                className="w-full h-72 object-cover"
              />
            </div>

            {/* Top Stat */}
            <div className="bg-cyan-300 rounded-3xl p-6 shadow">
              <div className="text-4xl font-bold text-gray-900 mb-1">70%</div>
              <p className="text-sm text-gray-800 font-medium">
                Average savings on creative costs with global top talent
              </p>
            </div>

            {/* Middle Stat */}
            <div className="bg-green-300 rounded-3xl p-6 shadow">
              <div className="text-4xl font-bold text-gray-900 mb-1">07d</div>
              <p className="text-sm text-gray-800 font-medium">
                Avg. time to hire top 1% creatives ready to work
              </p>
            </div>

            {/* Bottom Stat */}
            <div className="bg-purple-300 rounded-3xl p-6 shadow col-span-2 sm:col-span-1">
              <div className="text-4xl font-bold text-gray-900 mb-1">4%</div>
              <p className="text-sm text-gray-800 font-medium">
                Replacement rate — expertly vetted talent you can trust
              </p>
            </div>

            {/* Second Image */}
            <div className="rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581368121163-0d9c85127cdd?q=80&w=1170&auto=format&fit=crop"
                alt="Professional in workspace"
                className="w-full h-36 object-cover"
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
  <div className="group flex flex-col h-full p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1">
    <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white group-hover:scale-105 transition-transform">
      {icon}
    </div>
    <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm leading-relaxed flex-grow">{desc}</p>
    {/* Optional: add a call to action or footer if needed */}
  </div>
);

const Protection = () => {
  const addToRefs = useScrollAnimation();

  return (
    <Section
      id="protection-rights"
      className="bg-gradient-to-b from-gray-50 via-white to-gray-100 py-20"
    >
      <div className="flex flex-col items-center">
        {/* Header */}
        <div ref={addToRefs} className="section-hidden text-center mb-8">
          <p className="text-indigo-600 font-semibold text-2xl mb-2">Trust</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            Your Rights & Results, Always Protected
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-xl mx-auto">
            Robust agreements, secure IP, and ongoing partnership from
            onboarding through delivery.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-16 grid w-full max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4 items-stretch">
          <div ref={addToRefs} className="section-hidden h-full">
            <ProtectionCard
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Rock-Solid Contracts"
              desc="IP & deliverables secured in legally reviewed agreements."
            />
          </div>

          <div ref={addToRefs} className="section-hidden h-full">
            <ProtectionCard
              icon={<FileCheck2 className="h-6 w-6" />}
              title="Clear Deliverables"
              desc="Milestone-based work tracking & acceptance."
            />
          </div>

          <div ref={addToRefs} className="section-hidden h-full">
            <ProtectionCard
              icon={<Settings className="h-6 w-6" />}
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
        <div ref={addToRefs} className="section-hidden text-center mb-8">
          <p className="text-indigo-600 font-semibold text-2xl mb-2">Process</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            How HireCreatives Works
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-xl mx-auto">
            Three simple steps from discovery to done.
          </p>
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
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            Only the Top 1% <br /> Make the Cut
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
      {/* HERO SECTION */}
      <div className="pt-20 pb-20 sm:pb-0 min-h-screen relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative order-2 lg:order-1 text-center lg:text-left">
            {/* Profile Images */}
            <div className="flex justify-center lg:justify-start items-center space-x-1 mb-6">
              {/* ... same image tags */}
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face"
                alt="Creative 1"
                className="w-12 h-12 rounded-full border-2 border-gray-700 shadow-sm"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                alt="Creative 2"
                className="w-12 h-12 rounded-full border-2 border-gray-700 shadow-sm -ml-2"
              />
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face"
                alt="Creative 3"
                className="w-12 h-12 rounded-full border-2 border-gray-700 shadow-sm -ml-2"
              />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              The Smarter Way to Hire Creative Talent.
            </h1>

            <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
              Scroll. Select. Hired
            </h3>

            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              Welcome to HireCreatives—the world's first creative hiring
              platform where you scroll verified portfolios like a social feed,
              connect instantly, and hire the top 1% of talent.
            </p>

            <Link to="/discover">
              <button
                type="button"
                className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer mx-auto lg:mx-0"
              >
                <span>Explore Talent</span>
                <ArrowRight className="w-5 h-5 mb" />
              </button>
            </Link>
          </div>

          {/* Right Content - iPhone Mockup with Video Inside */}
          <div className="relative flex justify-center lg:justify-end pr-0 lg:pr-12 order-1 lg:order-2 mt-16 sm:mt-0">
            <div className="relative w-[250px] sm:w-[280px] lg:w-[300px] h-[500px] sm:h-[550px] lg:h-[600px] flex items-center justify-center scale-90 sm:scale-100">
              {/* iPhone Frame */}
              <div className="absolute top-0 left-0 w-full h-full rounded-[3rem] border-[14px] border-black bg-black shadow-2xl z-10" />

              {/* Notch */}
              <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[90px] sm:w-[120px] h-[30px] bg-black rounded-b-[1.5rem] z-20" />

              {/* Video inside screen */}
              <div className="w-[222px] sm:w-[252px] lg:w-[272px] h-[472px] sm:h-[522px] lg:h-[572px] rounded-[2rem] overflow-hidden z-30">
                <video
                  src="https://res.cloudinary.com/dhtp47auy/video/upload/v1753077039/reel_uadkgg.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HERO VIDEO SECTION (ScrollTrigger trigger) */}
      {/* <HeroVideoSection ref={heroVideoRef} /> */}

      {/* PORTFOLIO VIDEO GRID */}
      <section
        id="explore"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Discover Our Top Talent
          </h2>
          <p className="mb-8 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Browse stunning portfolios from talented Creators, ready to bring
            your vision to life with exceptional creativity and professional
            excellence.
          </p>
          {/* <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            View All Portfolios
          </button> */}
        </div>

        {/* 3x3 Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {portfolioItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex flex-col items-center"
            >
              <VideoCard src={item.video} poster={item.poster} />
              <span className="mt-3 text-2xl font-semibold text-gray-900 text-center">
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
