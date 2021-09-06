import React from 'react';

import { AuthContext } from '../context/AuthContext';
import firebase from 'firebase';

const Profile = (props) => {
  return (
    <AuthContext.Consumer>
      {(context) => (
        <div
          className="profile-logout-div"
          style={{
            width: '75%',
            margin: 'auto',
          }}
        >
          <img
            src={context.user.photoURL}
            alt="Null"
            style={{
              'border-radius': '100%',
              width: '100px',
              heigh: '100px',
              margin: '1em 1em 0.5em 1em',
            }}
          />
          <p>
            {' '}
            <strong>User:</strong> {context.user.displayName}
          </p>
          <button
            className="btn"
            style={{ margin: '0em 0em 1em' }}
            onClick={() => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  context.setUser(null);
                });
            }}
          >
            {' '}
            sign out
          </button>
        </div>
      )}
    </AuthContext.Consumer>
  );
};

export default Profile;
