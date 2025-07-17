// src/data/portfolioItems.js
import { VIDEO_SOURCES } from "./videos";
import { POSTER } from "./posters";

// 3x3 grid data map used in <PortfolioGrid />
export const portfolioItems = [
  { name: "Video Editor",          video: VIDEO_SOURCES.flower,    poster: POSTER.editor },
  { name: "Graphic Designer",      video: VIDEO_SOURCES.bunny,     poster: POSTER.designer },
  { name: "Social Media Manager",  video: VIDEO_SOURCES.bear,      poster: POSTER.manager },
  { name: "Motion Graphics Artist",video: VIDEO_SOURCES.sample5s,  poster: POSTER.motion },
  { name: "Copywriter",            video: VIDEO_SOURCES.sample10s, poster: POSTER.copywriter },
  { name: "Creative Director",     video: VIDEO_SOURCES.ocean,     poster: POSTER.director },
  { name: "UI/UX Designer",        video: VIDEO_SOURCES.city,      poster: POSTER.ui },
  { name: "Photographer",          video: VIDEO_SOURCES.forest,    poster: POSTER.photographer },
  { name: "CGI/VFX Artist",        video: VIDEO_SOURCES.night,     poster: POSTER.vfx },
];