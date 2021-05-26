/*
 *  Component Name:  Graph
 *     Description:  This component renders the graph using components from
 *                   the "recharts" library.
 */
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Label,
} from "recharts";
import PropTypes from "prop-types";

const propTypes = {
  dataPoints: PropTypes.array,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
};

function Graph(props) {
  function renderTooltip(props) {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const country = payload[0].payload.country;
      const statOne = payload[0];
      const statTwo = payload[1];
      const imgSrc =
        "https://api.aaronennis.com/flags/" +
        country.replace(" ", "_") +
        ".png";
      return (
        <div className="tooltip-custom">
          <div className="d-flex">
            <p className="tooltip-country">{country}</p>
            <div className="country-flag">
              <img src={imgSrc} alt="Country Flag" />
            </div>
          </div>
          <hr />
          <p>
            <span>{statOne.name}: </span>
            {statOne.value.toLocaleString()}
          </p>

          <p>
            <span>{statTwo.name}: </span>
            {statTwo.value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  }

  const { dataPoints, xLabel, yLabel } = props;
  return (
    <div className="graph-container">
      <ScatterChart
        width={700}
        height={350}
        margin={{ top: 20, right: 20, bottom: 20, left: 60 }}
      >
        <CartesianGrid />
        <XAxis
          type="number"
          domain={[0, "dataMax"]}
          dataKey="x"
          name={xLabel}
          stroke="#bec5ad"
        >
          <Label
            value={xLabel}
            offset={-10}
            position="insideBottom"
            fill="#fff"
          />
        </XAxis>
        <YAxis dataKey="y" name={yLabel} stroke="#bec5ad">
          <Label
            value={yLabel}
            angle={-90}
            offset={50}
            fill="#fff"
            position="left"
          />
        </YAxis>
        <Tooltip cursor={{ strokeDasharray: "3 3" }} content={renderTooltip} />
        <Scatter data={dataPoints} stroke="#bec5ad" fill="#34252f" />
      </ScatterChart>
    </div>
  );
}

Graph.propTypes = propTypes;
export default Graph;
