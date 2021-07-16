import { useContext, useState, useRef, useEffect } from 'react';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import { Editor } from '@tinymce/tinymce-react';
import { db } from '../firebase/firebaseConfig';

export default function Create() {
  const editorRef = useRef(null);
  const location = useLocation();
  const [content, setContent] = useState(null);
  const [redirect, setRedirect] = useState('');
  const { id } = useParams();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      setRedirect('/Auth');
    }

    if (content == null && location.state.note !== undefined) {
      setContent(location.state.note);
    } else if (content == null) {
      db.collection('notes')
        .doc(id)
        .get()
        .then((doc) => {
          console.log('here');
          console.log(doc);
          setContent(doc.data());
        });
    }
    console.log(content);
  });

  const handleEditorChange = (content) => {
    setContent(content);
  };

  const deleteNote = () => {
    db.collection('notes')
      .doc(id)
      .delete()
      .then(() => {
        setRedirect('/Notes');
      });
  };

  return redirect ? (
    <Redirect to={redirect} />
  ) : !content ? (
    <div class="loading loading-lg"></div>
  ) : (
    <div>
      <Editor
        apiKey="psre9zke0ox1ea2oostu23erhq2qmiyokv9od060xunx633h"
        plugins="image code"
        image_title="true"
        automatic_uploads="true"
        file_picker_types="image"
        image_caption="true"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={content.markup}
        onEditorChange={handleEditorChange}
        init={{
          height: 800,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | code | ' +
            'link image | bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      <button class="btn" onClick={deleteNote}>
        Delete Note
      </button>
    </div>
  );
}
