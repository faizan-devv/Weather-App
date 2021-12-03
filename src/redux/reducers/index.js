import { combineReducers } from "redux";
import FetchCurrentWeather from "./FetchCurrentWeather";

const rootReducer = combineReducers({
  FetchCurrentWeather,
});

export default rootReducer;
