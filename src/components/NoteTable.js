import { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';

import { Link } from 'react-router-dom';
import 'spectre.css';
import '../styles/NoteTable.css';

export default function NoteTable(props) {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    if (notes === null) {
      var notesTemp = [];
      db.collection('notes')
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            notesTemp.push(doc);
          });
          setNotes(notesTemp);
        });
    }
  });

  return (
    <div>
      {notes ? (
        notes.map((docRef, idx) => {
          let doc = docRef.data();
          return (
            <div class="article-snippet" key={idx}>
              <div class="article-header-container">
                <Link
                  class="article-title"
                  to={{
                    pathname: '/Notes/' + docRef.id,
                    state: { note: doc },
                  }}
                >
                  {doc.title}
                </Link>
              </div>
              <div class="article-content-container">
                <p class="article-content">{doc.content}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div class="loading loading-lg"></div>
      )}
    </div>
  );
}
