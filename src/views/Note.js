import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import CreateForm from '../components/CreateForm';
import EditNav from '../components/EditNav';
import NoteContainer from '../components/NoteContainer';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase/firebaseConfig';
import { setLocalMarkup } from '../scripts/localStorage';

const Note = (props) => {
  const { id } = useParams();
  const [mode, setMode] = useState('view');
  const [markup, setMarkup] = useState(localStorage.getItem(id));
  const [querying, setQuerying] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { user } = useContext(AuthContext);

  async function fetchData() {
    setQuerying(true);
    const markupText = db.collection('notes').doc(id);
    const doc = await markupText.get();
    const data = doc.data();

    if (data === undefined || data.author !== user.uid) setRedirect(true);
    else {
      setMarkup(data.markup);
      setLocalMarkup(id, markup, Date.now());
    }
  }

  function changeMode(newMode) {
    if (newMode !== mode) {
      setMode(newMode);
      setMarkup(localStorage.getItem(id));
    }
  }

  useEffect(() => {
    if (markup === null && !querying) {
      fetchData();
    }
  });

  if (redirect) {
    return <Redirect to="/404" />;
  } else if (markup === null) {
    return <div className="loading loading-lg"></div>;
  } else {
    return (
      <div>
        <EditNav mode={mode} changeMode={changeMode}></EditNav>
        {mode === 'view' ? (
          <NoteContainer markup={markup}></NoteContainer>
        ) : (
          <CreateForm markup={markup}></CreateForm>
        )}
      </div>
    );
  }
};

export default Note;
