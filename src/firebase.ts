import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const {
    REACT_APP_FIREBASE_APIKEY,
    REACT_APP_FIREBASE_AUTHDOMAIN,
    REACT_APP_FIREBASE_DATABASEURL,
    REACT_APP_FIREBASE_PROJECTID,
    REACT_APP_FIREBASE_STORAGEBUCKET,
    REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    REACT_APP_FIREBASE_APPID,
    REACT_APP_FIREBASE_MEASUREID
} = process.env;


const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_APIKEY,
    authDomain: REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: REACT_APP_FIREBASE_DATABASEURL,
    projectId: REACT_APP_FIREBASE_PROJECTID,
    storageBucket: REACT_APP_FIREBASE_STORAGEBUCKET?.replace('<PROJECT_ID>', `${REACT_APP_FIREBASE_PROJECTID}`),
    messagingSenderId: REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: REACT_APP_FIREBASE_APPID,
    measurementId: REACT_APP_FIREBASE_MEASUREID,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
