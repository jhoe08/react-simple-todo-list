import { COMPLETED_GOALS } from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case COMPLETED_GOALS:
      const { completed } = action;
      return completed;
    default:
      return state;
  }
}
