import React from "react";
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiVolume2 } from "react-icons/fi";

const Controls = ({
  isPlaying,
  togglePlayPause,
  skipNext,
  skipPrev,
  audioRef,
  progress,
  setSeekTime,
  volume,
  setVolume,
  currentTime,
  duration,
}) => {
  // Format seconds to MM:SS format
  const formatTime = (time) => {
    if (!time) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    setSeekTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Playback Controls */}
      <div className="flex justify-around items-center">
        <FiSkipBack size={30} className="cursor-pointer hover:text-indigo-400" onClick={skipPrev} />

        {isPlaying ? (
          <FiPause size={40} className="cursor-pointer text-indigo-400" onClick={togglePlayPause} />
        ) : (
          <FiPlay size={40} className="cursor-pointer text-indigo-400" onClick={togglePlayPause} />
        )}

        <FiSkipForward size={30} className="cursor-pointer hover:text-indigo-400" onClick={skipNext} />
      </div>

      {/* Seek Bar with Time Info */}
      <div className="flex justify-between text-gray-400 text-sm">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <input type="range" className="w-full cursor-pointer" value={progress} onInput={handleSeek} />

      {/* Volume Control with Percentage */}
      <div className="flex items-center gap-2">
        <FiVolume2 size={24} />
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
        <span className="text-sm text-gray-400">{Math.round(volume * 100)}%</span>
      </div>
    </div>
  );
};

export default Controls;
