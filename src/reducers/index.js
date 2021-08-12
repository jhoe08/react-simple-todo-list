import { combineReducers } from 'redux';
import user from './reducer_user';
import goals from './reducer_goals';
import completed from './reducer_completed';
import dates from './reducer_created';

export default combineReducers({
  user, goals, completed, dates
})
