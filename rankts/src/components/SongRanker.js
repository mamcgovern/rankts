import React, { useState } from 'react';
import Comparison from './Comparison.js';

export default function SongRanker({ songs }) {
  const [rankedSongs, setRankedSongs] = useState([]);
  const [unrankedSongs, setUnrankedSongs] = useState([...songs]);
  const [comparisonIndex, setComparisonIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(unrankedSongs.shift());
  const [comparingTo, setComparingTo] = useState(null);

  const startComparison = () => {
    if (rankedSongs.length === 0) {
      setRankedSongs([currentSong]);
      setCurrentSong(unrankedSongs.shift());
    } else {
      setComparisonIndex(0);
      setComparingTo(rankedSongs[0]);
    }
  };

  const handleChoice = (choice) => {
    if (!comparingTo) return;

    const newIndex = comparisonIndex + 1;

    if (choice === 'current') {
      rankedSongs.splice(comparisonIndex, 0, currentSong);
      setRankedSongs([...rankedSongs]);
      moveToNextSong();
    } else if (newIndex < rankedSongs.length) {
      setComparisonIndex(newIndex);
      setComparingTo(rankedSongs[newIndex]);
    } else {
      rankedSongs.push(currentSong);
      setRankedSongs([...rankedSongs]);
      moveToNextSong();
    }
  };

  const moveToNextSong = () => {
    if (unrankedSongs.length === 0) {
      setCurrentSong(null);
      setComparingTo(null);
      return;
    }
    setCurrentSong(unrankedSongs.shift());
    setComparisonIndex(0);
    setComparingTo(rankedSongs[0]);
  };

  if (!currentSong) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Final Ranking</h2>
        <ol className="list-decimal text-left inline-block">
          {rankedSongs.map((song) => (
            <li key={song.id}>{song.title}</li>
          ))}
        </ol>
      </div>
    );
  }

  if (!comparingTo) {
    return (
      <div className="text-center">
        <p className="mb-4">Ready to start ranking?</p>
        <button
          onClick={startComparison}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Comparison songA={currentSong} songB={comparingTo} onSelect={handleChoice} />
    </div>
  );
}
