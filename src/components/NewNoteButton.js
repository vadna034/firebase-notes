import { Link } from 'react-router-dom';

import 'spectre.css';
import 'spectre.css/dist/spectre-icons.css';
import '../styles/NewNote.css';

export default function NewNoteButton() {
  return (
    <Link class="note-snippet p-centered" to="/Create">
      <p class="note-content text-primary">
        Create a new Note
        <i class="icon icon-plus"></i>
      </p>
    </Link>
  );
}
