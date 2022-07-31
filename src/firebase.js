import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyBYbpKdB7I6DXe36rK9joQNmPN3GKeG9BI",
    authDomain: "stt-data-ca0ec.firebaseapp.com",
    projectId: "stt-data-ca0ec",
    storageBucket: "stt-data-ca0ec.appspot.com",
    messagingSenderId: "948127191978",
    appId: "1:948127191978:web:926d546d2c8617357d91d3"
  };

const firebaseDB = firebase.initializeApp(firebaseConfig);
export default firebaseDB.database().ref();