import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyD1M49Z5_FgMLrvBWOij3VNbeAxumm8pDU",
  authDomain: "cyberrunners-1ae33.firebaseapp.com",
  databaseURL: "https://cyberrunners-1ae33-default-rtdb.firebaseio.com",
  projectId: "cyberrunners-1ae33",
  storageBucket: "cyberrunners-1ae33.appspot.com",
  messagingSenderId: "336388052087",
  appId: "1:336388052087:web:e33e9e628b18b16a57e272",
  measurementId: "G-7Y4Q5JVM4F"
};


firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

export const database = firebase.database();
export const storage = firebase.storage();
