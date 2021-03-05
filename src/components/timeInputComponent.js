
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

function TimeInput(props){
    return (
      <div>
        <h4 id={props.labelID} className="mb-4 font-weight-bold">{props.label}</h4>
        <div>
          <span id={props.decID} onClick={props.decrementTime}>
            <FontAwesomeIcon icon={faMinus} size="2x"/>
          </span>
          <label id={props.timeID} className="px-4 font-weight-bold">{props.time}</label>
          <span id={props.incID} onClick={props.incrementTime}>
            <FontAwesomeIcon icon={faPlus} size="2x"/>
          </span>
        </div>
      </div>
    );
}

export default TimeInput;