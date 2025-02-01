import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { db } from '../firebase/firebaseConfig';

export default function DeleteNoteButton(props) {
  const [redirect, setRedirect] = useState(false);
  const [active, setActive] = useState('');

  let deleteNote = () => {
    db.collection('notes')
      .doc(props.id)
      .delete()
      .then(() => {
        setRedirect(true);
      });
  };

  return redirect ? (
    <Redirect to="/Notes" />
  ) : (
    <>
      <button class="btn" onClick={() => setActive('active')}>
        Delete Note ?
      </button>

      <div class={'modal ' + active} id="modal-id">
        <a href="#close" class="modal-overlay" aria-label="Close"> </a>
        <div class="modal-container">
          <div class="modal-header">
            <a
              href="#close"
              class="btn btn-clear float-right"
              aria-label="Close"
              onClick={() => setActive('')}
            > </a>
            <div class="modal-title h5">Delete Note?</div>
          </div>
          <div class="modal-body">
            <div class="content">
              Notes can not be retrieved once deleted. Are you sure ?
              <br></br>
              <button
                class="btn"
                style={{ margin: '2em' }}
                onClick={deleteNote}
              >
                Yes, Delete It
              </button>
              <button
                class="btn"
                style={{ margin: '2em' }}
                onClick={() => setActive('')}
              >
                No, I changed my mind
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
