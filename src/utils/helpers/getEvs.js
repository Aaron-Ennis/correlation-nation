/*  This function gets the page content from a wikipedia article and returns
 *  certain table data from the page in a shape and format that the app
 *  can use.
 */
import axios from "axios";
import { apiPath, evsPath } from "../paths";

export async function getEvs() {
  let evsData = { name: "EV Market Share", units: "%", tables: [] };
  let response = await axios.get(apiPath + evsPath);
  // EV market share is in the fourth table
  let rawTable = response.data.tables[3];
  let yearRow = rawTable.rows[0].row;
  console.log(rawTable);
  for (let i = 1; i < yearRow.length; i++) {
    let newTable = {
      year: parseInt(yearRow[i].value.match(/\b\d{4}\b/)),
      data: [],
    };
    evsData.tables.push(newTable);
    // Only going to length - 6 to cut off the bottom rows containing
    // global and regional data
    for (let j = 1; j < rawTable.rows.length - 6; j++) {
      if (rawTable.rows[j].row[i] !== "") {
        let country = rawTable.rows[j].row[0].value;
        let newEntry = {
          country: country.trim().replace(/ *\[[^\]]*]/g, ""),
          value: parseFloat(rawTable.rows[j].row[i].value.replaceAll("%", "")),
        };
        newTable.data.push(newEntry);
      }
    }
  }
  return evsData;
}
