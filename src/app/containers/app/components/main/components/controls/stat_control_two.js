/*
 *  Component Name:  StatControlTwo
 *     Description:  This is a controlled component that uses "react-select" to
 *                   render the combobox control.
 */
import Select from "react-select";
import PropTypes from "prop-types";
import { StatList } from "./stat_list";

const propTypes = {
  selection: PropTypes.object,
  selectionChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

function StatControlTwo(props) {
  const { selection, selectionChange, disabled } = props;

  // Event handler that uses a control function from the parent function to
  // keep the select field as a state variable in that parent component.
  function handleChange(selectedOption) {
    selectionChange(selectedOption);
  }

  return (
    <div className="stat-select">
      <Select
        value={selection}
        onChange={handleChange}
        options={StatList}
        placeholder={
          disabled
            ? "Disabled: Select a stat above first"
            : "Select second stat"
        }
        isDisabled={disabled}
      />
    </div>
  );
}

StatControlTwo.propTypes = propTypes;
export default StatControlTwo;
