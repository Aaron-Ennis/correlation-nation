import Select from "react-select";
import PropTypes from "prop-types";
import { StatList } from "./stat_list";

const propTypes = {
  selection: PropTypes.object,
  selectionChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

function StatControlOne(props) {
  const { selection, selectionChange } = props;

  function handleChange(selectedOption) {
    selectionChange(selectedOption);
  }

  return (
    <div className="stat-select">
      <Select
        value={selection}
        onChange={handleChange}
        options={StatList}
        placeholder={"Select first stat"}
      />
    </div>
  );
}

StatControlOne.propTypes = propTypes;
export default StatControlOne;
