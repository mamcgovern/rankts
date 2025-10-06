import React, { useState, useEffect } from "react";
import Comparison from "./Comparison";
import FinalRanking from "./FinalRanking";

const SongRanker = ({ songs }) => {
  const [sortedSongs, setSortedSongs] = useState([]);
  const [unsortedSongs, setUnsortedSongs] = useState([...songs]);
  const [currentSong, setCurrentSong] = useState(null);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [mid, setMid] = useState(0);
  const [insertionActive, setInsertionActive] = useState(false);
  const [started, setStarted] = useState(false);

  // Start insertion when ranking begins
  useEffect(() => {
    if (started && unsortedSongs.length > 0 && !insertionActive) {
      startInsertion(unsortedSongs[0]);
    }
  }, [unsortedSongs, insertionActive, started]);

  const startInsertion = (song) => {
    if (sortedSongs.length === 0) {
      setSortedSongs([song]);
      setUnsortedSongs(unsortedSongs.slice(1));
    } else {
      setCurrentSong(song);
      setLeft(0);
      setRight(sortedSongs.length - 1);
      setMid(Math.floor((0 + sortedSongs.length - 1) / 2));
      setInsertionActive(true);
    }
  };

  const handleSelect = (choice) => {
    let newLeft = left;
    let newRight = right;
    let newMid = mid;

    if (choice === "A") {
      // Current song wins → go left
      newRight = mid - 1;
    } else {
      // Current song loses → go right
      newLeft = mid + 1;
    }

    if (newLeft > newRight) {
      const newSorted = [
        ...sortedSongs.slice(0, newLeft),
        currentSong,
        ...sortedSongs.slice(newLeft),
      ];
      setSortedSongs(newSorted);
      setUnsortedSongs(unsortedSongs.slice(1));
      setInsertionActive(false);
      setCurrentSong(null);
    } else {
      newMid = Math.floor((newLeft + newRight) / 2);
      setLeft(newLeft);
      setRight(newRight);
      setMid(newMid);
    }
  };

  // Show “Start Now” button
  if (!started) {
    return (
      <div style={{ width: "100%", textAlign: "center", marginTop: "2rem" }}>
        <h2>Ready to rank the songs?</h2>
        <button
          className="btn btn-success"
          onClick={() => setStarted(true)}
        >
          Start Now
        </button>
      </div>
    );
  }

  // All songs ranked → show final list
  if (unsortedSongs.length === 0 && !insertionActive) {
    return <FinalRanking sortedSongs={sortedSongs} />;
  }

  // During insertion → show “this or that” comparison
  if (currentSong) {
    return (
      <Comparison
        songA={currentSong}
        songB={sortedSongs[mid]}
        onSelect={handleSelect}
      />
    );
  }

  return null;
};

export default SongRanker;
