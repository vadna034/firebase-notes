import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Editor } from '@tinymce/tinymce-react';
import { db, Timestamp } from '../firebase/firebaseConfig';

import '../styles/Note.css';
import { setLocalMarkup } from '../scripts/localStorage';
import DeleteNoteButton from './DeleteNoteButton';
import SaveNoteButton from './SaveNoteButton';


// API key is not exposed, as I have to whitelist a domain for access

export default function CreateForm(props) {
  const editorRef = useRef(null);
  const { id } = useParams();

  const handleEditorChange = (markup) => {
    setLocalMarkup(id, markup);
  };

  const saveNote = () => {
    function removeTags(str) {
      if (str === null || str === '') return false;
      else str = str.toString();
      return str.replace(/(<([^>]+)>)/gi, '');
    }

    let markup, title, body;
    markup = localStorage.getItem(id);
    [title, ...body] = markup.slice(0, 1000).split('\n');
    body = body.join('\n');

    db.collection('notes')
      .doc(id)
      .update({
        markup: markup,
        title: removeTags(title),
        content: removeTags(body),
        timestamp: Timestamp.now(),
      });
  };

  return (
    <div>
      <Editor
        apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
        plugins="image code codesample table"
        image_title="true"
        automatic_uploads="true"
        file_picker_types="image"
        image_caption="true"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={props.markup}
        onEditorChange={handleEditorChange}
        init={{
          height: 700,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code table fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | code | table | ' +
            'link image | bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | codesample | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      <SaveNoteButton id={id}/>
      <DeleteNoteButton id={id}/>
    </div>
  );
}
