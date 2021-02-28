import {PLAY, PREV, NEXT, JUMP} from "../../constants";

const initialState = {
  isPlaying : false,
  currentSongIndex: 0,
};

function control(state = initialState, action) {
  if(action.type === PLAY){
    return {
      ...state,
      isPlaying: !state.isPlaying,
    }
  }
  if(action.type === PREV){
    if(state.currentSongIndex - 1 < 0){
      return {
        ...state,
        currentSongIndex: action.payload - 1
      }
    } else{
      return {
        ...state,
        currentSongIndex: state.currentSongIndex - 1
      }
    }
  }
  if(action.type === NEXT){
    if(state.currentSongIndex + 1 > action.payload - 1){
      return {
        ...state,
        currentSongIndex: 0,
      }
    } else{
      return {
        ...state,
        currentSongIndex: state.currentSongIndex + 1
      }
    }
  }
  if(action.type === JUMP){
    if(state.currentSongIndex !== action.payload) {
      return {
        ...state,
        currentSongIndex: action.payload,
      }
    }
  }
  return state;
}

export default control;