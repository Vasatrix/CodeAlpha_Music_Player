import React, { useState, useRef, useEffect } from "react";
import SongDetails from "./SongDetails";
import Controls from "./Controls";
import Playlist from "./Playlist";
import tamilSongs from "../data/tamilSongs";

const AudioPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.addEventListener("timeupdate", updateProgress);
      audioRef.current.addEventListener("loadedmetadata", loadMetadata);
      audioRef.current.addEventListener("ended", skipNext);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
        audioRef.current.removeEventListener("loadedmetadata", loadMetadata);
        audioRef.current.removeEventListener("ended", skipNext);
      }
    };
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.error("Audio playback issue:", err);
      });
    }
  }, [currentSongIndex, isPlaying]);

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const loadMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % tamilSongs.length);
    setIsPlaying(true);
  };

  const skipPrev = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + tamilSongs.length) % tamilSongs.length
    );
    setIsPlaying(true);
  };

  const selectSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-96">
      <SongDetails song={tamilSongs[currentSongIndex]} />
      <Controls
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        skipNext={skipNext}
        skipPrev={skipPrev}
        audioRef={audioRef}
        progress={progress}
        setSeekTime={(time) => (audioRef.current.currentTime = time)}
        volume={volume}
        setVolume={setVolume}
        currentTime={currentTime}
        duration={duration}
      />
      <audio ref={audioRef} src={tamilSongs[currentSongIndex]?.src} />
      <Playlist songs={tamilSongs} selectSong={selectSong} />
    </div>
  );
};

export default AudioPlayer;
