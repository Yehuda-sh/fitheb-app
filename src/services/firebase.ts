import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAtDAI-CmexszvZsnVw_607u-vYD0UibdI",
  authDomain: "fitheb-app.firebaseapp.com",
  projectId: "fitheb-app",
  storageBucket: "fitheb-app.appspot.com",
  messagingSenderId: "66512179842",
  appId: "1:66512179842:web:83bccc80a62f2310ebda9b",
};

// מונע אתחול כפול
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
