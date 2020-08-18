import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCbrV2IW9HC-8R5O1t4QCRJQOn6ocZKxu8",
    authDomain: "medium-clone-3410e.firebaseapp.com",
    databaseURL: "https://medium-clone-3410e.firebaseio.com",
    projectId: "medium-clone-3410e",
    storageBucket: "medium-clone-3410e.appspot.com",
    messagingSenderId: "365663604889",
    appId: "1:365663604889:web:6acbc8e7e7cdb69a6e2808",
    measurementId: "G-YY8YP3GB5X"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage};