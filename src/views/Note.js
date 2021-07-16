import { useContext, useEffect, useState } from 'react';
import { useParams, useLocation, Redirect } from 'react-router-dom';
import EditNav from '../components/EditNav';
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

    if (note === null && location.state && location.state.note !== undefined) {
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
    if (tempContent != null) setNote(tempContent);

    if (user && note && user.uid != note.author) {
      setRedirect('/Auth');
    }
  });

  return note && note.markup && user.uid == note.author ? (
    <div>
      <EditNav note={note} id={id} />
      <div
        class="article"
        dangerouslySetInnerHTML={{
          __html: note.markup,
        }}
      ></div>
    </div>
  ) : redirect ? (
    <Redirect to={redirect} />
  ) : (
    <div class="loading loading-lg"></div>
  );
}
