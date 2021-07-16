import { Link } from 'react-router-dom';

export default function EditNav(props) {
  return (
    <ul class="tab tab-block">
      <li class="tab-item">
        <Link
          to={{
            pathname: '/Notes/' + props.id,
            state: { note: props.note },
          }}
        >
          View{' '}
        </Link>
      </li>
      <li class="tab-item">
        <Link
          to={{
            pathname: '/Create/' + props.id,
            state: { note: props.note },
          }}
        >
          Edit
        </Link>
      </li>
    </ul>
  );
}
