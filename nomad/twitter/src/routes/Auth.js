import React from "react";
import { authService } from "myBase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import AuthForm from "components/AuthForm";

const Auth = () => {
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;

    let provider;

    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};

export default Auth;
