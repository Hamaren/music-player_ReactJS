//import './App.css';
//import counterChange from './actions/controls'
import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import Player from './components/Player'

function App() {
  // const counter = useSelector(state => state.controlReducer.counter);
  // const dispatch = useDispatch();

  return (
    <div className="App">
      <Player />
      {/*<header className="App-header">*/}
      {/*  <h1>Counter: {counter}</h1>*/}
      {/*  <button onClick={()=> dispatch(counterChange('INCREMENT'))}>Increment</button>*/}
      {/*  <button onClick={()=> dispatch(counterChange('DECREMENT'))}>Decrement</button>*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
