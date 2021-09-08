import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import 'spectre.css';
import 'spectre.css/dist/spectre-icons.css';
import '../styles/NewNote.css';

import { db, Timestamp } from '../firebase/firebaseConfig';
import { AuthContext } from '../context/AuthContext';
import { setLocalMarkup } from '../scripts/localStorage';

export default function NewNoteButton() {
  const [redirect, setRedirect] = useState(false);
  const [docId, setDocId] = useState(null);
  const { user } = useContext(AuthContext);

  const defaultArticle = {
    title: 'title',
    content: 'content',
    markup: '<h1>title</h1><p>content</p>',
    timestamp: Timestamp.now(),
    author: user.uid,
  };

  let handleClick = (e) => {
    e.preventDefault();
    db.collection('notes')
      .add(defaultArticle)
      .then((snap) => {
        setDocId(snap.id);
        setLocalMarkup(snap.id, defaultArticle.markup);
        setRedirect(true);
      });
  };

  return redirect ? (
    <Redirect to={{ pathname: '/Notes/' + docId, state: defaultArticle }} />
  ) : (
    <a href="/" className="note-snippet p-centered" onClick={handleClick}>
      <p className="note-content text-primary">
        Create a new Note
        <i className="icon icon-plus"></i>
      </p>
    </a>
  );
}
