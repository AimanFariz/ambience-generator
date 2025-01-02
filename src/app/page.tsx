'use client';

import { useState, useEffect, useRef } from 'react';

const Page = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get settings (sound and play state) from background.js when page loads
  useEffect(() => {
    chrome.runtime.sendMessage({ action: 'getSettings' }, (response) => {
      if (response) {
        setIsPlaying(response.isPlaying);
        // Optionally, update the audio source here based on `response.sound`
      }
    });
  }, []);

  // Toggle the sound state (play/pause)
  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);

      // Notify background.js of the state change (play/pause)
      chrome.runtime.sendMessage({ action: 'toggleSound' }, (response) => {
        setIsPlaying(response.isPlaying);
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Ambient Noise Generator</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={toggleSound}
      >
        {isPlaying ? 'Stop Sound' : 'Play Sound'}
      </button>

      {/* Audio element for ambient sound */}
      <audio ref={audioRef} loop>
        <source src="/sounds/Anime.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Page;
