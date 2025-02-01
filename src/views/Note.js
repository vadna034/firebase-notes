import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import CreateForm from '../components/CreateForm';
import DiscrepancyModal from '../components/DiscrepancyModal';
import EditNav from '../components/EditNav';
import NoteContainer from '../components/NoteContainer';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase/firebaseConfig';
import {
  getLocalMarkup,
  setFirebaseMarkup,
  setLocalMarkup,
} from '../scripts/localStorage';
import DeleteNoteForm from '../components/DeleteNoteForm';

const Note = (props) => {
  const { id } = useParams();
  const [mode, setMode] = useState('view');
  const [markup, setMarkup] = useState(null);
  const [init, setInit] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [discrepancy, setDiscrepancy] = useState(false);
  const { user } = useContext(AuthContext);

  async function fetchData() {
    setInit(true);
    const docRef = db.collection('notes').doc(id);
    const doc = await docRef.get();
    const data = doc.data();
    const localData = getLocalMarkup(id);

    if (data === undefined || user.uid !== data.author) {
      setRedirect(true);
      return;
    }

    setFirebaseMarkup(id, data.markup, data.timestamp.seconds);

    if (localData.markup !== data.markup && localData.timestamp) {
      setDiscrepancy(true);
    } else {
      setMarkup(data.markup);
      setLocalMarkup(id, data.markup);
    }
  }

  function changeMode(newMode) {
    if (newMode !== mode) {
      setMode(newMode);
      setMarkup(localStorage.getItem(id));
    }
  }

  useEffect(() => {
    if (markup === null && !init) {
      fetchData();
    }
  });

  if (redirect) {
    return <Redirect to="/404" />;
  } else if (markup === null && !discrepancy) {
    return <div className="loading loading-lg"></div>;
  } else {
    return (
      <div>
        <EditNav mode={mode} changeMode={changeMode}></EditNav>
        <DiscrepancyModal
          id={id}
          discrepancy={discrepancy}
          setDiscrepancy={setDiscrepancy}
          setMarkup={setMarkup}
        />
        {mode === 'view' ? (
          <NoteContainer markup={markup}></NoteContainer>
        ) : (
          <>
            <CreateForm markup={markup} id={id}></CreateForm>
          </>
        )}
      </div>
    );
  }
};

export default Note;
