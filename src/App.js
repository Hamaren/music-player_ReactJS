import React from 'react';
import Player from './components/Player/Player';
import PlayList from "./components/PlayList/PlayList";
import './style.scss';

function App() {
  return (
    <div className="app">
      <Player />
      <PlayList />
    </div>
  );
}

export default App;
