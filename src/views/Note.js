import { useContext, useEffect, useState } from 'react';
import { useParams, useLocation, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import { db } from '../firebase/firebaseConfig';

export default function Note(props) {
  let { user, setUser } = useContext(AuthContext);
  let { id } = useParams();
  const [note, setNote] = useState(null);
  const location = useLocation();

  useEffect(() => {
    console.log('re-rendering');
    console.log(location);
    // load article form DB

    if (note == null && location.state.note != null) {
      setNote(location.state.note);
    }
  });

  if (!user) {
    return <Redirect to="/Auth" />;
  }

  return note !== null ? (
    <div
      class="article"
      dangerouslySetInnerHTML={{
        __html: note.markup,
      }}
    ></div>
  ) : (
    <div class="loading loading-lg"></div>
  );
}
