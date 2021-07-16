import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { db } from '../firebase/firebaseConfig';

export default function Note(props) {
  let { id } = useParams();
  const [note, setNote] = useState(null);
  const location = useLocation();

  useEffect(() => {
    console.log('re-rendering');
    console.log(location);
    // load article form DB

    if (note == null) {
      setNote(location.state.note);
    }
  });

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
