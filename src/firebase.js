import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import '@firebase/database';

const config = {
  // Copy paste your
};

const firebaseApp = firebase.initializeApp(config);
const goalCoach = firebase.database().ref('goalCoach');
const goalComplete = firebase.database().ref('completeGoal');
const listUsers = firebase.database().ref('listUsers');

export { firebase, goalCoach, goalComplete, listUsers }
