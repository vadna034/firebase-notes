import { useContext, useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';

import { Link } from 'react-router-dom';
import 'spectre.css';
import '../styles/NoteTable.css';
import { AuthContext } from '../context/AuthContext';

export default function NoteTable(props) {
  const [notes, setNotes] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (notes === null) {
      var notesTemp = [];
      db.collection('notes')
        .where('author', '==', user.uid)
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            if (!doc.data().trash) notesTemp.push(doc);
          });
          setNotes(notesTemp);
        });
    }
  });

  return (
    <div>
      {notes ? (
        notes.map((docRef, idx) => {
          let [data, id] = [docRef.data(), docRef.id];
          return (
            <div className="article-snippet" key={idx}>
              <div className="article-header-container">
                <Link
                  className="article-title"
                  to={{
                    pathname: '/Notes/' + id,
                  }}
                >
                  {data.title}
                </Link>
              </div>
              <div className="article-content-container">
                <p className="article-content">{data.content}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="loading loading-lg"></div>
      )}
    </div>
  );
}
