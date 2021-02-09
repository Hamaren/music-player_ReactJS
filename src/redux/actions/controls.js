export const play = ()=>{
  return {
    type: 'PLAY'
  }
};

export const prev = (currentSong)=>{
  return {
    type: 'PREV',
    payload: currentSong
  }
};

export const next = (songsLength)=>{
  return {
    type: 'NEXT',
    payload: songsLength
  }
};

export const stop = ()=>{
  return {
    type: 'STOP'
  }
};