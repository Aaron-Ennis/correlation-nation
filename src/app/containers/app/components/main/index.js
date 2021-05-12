import { useEffect, useState, Fragment } from "react";
import { Button } from "react-bootstrap";
import StatControlOne from "./components/controls/stat_control_one";
import StatControlTwo from "./components/controls/stat_control_two";
import CountryControl from "./components/controls/country_control";
import { getData } from "../../../../../utils/getData";
import Graph from "./components/graph";

function Main() {
  const [statOne, setStatOne] = useState(null);
  const [statTwo, setStatTwo] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [dataPoints, setDataPoints] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (statOne && statTwo) {
      setGraphData(getData(statOne.value, statTwo.value));
    }
  }, [statOne, statTwo]);

  useEffect(() => {
    if (graphData) {
      setDataPoints(graphData.graphData);
    }
  }, [graphData]);

  async function handleStatOneChange(selection) {
    setStatOne(selection);
  }

  function handleStatTwoChange(selection) {
    setStatTwo(selection);
  }

  function resetStats() {
    setStatOne(null);
    setStatTwo(null);
    setGraphData(null);
    setDataPoints(null);
  }

  function swapAxis() {
    let temp = statOne;
    setStatOne(statTwo);
    setStatTwo(temp);
  }

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  function handleSelection(country, isSelected) {
    // If it's selected, we're going to remove that country entry
    // from the list of data points on the graph
    if (isSelected) {
      const updatedData = dataPoints.filter(
        (dataPoint) => dataPoint.country !== country
      );
      setDataPoints(updatedData);
    } else {
      let insertCountry = graphData.graphData.find(
        (element) => element.country === country
      );
      setDataPoints([...dataPoints, insertCountry]);
    }
  }

  return (
    <Fragment>
      <div className="main mt-4 container">
        <div className="row mb-3 align-items-center">
          <div className="col d-flex control-label justify-content-end">
            Statistic #1:
          </div>
          <div className="col control-select">
            <StatControlOne
              selection={statOne}
              selectionChange={handleStatOneChange}
            />
          </div>
        </div>

        <div className="row mb-3 align-items-center">
          <div className="col d-flex control-label justify-content-end">
            Statistic #2:
          </div>
          <div className="col control-select">
            <StatControlTwo
              selection={statTwo}
              selectionChange={handleStatTwoChange}
              disabled={!statOne}
            />
          </div>
        </div>

        <div className="d-flex mb-3 justify-content-center edit-countries">
          <div className="justify-content-center">
            <Button disabled={!graphData} onClick={handleShow}>
              Edit Country Selections
            </Button>
          </div>
        </div>

        <div className="d-flex mb-3 justify-content-center">
          <div className="justify-content-center m-2">
            <Button onClick={resetStats}>Reset</Button>
          </div>

          <div className="justify-content-center m-2">
            <Button disabled={!graphData} onClick={swapAxis}>Swap Axis</Button>
          </div>
        </div>
        {dataPoints && (
          <Graph
            dataPoints={dataPoints}
            xLabel={statOne.label}
            yLabel={statTwo.label}
          />
        )}
      </div>
      {graphData && dataPoints && (
        <CountryControl
          show={show}
          handleClose={handleClose}
          graphData={graphData}
          selectedData={dataPoints}
          handleSelection={handleSelection}
        />
      )}
    </Fragment>
  );
}

export default Main;
