import React from 'react';
import firebase from 'firebase';

import { FirebaseAuth } from 'react-firebaseui';

export default function Auth() {
  return (
    <div>
      <div>
        <p>Please Sign In</p>
        <FirebaseAuth
          uiConfig={{
            signInFlow: 'redirect',
            signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
            callbacks: {
              signInSuccess: () => {
                return false;
              },
            },
          }}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </div>
  );
}
