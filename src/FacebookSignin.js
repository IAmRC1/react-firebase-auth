import * as firebase from "firebase/app";

const fb_provider = new firebase.auth.FacebookAuthProvider();

fb_provider.addScope('user_birthday');

export default fb_provider;