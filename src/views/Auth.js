import React, { useContext, useEffect } from 'react';
import firebase from 'firebase';

import { FirebaseAuth } from 'react-firebaseui';
import { AuthContext } from '../context/AuthContext';

import 'spectre.css';

export default function Auth() {
  //get the user state from the context
  const { user, setUser } = useContext(AuthContext);

  const pfp = {
    'border-radius': '100%',
    margin: '1em 1em 0.5em 1em',
  };

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
      {!!user ? (
        <div
          class="profile-logout-div"
          style={{
            width: '75%',
            margin: 'auto',
          }}
        >
          <img src={user.photoURL} alt="Null" style={pfp} />
          <p>
            {' '}
            <strong>User:</strong> {user.displayName}
          </p>
          <button
            class="btn"
            style={{ margin: '0em 0em 1em' }}
            onClick={() => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  setUser(null);
                });
            }}
          >
            {' '}
            sign out
          </button>
        </div>
      ) : (
        <div>
          <p>Please Sign In</p>
          <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      )}
    </div>
  );
}
