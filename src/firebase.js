import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import '@firebase/database';

const config = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const firebaseApp = firebase.initializeApp(config);
const goalCoach = firebase.database().ref();
const goalComplete = firebase.database().ref();
const listUsers = firebase.database().ref();

export { firebase, goalCoach, goalComplete, listUsers }
