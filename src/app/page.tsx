// app/page.tsx
'use client';

import { useState, useRef } from 'react';

const Page = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); // Pause the sound
      } else {
        audioRef.current.play(); // Play the sound
      }
      setIsPlaying(!isPlaying);
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
        <source src="/rain-sound.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Page;
