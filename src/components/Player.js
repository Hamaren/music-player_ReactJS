import {useSelector, useDispatch} from "react-redux";
import {play, prev, next} from '../redux/actions/controls';
import {useState, useEffect, useRef} from 'react';

function Player(){
  const [volume, setVolume] = useState(1);
  const [loop, setLoop] = useState(false);
  const playStatus = useSelector(state => state.control.isPlaying);
  const currentSongIndex = useSelector(state => state.control.currentSongIndex);
  const currentSong = useSelector(state => state.playList.songs[currentSongIndex]);
  const songsLength = useSelector(state => state.playList.songs.length);
  const dispatch = useDispatch();
  const audioEl = useRef(null);

  const playEnd = ()=> {
    if(loop){
      audioEl.current.currentTime = 0;
      audioEl.current.play();
      return
    }
    if(currentSongIndex < songsLength - 1){
      dispatch(next(songsLength));
    } else{
      dispatch(play());
      dispatch(next(songsLength));
    }
  };

  const loopHandler = ()=>{
    setLoop(!loop);
  };

  const volumeHandler = (value)=>{
    setVolume(prev =>{
      if(value){
        if(prev + 0.11 > 1){
          return 1;
        } else return prev + 0.11;
      } else{
        if(prev - 0.11 < 0){
          return 0;
        } else return prev - 0.11;
      }
    });
  };

  useEffect(() =>{
    audioEl.current.volume = volume;
  }, [volume]);

  useEffect(() =>{
    if(playStatus){
      audioEl.current.play();

    } else{
      audioEl.current.pause();
    }
  }, [playStatus, currentSongIndex]);

  useEffect(()=>{
    audioEl.current.addEventListener('ended', playEnd);

    return ()=>{
      audioEl.current.removeEventListener('ended', playEnd);
    }
  });

  return(
    <div className="player">
      <audio ref={audioEl} src={currentSong}></audio>
      <h1>{volume}</h1>
      <div className="preference">
        <label>Loop</label>
        <input type="checkbox" onChange={()=>loopHandler()} />
      </div>
      <div>
        <button onClick={()=> volumeHandler()}>-</button>
        <button onClick={()=> volumeHandler(true)}>+</button>
      </div>
      <div>
        <button onClick={()=> dispatch(prev(songsLength))}>Prev</button>
        <button onClick={()=> dispatch(play())}>Play</button>
        <button onClick={()=> dispatch(next(songsLength))}>Next</button>
      </div>
    </div>
  )
}

export default Player;