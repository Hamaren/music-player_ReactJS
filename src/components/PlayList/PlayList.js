import {useSelector, useDispatch} from 'react-redux';
import {jump} from '../../redux/actions/controls';
import './style.scss';

function PlayList(){
  const songs = useSelector(state => state.playList.songs);
  const currentSongIndex = useSelector(state => state.control.currentSongIndex);
  const isPlaying = useSelector(state => state.control.isPlaying);
  const dispatch = useDispatch();

  return(
    <div className="playlist">
      {songs.map((song, key)=>{
        return(
          <div className="song" key={key} onClick={()=> dispatch(jump(key))}>
            {key === currentSongIndex && isPlaying ? (
              <svg className="song__eq" xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 20 20" fill="#fff">
                <rect className="eq-bar eq-bar--1" x="1" y="4" width="3.7" height="8"/>
                <rect className="eq-bar eq-bar--2" x="7.2" y="4" width="3.7" height="16"/>
                <rect className="eq-bar eq-bar--3" x="13.3" y="4" width="3.7" height="11"/>
              </svg>
            ) : null}
            <div className="song__title" style={{'color': key === currentSongIndex ? 'blue' : null}}>
              <span>{key + 1}. </span>
              {song.title}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PlayList;