import {useSelector, useDispatch} from 'react-redux';
import {jump} from '../../redux/actions/controls';

function PlayList(){
  const songs = useSelector(state => state.playList.songs);
  const currentSongIndex = useSelector(state => state.control.currentSongIndex);
  const dispatch = useDispatch();

  return(
    <div className="playlist">
      {songs.map((song, key)=>{
        return(
          <div className="song" key={key} onClick={()=> dispatch(jump(key))}>
            <div className="song__title" style={{'color': key === currentSongIndex ? 'blue' : 'black'}}>{song.title}</div>
          </div>
        )
      })}
    </div>
  )
}

export default PlayList;