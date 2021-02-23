import {getTimeTrack} from '../../functions';
import {useSelector, useDispatch} from 'react-redux';
import {play, prev, next} from '../../redux/actions/controls';
import {useState, useEffect, useRef} from 'react';
import Controls from "../Controls/Controls";
import './style.scss';

function Player() {
  const audioEl = useRef(null);
  const progressBar = useRef(null);
  const [volume, setVolume] = useState(0.6);
  const [trackDuration, setTrackDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [progressStep, setProgressStep] = useState(null);
  const [loop, setLoop] = useState(false);
  const [timeLast, setTimeLast] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const isPlaying = useSelector(state => state.control.isPlaying);
  const currentSongIndex = useSelector(state => state.control.currentSongIndex);
  const currentSong = useSelector(state => state.playList.songs[currentSongIndex]);
  const songsLength = useSelector(state => state.playList.songs.length);
  const dispatch = useDispatch();

  //Event functions
  const metaLoaded = ()=>{
    setTrackDuration(audioEl.current.duration);
    setProgressStep(trackDuration / 100);
  };

  const playEnd = () => {
    if (loop) {
      audioEl.current.currentTime = 0;
      audioEl.current.play();
      return
    }
    if (currentSongIndex < songsLength - 1) {
      dispatch(next(songsLength));
      progressBar.current.value = 0;
    } else {
      dispatch(play());
      dispatch(next(songsLength));
      setCurrentTime(getTimeTrack(audioEl.current.currentTime));
      progressBar.current.value = 0;
    }
  };

  //Handlers
  const volumeHandler = (e)=>{
    setVolume(e.target.value / 100);
  };
  const progressHandler = (e) =>{
    setProgress(e.target.value);
  };

  // const forwardHandler = (e)=>{
  //   metaLoaded();
  //   if(progress >= trackDuration){
  //     setProgress(0)
  //   } else{
  //     setProgress(progress + 1)
  //   }
  //   console.log(progress);
  //   //console.log(progressStep);
  //
  // };

  //Effects
  useEffect(()=>{
    const audio = audioEl.current;
    audio.addEventListener('loadedmetadata', metaLoaded);
    return ()=>{
      audio.removeEventListener('loadedmetadata', metaLoaded);
    }
  }, [currentSongIndex]);

  useEffect(()=>{
    if(isPlaying){
      const interval = setInterval(()=>{
        progressBar.current.value = audioEl.current.currentTime;
      }, 1000);
      return ()=>{
        clearInterval(interval);
      }
    }
  }, [isPlaying, currentSongIndex]);

  useEffect(()=>{
    audioEl.current.currentTime = progress;
  }, [progress]);

  useEffect(()=>{
    if(isPlaying){
      const interval = setInterval(()=>{
        if(timeLast){
          setCurrentTime(getTimeTrack(trackDuration - audioEl.current.currentTime))
        } else{
          setCurrentTime(getTimeTrack(audioEl.current.currentTime));
        }
      }, 1000);

      return ()=> {
        clearInterval(interval);
      };
    }
  }, [isPlaying, timeLast]);

  useEffect(() => {
    audioEl.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  }, [isPlaying, currentSongIndex]);

  useEffect(() => {
    const audio = audioEl.current;
    audio.addEventListener('ended', playEnd);
    return () => {
      audio.removeEventListener('ended', playEnd);
    }
  });

  return (
    <div className="player">
      <audio ref={audioEl} src={currentSong} />
      <div className="player__first-line">
        <div className="track-counter">{currentTime}</div>
        <div className="volume-changer">
          <label htmlFor="volume">Volume</label>
          <input type="range" id="volume" name="volume"
                 min="0" max="100" defaultValue={volume * 100} onChange={(e)=>{volumeHandler(e)}} />
        </div>
      </div>
      <div className="settings">
        <div className="settings__wrapper">
          <input id="loop" className="ios-switch" defaultChecked={loop} type="checkbox" onChange={()=>setLoop(!loop)}/>
          <label htmlFor="loop">Loop</label>
        </div>
        <div className="settings__wrapper">
          <input id="time-left" className="ios-switch" defaultChecked={timeLast} type="checkbox" onChange={() => setTimeLast(!timeLast)}/>
          <label htmlFor="time-left">Time left</label>
        </div>
        <div className="settings__wrapper">
          <input id="shuffle" className="ios-switch" defaultChecked={shuffle} type="checkbox" onChange={() => setShuffle(!shuffle)}/>
          <label htmlFor="track-time-left">Shuffle</label>
        </div>
      </div>
      <div className="track-progress">
        <input ref={progressBar} type="range" id="track-progress" name="track-progress"
               min="0" max={Math.ceil(trackDuration)} step={progressStep} onChange={(e)=>{progressHandler(e)}} />
      </div>
      <Controls
        prev={() => dispatch(prev(songsLength))}
        play={() => dispatch(play())}
        next={() => dispatch(next(songsLength))}
        // forward={forwardHandler}
      />
    </div>
  )
}

export default Player;