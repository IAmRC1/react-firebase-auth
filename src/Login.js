import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import google_provider from './GoogleSignin';
import fb_provider from './FacebookSignin';
import github_provider from './GithubSignin';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const signInWithGoogle = () => {
    app.auth().signInWithRedirect(google_provider);
  }

  const signInWithFacebook = () => {
    app.auth().signInWithRedirect(fb_provider);
  }

  const signInWithGithub = () => {
    app
    .auth()
    .signInWithPopup(github_provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = credential.accessToken;

      // The signed-in user info.
      var user = result.user;

      console.log(`user`, user)
      // ...
    }).catch((error) => {
      console.log(`error`, error)
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
        <button type="button" onClick={() => history.push("/signup")}>Sign Up</button>
        <button type="button" onClick={signInWithGoogle}>Log in with Google</button>
        <button type="button" onClick={signInWithFacebook}>Log in with Facebook</button>
        <button type="button" onClick={signInWithGithub}>Log in with Github</button>

      </form>
    </div>
  );
};

export default withRouter(Login);
