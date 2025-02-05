import React from "react";
import { motion } from "framer-motion";

const Playlist = ({ songs, selectSong }) => {
  return (
    <motion.div
      className="mt-4 bg-gray-800 p-4 rounded-lg max-h-48 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <h3 className="text-lg font-bold mb-2">Playlist</h3>
      <ul>
        {songs.map((song, index) => (
          <motion.li
            key={song.id}
            className="flex justify-between items-center py-2 cursor-pointer hover:bg-indigo-600 rounded-md px-2"
            onClick={() => selectSong(index)}
            whileHover={{ scale: 1.02 }}
          >
            <span>{song.title}</span>
            <small className="text-gray-400">{song.artist}</small>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Playlist;
