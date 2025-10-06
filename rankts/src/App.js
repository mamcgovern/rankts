import React from 'react';
import SongRanker from './components/SongRanker';
import songs from './data/songs.json';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Rank the Songs</h1>
      <SongRanker songs={songs} />
    </div>
  );
}

export default App;
