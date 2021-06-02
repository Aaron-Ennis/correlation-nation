/*
 *  Component Name:  Main
 *     Description:  This component renders the bulk of the application
 *                   and contains most of the logic through controlled
 *                   components.
 */
import { useEffect, useState, Fragment } from "react";
import { Button } from "react-bootstrap";
import StatControlOne from "./components/controls/stat_control_one";
import StatControlTwo from "./components/controls/stat_control_two";
import CountryControl from "./components/controls/country_control";
import YearControl from "./components/controls/year_control";
import RequestStat from "./components/controls/request_stat";
import { getData } from "../../../../../utils/getData";
import { getFlags } from "../../../../../utils/getFlags";
import Graph from "./components/graph";
import { StatList } from "./components/controls/stat_list";
import { exportData } from "../../../../../utils/exportData";

function Main() {
  const [statOne, setStatOne] = useState(null);
  const [statOneData, setStatOneData] = useState(null);
  const [statTwo, setStatTwo] = useState(null);
  const [statTwoData, setStatTwoData] = useState(null);

  // Any time either of the stats changes, call processYears() to
  // cross-refernce the stat tables for common years.
  useEffect(() => {
    if (statOneData && statTwoData) {
      processYears();
    }
    // eslint-disable-next-line
  }, [statOneData, statTwoData]);

  const [years, setYears] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);

  // Any time the year is changed, call processData() to rebuild the graphData
  // array that holds the complete data point list with all countries.
  useEffect(() => {
    if (currentYear) {
      processData();
    }
    // eslint-disable-next-line
  }, [currentYear]);

  const [graphData, setGraphData] = useState(null);
  const [dataPoints, setDataPoints] = useState(null);

  // This effect essentially makes a copy of the full graph data that was built
  // by cross-referencing the two stat lists. This copy will be modified when
  // the user selects or deselects countries in the CountryControl component.
  useEffect(() => {
    if (graphData) {
      setDataPoints(graphData.graphData);
    }
  }, [graphData]);

  const [showCountries, setShowCountries] = useState(false);
  const [showRequest, setShowRequest] = useState(false);

  const [requestText, setRequestText] = useState("");

  async function handleStatOneChange(selection) {
    setStatOne(selection);
    let data = await getData(selection.value);
    setStatOneData(data);
  }

  async function handleStatTwoChange(selection) {
    setStatTwo(selection);
    let data = await getData(selection.value);
    setStatTwoData(data);
  }

  function handleYearChange(selection) {
    setCurrentYear(selection);
  }

  // This function cross-references the two stat tables (by current year)
  // and builds a single array that contains the data points only for the
  // countries common to both tables.
  function processData() {
    let tableOne;
    let tableTwo;
    let data = { units: { x: "", y: "" }, graphData: [] };
    // First get the stat tables for the currently selected year
    statOneData.tables.forEach((table) => {
      if (table.year === currentYear.value) {
        tableOne = table.data;
      }
    });
    statTwoData.tables.forEach((table) => {
      if (table.year === currentYear.value) {
        tableTwo = table.data;
      }
    });
    // Then set the unit labels for the x and y axis
    data.units.x = statOneData.units;
    data.units.y = statTwoData.units;
    // Then cross-refernce the tables to find countries in common and add
    // common countries and their data points to the new table that will
    // be used for the graph.
    tableOne.forEach((xElement) => {
      tableTwo.forEach((yElement) => {
        if (xElement.country === yElement.country) {
          let graphPoint = {};
          graphPoint.country = xElement.country;
          graphPoint.x = xElement.value;
          graphPoint.y = yElement.value;
          data.graphData.push(graphPoint);
        }
      });
    });
    setGraphData(data);
  }

  // This function builds the list of available years that are common to the
  // two stats selected.
  function processYears() {
    let list = [];
    statOneData.tables.forEach((tableOne) => {
      statTwoData.tables.forEach((tableTwo) => {
        if (tableOne.year === tableTwo.year) {
          let newYear = { value: tableOne.year, label: tableOne.year };
          list.push(newYear);
        }
      });
    });
    // Display an alert if there are no years in common for the selected stats
    // and as the user to select different stats.
    if (list.length === 0) {
      alert("No matching years found. Please select different stats.");
      setCurrentYear(null);
    } else {
      setYears(list);
      // Set the year to the most current year common to the two stats
      setCurrentYear(list[list.length - 1]);
    }
  }

  // This function just resets everything to the app's initial state.
  function resetStats() {
    setStatOne(null);
    setStatOneData(null);
    setStatTwo(null);
    setStatTwoData(null);
    setGraphData(null);
    setDataPoints(null);
    setCurrentYear(null);
    setYears(null);
  }

  // Allows the user to swap the axis on the graph
  function swapAxis() {
    let temp = statOne;
    handleStatOneChange(statTwo);
    handleStatTwoChange(temp);
  }

  // Select two stats at random for the user.
  async function randomize() {
    resetStats();
    let randomStatOne = Math.floor(Math.random() * StatList.length);
    let randomStatTwo;
    do {
      randomStatTwo = Math.floor(Math.random() * StatList.length);
    } while (randomStatTwo === randomStatOne);

    await handleStatOneChange(StatList[randomStatOne]);
    await handleStatTwoChange(StatList[randomStatTwo]);
  }

  function handleShow() {
    setShowCountries(true);
  }

  function handleClose() {
    setShowCountries(false);
  }

  function toggleShowRequest() {
    setShowRequest(!showRequest);
  }

  function handleTextChange(input) {
    setRequestText(input);
  }

  // This function gets passed to the CountryControl component as a prop
  // and handles the countries being deselected or selected by the user.
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

  function handleExportData() {
    exportData(statOne.label, statTwo.label, currentYear.value, graphData);
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
              disabled={!statOneData}
            />
          </div>
        </div>

        <div className="row mb-3 align-items-center">
          <div className="col d-flex control-label justify-content-end">
            Year:
          </div>
          <div className="col control-select">
            <YearControl
              selection={currentYear}
              selectionChange={handleYearChange}
              disabled={!years}
              years={years ? years : []}
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
            <Button onClick={randomize}>Random</Button>
          </div>

          <div className="justify-content-center m-2">
            <Button disabled={!graphData} onClick={swapAxis}>
              Swap Axis
            </Button>
          </div>

          <div className="justify-content-center m-2">
            <Button onClick={toggleShowRequest}>Request New Stat</Button>
          </div>
        </div>
        {showRequest && (
          <RequestStat
            requestText={requestText}
            onTextChange={handleTextChange}
            toggleShowRequest={toggleShowRequest}
          />
        )}
        {dataPoints && (
          <Fragment>
            <Graph
              dataPoints={dataPoints}
              xLabel={statOne.label}
              yLabel={statTwo.label}
            />
            <div className="d-flex justify-content-center m-4">
              <Button onClick={handleExportData}>Export Data</Button>
            </div>
          </Fragment>
        )}
      </div>
      {graphData && dataPoints && (
        <CountryControl
          show={showCountries}
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
