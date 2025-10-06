import React from 'react';
import SongRanker from './components/SongRanker';
import songs from './data/songs.json';
import './App.css';


export default function App() {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 mb-3">🎵 Song Ranker</h1>
      <p className="lead mb-5">
        Rank your favorite songs using “This or That” comparisons!
      </p>
      <SongRanker songs={songs} />
    </div>
  );
}
