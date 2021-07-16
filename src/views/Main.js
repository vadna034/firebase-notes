import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import NewNoteButton from '../components/NewNoteButton';
import NoteTable from '../components/NoteTable';

import { AuthContext } from '../context/AuthContext';

export default function Main() {
  const { user, setUser } = useContext(AuthContext);

  if (!user) return <Redirect to="/Auth" />;

  return (
    <div>
      <NewNoteButton />
      <NoteTable user={user} />
    </div>
  );
}
