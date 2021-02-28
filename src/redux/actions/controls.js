import {PLAY, PREV, NEXT, JUMP} from "../../constants";

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

export const jump = (songIndex)=>{
  return {
    type: JUMP,
    payload: songIndex
  }
};