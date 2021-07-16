import { useContext, useState, useRef, useEffect } from 'react';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import { Editor } from '@tinymce/tinymce-react';
import { db } from '../firebase/firebaseConfig';
import EditNav from '../components/EditNav';

export default function Create() {
  const editorRef = useRef(null);
  const location = useLocation();
  const [content, setContent] = useState(null);
  const [markup, setMarkup] = useState(null);
  const [redirect, setRedirect] = useState('');
  const { id } = useParams();
  const { user, setUser } = useContext(AuthContext);
  const [timeoutId, setTimeoutId] = useState(1);

  useEffect(() => {
    let tempContent = null;

    if (
      content == null &&
      location.state &&
      location.state.note !== undefined
    ) {
      tempContent = location.state.note;
      setContent(tempContent);
    } else if (content == null) {
      db.collection('notes')
        .doc(id)
        .get()
        .then((doc) => {
          tempContent = doc.data();
          setContent(tempContent);
          setMarkup(tempContent.markup);
        });
    }

    if (user && content && user.uid != content.author) {
      setRedirect('/Auth');
    }
  });

  function removeTags(str) {
    if (str === null || str === '') return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, '');
  }

  const handleEditorChange = (markup) => {
    setMarkup(markup);
    console.log('handleEditorChange');

    clearInterval(timeoutId);
    setTimeoutId(
      setTimeout(() => {
        let [title, ...body] =  markup.split('\n')
        body = body.join('\n')
        title = removeTags(title);
        body = removeTags(body);
               

        db.collection('notes').doc(id).update({
          title: title,
          content: body,
          markup: markup,
        });
        content.markup = markup;
        console.log('saving', timeoutId);
      }, 5000)
    );
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
  ) : !content || !user || user.uid !== content.author ? (
    <div class="loading loading-lg" />
  ) : (
    <div>
      <EditNav note={content} id={id} />
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
