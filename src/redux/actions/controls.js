import {PLAY, PREV, NEXT} from "../../constants";

export const play = ()=>{
  return {
    type: PLAY
  }
};

export const prev = (currentSong)=>{
  return {
    type: PREV,
    payload: currentSong
  }
};

export const next = (songsLength)=>{
  return {
    type: NEXT,
    payload: songsLength
  }
};