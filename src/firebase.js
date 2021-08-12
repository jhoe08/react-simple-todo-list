import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import '@firebase/database';

const config = {
  // Paste here your firebase configuration
  // 1. Go to your https://console.firebase.google.com/
  // 2. Go to your Project Settings
  // 3. On General tab, scroll down to your Web Apps
  // 4. On SDK setup and configuration, copy what's under the radio Config button
};

const firebaseApp = firebase.initializeApp(config);
const goalCoach = firebase.database().ref(/*Table Name*/);
const goalComplete = firebase.database().ref(/*Table Name*/);
const listUsers = firebase.database().ref(/*Table Name*/);

export { firebase, goalCoach, goalComplete, listUsers }
