import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import '@firebase/database';

const config = {
  apiKey: "AIzaSyBhKTQRa9aq7ZfidVnSft3cD-yWMfN_1_Y",
  authDomain: "goalcoach-2c3a0.firebaseapp.com",
  projectId: "goalcoach-2c3a0",
  storageBucket: "goalcoach-2c3a0.appspot.com",
  messagingSenderId: "640998819214",
  appId: "1:640998819214:web:72e1c875f61e49f7bad0df",
  measurementId: "G-ZBLH1J34WK"
};

const firebaseApp = firebase.initializeApp(config);
const goalCoach = firebase.database().ref('goalCoach');
const goalComplete = firebase.database().ref('completeGoal');
const listUsers = firebase.database().ref('listUsers');

export { firebase, goalCoach, goalComplete, listUsers }
