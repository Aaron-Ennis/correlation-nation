import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  graphData: PropTypes.object,
  selectedData: PropTypes.array,
  handleSelection: PropTypes.func.isRequired,
};

function CountryControl(props) {
  const { show, handleClose, graphData, selectedData, handleSelection } = props;
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Country Selection</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here</p>
        <div className="d-flex-column">
          {graphData &&
            selectedData &&
            graphData.graphData.map((element) => {
              let isSelected = selectedData.find(
                (selected) => element.country === selected.country
              );
              return (
                <div
                  key={element.country}
                  className="d-flex flex-grow-1 align-items-center"
                  onClick={() => handleSelection(element.country, isSelected)}
                >
                  <i
                    className={
                      isSelected
                        ? "m-1 far fa-check-square"
                        : "m-1 far fa-square"
                    }
                  />{" "}
                  {element.country}
                  <img
                    className="m-1"
                    src="/assets/flag.png"
                    alt="Country Flag"
                  />
                </div>
              );
            })}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

CountryControl.propTypes = propTypes;
export default CountryControl;
