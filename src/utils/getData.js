/*
 *  This file is a switch control to handle which stat to get based on the 
 *  parameter provided.
 */
import { getGdp } from "./helpers/getGdp";
import { getPop } from "./helpers/getPop";
import { getCo2 } from "./helpers/getCo2";
import { getDef } from "./helpers/getDef";
import { getEvs } from "./helpers/getEvs";

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
