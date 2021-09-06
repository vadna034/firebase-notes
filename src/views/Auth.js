import React, { useContext, useEffect } from 'react';
import firebase from 'firebase';

import { FirebaseAuth } from 'react-firebaseui';
import { AuthContext } from '../context/AuthContext';

import 'spectre.css';

export default function Auth() {
  //get the user state from the context
  //this is our config for FirebaseAuth
  const uiConfig = {
    signInFlow: 'redirect',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => {
        return false;
      },
    },
  };

  //if user exists or signed in, we redirect the page to home, else display the sign in methods with FirebaseAuth
  return (
    <div>
      <div>
        <p>Please Sign In</p>
        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    </div>
  );
}
