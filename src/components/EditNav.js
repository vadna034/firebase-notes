export default function EditNav(props) {
  const setViewMode = (e) => {
    e.preventDefault();
    props.changeMode('view');
  };
  const setEditMode = (e) => {
    e.preventDefault();
    props.changeMode('edit');
  };

  return (
    <ul className="tab tab-block">
      <li className={props.mode === 'view' ? 'tab-item active' : 'tab-item'}>
        <a href="/#" onClick={setViewMode}>
          View
        </a>
      </li>
      <li className={props.mode === 'edit' ? 'tab-item active' : 'tab-item'}>
        <a href="/#" onClick={setEditMode}>
          Edit
        </a>
      </li>
    </ul>
  );
}
