import React, { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import firebase from 'firebase';

const Profile = (props) => {
  const { userContext, setUser } = useContext(AuthContext);

  const pfp = {
    'border-radius': '100%',
    margin: '1em 1em 0.5em 1em',
  };

  return (
    <AuthContext.Consumer>
      {(context) =>
        (
          <div
            class="profile-logout-div"
            style={{
              width: '75%',
              margin: 'auto',
            }}
          >
            <img src={context.user.photoURL} alt="Null" style={pfp} />
            <p>
              {' '}
              <strong>User:</strong> {context.user.displayName}
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
        )
      }
    </AuthContext.Consumer>
  );
};

export default Profile;
