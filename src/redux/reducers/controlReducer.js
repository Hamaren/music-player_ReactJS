const initialState = {
  isPlaying : false,
  currentSongIndex: 0,
  //isStopped: true,
};

function control(state = initialState, action) {
  if(action.type === 'PLAY'){
    return {
      ...state,
      isPlaying: !state.isPlaying,
      isStopped: false,
    }
  }
  if(action.type === 'PREV'){
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
  if(action.type === 'NEXT'){
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
  return state;
}

export default control;