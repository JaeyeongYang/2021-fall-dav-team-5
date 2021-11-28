import { combineReducers } from 'redux';
import UI from './UI';
import data from './data';
import filter from './filter';

export default combineReducers({
  UI,
  data,
  filter,
});