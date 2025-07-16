import React from "react";

function ReelCard({ name, title, videoUrl }) {
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
      <div className="absolute bottom-20 left-4 z-10 text-white">
        <h2 className="text-lg font-bold">@{name}</h2>
        <p className="text-sm">{title}</p>
      </div>
    </div>
  );
}

export default ReelCard;
