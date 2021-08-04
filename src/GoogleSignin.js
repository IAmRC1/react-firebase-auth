import * as firebase from "firebase/app";

const google_provider = new firebase.auth.GoogleAuthProvider();

google_provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export default google_provider;
