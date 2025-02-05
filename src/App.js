import React from "react";
import AudioPlayer from "./components/AudioPlayer";
import "./styles/globals.css";
import './App.css';


function App() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-between text-white p-4">
      {/* Page Title */}
      <header>
        <h1 className="text-4xl font-bold text-indigo-400 mt-4">MUSIC PLAYER</h1>
      </header>

      {/* Audio Player Component */}
      <main className="flex-grow flex justify-center items-center">
        <AudioPlayer />
      </main>

      {/* Footer with Copyright */}
      <footer className="mt-4">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Designed by Vasanth Kumar S
        </p>
      </footer>
    </div>
  );
}

export default App;

