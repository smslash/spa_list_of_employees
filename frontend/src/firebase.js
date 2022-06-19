import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyB4E-hDCvqmsTzfFIVtQlQAMEoToeDXHXw",
    authDomain: "react-contact-99072.firebaseapp.com",
    databaseURL: "https://react-contact-99072-default-rtdb.firebaseio.com",
    projectId: "react-contact-99072",
    storageBucket: "react-contact-99072.appspot.com",
    messagingSenderId: "126901845930",
    appId: "1:126901845930:web:79e46617422bbbb4e0b5d3",
};

const fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();
