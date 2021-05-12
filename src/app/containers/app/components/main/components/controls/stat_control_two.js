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
