import control from './controlReducer';
import playList from './playListReducer';
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  control,
  playList
});

export default rootReducer;