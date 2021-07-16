import { useContext, useEffect, useState } from 'react';
import { useParams, useLocation, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import { db } from '../firebase/firebaseConfig';

export default function Note(props) {
  let { user, setUser } = useContext(AuthContext);
  let { id } = useParams();
  const [note, setNote] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let tempContent = null;

    if (note == null && location.state && location.state.note !== undefined) {
      tempContent = location.state.note;
    } else if (note == null) {
      db.collection('notes')
        .doc(id)
        .get()
        .then((doc) => {
          tempContent = doc.data();
          setNote(tempContent);
        });
    }

    if (tempContent && user.uid != tempContent.author) {
      console.log(user);
      setRedirect('/Auth');
    }
    if (tempContent) setNote(tempContent);
    console.log(tempContent);
  });

  return note !== null ? (
    <div
      class="article"
      dangerouslySetInnerHTML={{
        __html: note.markup,
      }}
    ></div>
  ) : redirect ? (
    <Redirect to={redirect} />
  ) : (
    <div class="loading loading-lg"></div>
  );
}
