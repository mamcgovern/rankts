import React from 'react';
import SongRanker from './components/SongRanker';
import songs from './data/songs.json';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">🎵 Song Ranker</h1>
      <SongRanker songs={songs} />
    </div>
  );
}
