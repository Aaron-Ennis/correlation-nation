/*
 *  Component Name:  RequestStat
 *     Description:  This component renders the form control for requesting a
 *                   new statistic to be added to the app. This is a controlled
 *                   component, and the text for the input field is held in a
 *                   state variable in the parent component.
 */
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const propTypes = {
  requestText: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
  toggleShowRequest: PropTypes.func.isRequired,
};

function RequestStat(props) {
  const { requestText, onTextChange, toggleShowRequest } = props;

  // Event handler that uses a control function from the parent function to
  // keep the input field text as a state variable in that parent component.
  function handleChange(event) {
    onTextChange(event.target.value);
  }

  // Use the mailto html functionality to send the request
  function submitStat() {
    let subject = encodeURIComponent("Correlation Nation Stat Request");
    let body = encodeURIComponent(requestText);
    toggleShowRequest();
    window.location.href =
      "mailto:info@aaronennis.com?subject=" + subject + "&body=" + body;
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <input
        type="text"
        name="requestText"
        onChange={handleChange}
        className="w-50 m-2"
        placeholder="Enter the stat you would like to see..."
      />
      <Button onClick={() => submitStat()}>Submit</Button>
    </div>
  );
}

RequestStat.propTypes = propTypes;
export default RequestStat;
