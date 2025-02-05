import React from "react";

const SongDetails = ({ song }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">{song.title}</h2>
      <p className="text-sm text-gray-400">{song.artist}</p>
    </div>
  );
};

export default SongDetails;

