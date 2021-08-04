import * as firebase from "firebase/app";

const github_provider = new firebase.auth.GithubAuthProvider();

github_provider.addScope('repo');

export default github_provider;

