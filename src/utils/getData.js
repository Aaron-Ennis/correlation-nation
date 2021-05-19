import { getGdp } from "./helpers/getGdp";
import { getPop } from "./helpers/getPop";
import { getCo2 } from "./helpers/getCo2";
import { getDef } from "./helpers/getDef";
import { getEvs } from "./helpers/getEvs";

/*function getData(statOne, statTwo) {
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
}*/

export async function getData(stat) {
  switch (stat) {
    case "gdp":
      return await getGdp();
    case "pop":
      return await getPop();
    case "co2":
      return await getCo2();
    case "def":
      return await getDef();
    case "evs":
      return await getEvs();
    default:
      return null;
  }
}
