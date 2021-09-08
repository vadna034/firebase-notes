import React from 'react';
import { auth, providerID } from '../firebase/firebaseConfig';

import { FirebaseAuth } from 'react-firebaseui';

export default function Auth() {
  return (
    <div>
      <div>
        <p>Please Sign In</p>
        <FirebaseAuth
          uiConfig={{
            signInFlow: 'redirect',
            signInOptions: [providerID],
            callbacks: {
              signInSuccess: () => {
                return false;
              },
            },
          }}
          firebaseAuth={auth}
        />
      </div>
    </div>
  );
}
