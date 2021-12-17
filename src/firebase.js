import firebase from "firebase/app"
import "firebase/auth"

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDY2VOWw3xxGC60bLbEPnHOuKrIyfMO4G4",
    authDomain: "meligram-554e1.firebaseapp.com",
    projectId: "meligram-554e1",
    storageBucket: "meligram-554e1.appspot.com",
    messagingSenderId: "692138831743",
    appId: "1:692138831743:web:60e6b6695c1b6d1c1ef44a"
}).auth();