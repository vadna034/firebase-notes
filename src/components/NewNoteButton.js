import { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import 'spectre.css';
import 'spectre.css/dist/spectre-icons.css';
import '../styles/NewNote.css';

import { db } from '../firebase/firebaseConfig';
import firebase from 'firebase';
import { AuthContext } from '../context/AuthContext';

export default function NewNoteButton() {
  const [redirect, setRedirect] = useState(false);
  const [docId, setDocId] = useState(null);
  const { user, setUser } = useContext(AuthContext);

  const defaultArticle = {
    title: 'title',
    content: 'content',
    markup: '<h1>title</h1><p>content</p>',
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    author: user.uid,
  };

  let handleClick = () => {
    db.collection('notes')
      .add(defaultArticle)
      .then((snap) => {
        setDocId(snap.id);
        setRedirect(true);
      });
  };

  return redirect ? (
    <Redirect to={{ pathname: '/Create/' + docId, state: defaultArticle }} />
  ) : (
    <Link class="note-snippet p-centered" onClick={handleClick}>
      <p class="note-content text-primary">
        Create a new Note
        <i class="icon icon-plus"></i>
      </p>
    </Link>
  );
}
