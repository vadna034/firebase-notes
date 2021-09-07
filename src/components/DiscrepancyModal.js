import {
  getFirebaseMarkup,
  getLocalMarkup,
  setLocalMarkup,
} from '../scripts/localStorage';

const DiscrepancyModal = (props) => {
  const localData = getLocalMarkup(props.id);
  const firebaseData = getFirebaseMarkup(props.id);
  const localTime = new Date(localData.timestamp * 1000);
  const firebaseTime = new Date(firebaseData.timestamp * 1000);
  const format = {
    day: 'numeric',
    year: 'numeric',
    month: 'numeric',
    hour: 'numeric', // numeric, 2-digit
    minute: 'numeric', // numeric, 2-digit
    second: 'numeric', // numeric, 2-digit
  };

  const acceptFirebase = () => {
    props.setMarkup(firebaseData.markup);
    setLocalMarkup(props.id, firebaseData.markup);
    props.setDiscrepancy(false);
  };
  const acceptLocal = () => {
    props.setMarkup(localData.markup);
    setLocalMarkup(props.id, localData.markup);
    props.setDiscrepancy(false);
  };

  return (
    <div className={props.discrepancy ? 'modal active' : 'modal'} id="modal-id">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-title h5">
            Discrepancy in Local vs Firebase copy of Note
          </div>
        </div>
        <div class="modal-body">
          <div class="content">
            <table style={{ width: '100%' }}>
              <tr>
                <td>
                  <p className="float-left">
                    Local copy from
                    {' ' + localTime.toLocaleDateString('en-US', format)}
                  </p>
                </td>
                <td>
                  <button
                    onClick={acceptLocal}
                    className="btn float-right"
                    style={{ width: '100%' }}
                  >
                    {' '}
                    Accept Local
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <p className="float-left">
                    Firebase copy from
                    {' ' + firebaseTime.toLocaleDateString('en-US', format)}
                  </p>
                </td>
                <td>
                  <button
                    onClick={acceptFirebase}
                    className="btn float-right"
                    style={{ width: '100%' }}
                  >
                    {' '}
                    Accept Firebase
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscrepancyModal;
