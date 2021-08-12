import { SET_CREATEDAT, SET_UPDATEDAT, SET_COMPLETEDAT } from '../constants';

const dates = (state = [], action) => {
  let date = { createdAt: '', completedAt: '', updatedAt: '' };
  switch (action.type) {
    case SET_CREATEDAT:
      const { createdAt } = date;
      date = {
        createdAt
      };
      return createdAt;
    case SET_UPDATEDAT:
      const { updatedAt } = date;
      date = {
        updatedAt
      };
      return updatedAt;
    case SET_COMPLETEDAT:
      const { completedAt } = date;
      date = {
        completedAt
      };
      return date;
    default:
      return state;
  }
}

export default dates;
