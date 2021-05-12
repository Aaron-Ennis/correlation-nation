import { getStatTable } from "../api/mockData/dataTables";

export function getData(statOne, statTwo) {
  let data = { units: { x: "", y: "" }, graphData: [] };
  const statTableOne = getStatTable(statOne);
  const statTableTwo = getStatTable(statTwo);
  data.units.x = statTableOne.units;
  data.units.y = statTableTwo.units;
  statTableOne.data.forEach((xElement) => {
    statTableTwo.data.forEach((yElement) => {
      if (xElement.country === yElement.country) {
        let graphPoint = {};
        graphPoint.country = xElement.country;
        graphPoint.x = xElement.value;
        graphPoint.y = yElement.value;
        data.graphData.push(graphPoint);
      }
    });
  });
  return data;
}
