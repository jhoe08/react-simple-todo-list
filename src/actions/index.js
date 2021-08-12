import { SIGNED_IN, SET_GOALS, COMPLETED_GOALS, SET_CREATEDAT,SET_UPDATEDAT, SET_COMPLETEDAT } from '../constants';


export function completedGoals(completed) {
  const action = {
    type: COMPLETED_GOALS,
    completed
  }
  return action;
}

export function logUser(email) {
  const action = {
    type: SIGNED_IN,
    email
  }
  return action;
}

export function setGoals(goals) {
  const action = {
    type: SET_GOALS,
    goals
  }
  return action;
}

export function createdAt(date) {
  const action = {
    type: SET_CREATEDAT,
    date
  }
  return action;
}

export function updatedAt(date) {
  const action = {
    type: SET_UPDATEDAT,
    date
  }
  return action;
}

export function completedAt(date) {
  const action = {
    type: SET_COMPLETEDAT,
    date
  }
  return action;
}
