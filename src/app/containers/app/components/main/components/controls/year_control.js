/*
 *  Component Name:  YearControl
 *     Description:  This is a controlled component that uses "react-select" to
 *                   render the combobox control.
 */
import Select from "react-select";
import PropTypes from "prop-types";

const propTypes = {
  selection: PropTypes.object,
  selectionChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  years: PropTypes.array
};

function YearControl(props) {
  const { selection, selectionChange, years, disabled } = props;

  // Event handler that uses a control function from the parent function to
  // keep the select field as a state variable in that parent component.
  function handleChange(selectedOption) {
    selectionChange(selectedOption);
  }

  return (
    <div className="year-select">
      <Select
        value={selection}
        onChange={handleChange}
        options={years}
        isDisabled={disabled}
        placeholder={
          disabled
            ? "Disabled: Select stats first"
            : ""
        }
      />
    </div>
  );
}

YearControl.propTypes = propTypes;
export default YearControl;
