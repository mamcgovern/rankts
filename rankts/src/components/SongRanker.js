import React, { useState } from 'react';
import Comparison from './Comparison';
import { ProgressBar, Button } from 'react-bootstrap';

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

  // FINAL RANKING: compact, no videos
  if (!currentSong && rankedSongs.length === songs.length) {
    return (
      <div>
        <h3 className="mb-3 text-center">Final Ranking</h3>
        <ul className="list-group">
          {rankedSongs.map((song, i) => (
            <li 
              key={song.id} 
              className="list-group-item d-flex justify-content-between align-items-center py-1 px-2"
            >
              <span>{i + 1}. {song.title}</span>
            </li>
          ))}
        </ul>
        <div className="text-center mt-3">
          <button className="btn btn-sm btn-secondary" onClick={() => window.location.reload()}>
            Restart
          </button>
        </div>
      </div>
    );
  }

  // START BUTTON PAGE
  if (!currentSong || !comparingTo) {
    return (
      <div className="text-center">
        <Button onClick={startComparison}>Start Ranking</Button>
      </div>
    );
  }

  // COMPARISON PAGE
  const progressPercent = Math.round(
    ((songs.length - unrankedSongs.length) / songs.length) * 100
  );

  return (
    <div>
      <ProgressBar now={progressPercent} label={`${progressPercent}%`} className="mb-3" />
      <Comparison songA={currentSong} songB={comparingTo} onSelect={handleChoice} />
    </div>
  );
}
