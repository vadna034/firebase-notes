export default function NoteContainer(props) {
  return (
    <div>
      <div
        className="article"
        dangerouslySetInnerHTML={{
          __html: props.markup,
        }}
      ></div>
    </div>
  );
}
