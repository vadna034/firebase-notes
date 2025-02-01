import React from 'react';
import { db, Timestamp } from '../firebase/firebaseConfig';

export default function SaveNoteButton(props) {
    const saveNote = () => {
        function removeTags(str) {
          if (str === null || str === '') return false;
          else str = str.toString();
          return str.replace(/(<([^>]+)>)/gi, '');
        }
    
        let markup, title, body;
        markup = localStorage.getItem(props.id);
        [title, ...body] = markup.slice(0, 1000).split('\n');
        body = body.join('\n');
    
        db.collection('notes')
          .doc(props.id)
          .update({
            markup: markup,
            title: removeTags(title),
            content: removeTags(body),
            timestamp: Timestamp.now(),
          });
    };

    return  <button className="btn" onClick={saveNote}>
        Save Note?
    </button>
}
