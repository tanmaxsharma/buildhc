// src/components/VideoCard.jsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import clsx from "clsx"; // optional; install or remove usage below

/**
 * VideoCard
 * Autoplay muted inline, pauses when out of view (IO threshold ~0.4).
 * Manual click toggle overrides auto until user pauses again.
 */
export const VideoCard = ({ src, poster, label, className }) => {
  const vidRef = useRef(null);
  const [errored, setErrored] = useState(false);
  const [manuallyPlaying, setManuallyPlaying] = useState(false);

  // Try playing (ignores autoplay reject silently)
  const tryPlay = useCallback(() => {
    const el = vidRef.current;
    if (!el) return;
    const p = el.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        // Autoplay blocked; wait for user interaction.
      });
    }
  }, []);

  useEffect(() => {
    const el = vidRef.current;
    if (!el) return;

    // Attempt play on mount
    tryPlay();

    // Observe viewport visibility
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!el) return;
          if (manuallyPlaying) return; // user override
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [manuallyPlaying, tryPlay]);

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
      className={clsx(
        "relative rounded-xl overflow-hidden group cursor-pointer aspect-square transition-all duration-300 hover:scale-105",
        className
      )}
      onClick={handleToggle}
    >
      {errored ? (
        <img
          src={poster}
          alt={label}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <video
          ref={vidRef}
          src={src}
          poster={poster}
          preload="metadata"
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

      {/* Category label */}
      <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1.5 rounded-full text-white text-sm font-semibold shadow-lg">
        {label}
      </div>

      {/* Play icon (only show hover if not errored) */}
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

export default VideoCard;
