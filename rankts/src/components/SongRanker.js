import React, { useState } from 'react';
import Comparison from './Comparison';

export default function SongRanker({ songs }) {
  const [rankedSongs, setRankedSongs] = useState([]);
  const [unrankedSongs, setUnrankedSongs] = useState([...songs]);
  const [currentSong, setCurrentSong] = useState(null);
  const [comparisonIndex, setComparisonIndex] = useState(0);
  const [comparingTo, setComparingTo] = useState(null);

  const startComparison = () => {
    if (rankedSongs.length === 0) {
      const [first, ...rest] = unrankedSongs;
      setRankedSongs([first]);
      setUnrankedSongs(rest);

      const [next, ...rest2] = rest;
      setCurrentSong(next);
      setUnrankedSongs(rest2);
      setComparisonIndex(0);
      setComparingTo(first);
    }
  };

  const handleChoice = (choice) => {
    if (!currentSong || !comparingTo) return;

    if (choice === 'current') {
      const newRanked = [
        ...rankedSongs.slice(0, comparisonIndex),
        currentSong,
        ...rankedSongs.slice(comparisonIndex),
      ];
      setRankedSongs(newRanked);
      moveToNextSong(newRanked);
    } else if (comparisonIndex + 1 < rankedSongs.length) {
      setComparisonIndex(comparisonIndex + 1);
      setComparingTo(rankedSongs[comparisonIndex + 1]);
    } else {
      const newRanked = [...rankedSongs, currentSong];
      setRankedSongs(newRanked);
      moveToNextSong(newRanked);
    }
  };

  const moveToNextSong = (updatedRanked) => {
    if (unrankedSongs.length === 0) {
      setCurrentSong(null);
      setComparingTo(null);
      return;
    }

    const [next, ...rest] = unrankedSongs;
    setCurrentSong(next);
    setUnrankedSongs(rest);
    setComparisonIndex(0);
    setComparingTo(updatedRanked[0]);
  };

  // Render final ranking
  if (!currentSong && rankedSongs.length === songs.length) {
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

  // Before starting
  if (!currentSong || !comparingTo) {
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
      <p className="mb-2 text-gray-600">
        {songs.length - unrankedSongs.length} / {songs.length} songs ranked
      </p>
      <Comparison songA={currentSong} songB={comparingTo} onSelect={handleChoice} />
    </div>
  );
}
