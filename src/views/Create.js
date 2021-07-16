import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Create() {
  const { user, setUser } = useContext(AuthContext);

  if (!user) return <Redirect to="/Auth" />;

  return <h1>Create</h1>;
}
