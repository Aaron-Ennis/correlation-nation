/*  This function gets the page content from a wikipedia article and returns
 *  certain table data from the page in a shape and format that the app
 *  can use.
 */
import axios from "axios";
import { apiPath, co2Path } from "../paths";

export async function getCo2() {
  let co2Data = { name: "Carbon Emissions", units: "megatonnes", tables: [] };
  let response = await axios.get(apiPath + co2Path);
  let rawTable = response.data.tables[0];
  // First build a table for each year and push it into the tables array
  let yearRow = rawTable.rows[1].row;
  // The last three columns don't contain year data, so we will exclude them
  for (let i = 1; i < yearRow.length - 4; i++) {
    let newTable = {
      year: parseInt(yearRow[i].value),
      data: [],
    };
    co2Data.tables.push(newTable);
    // Next, for each year table, get the country and pop value for the year
    for (let j = 5; j < rawTable.rows.length; j++) {
      // Only create an entry for the country if it has a GDP value for the
      // year we are working in
      if (rawTable.rows[j].row[i] !== "") {
        let country = rawTable.rows[j].row[0].value;
        let newEntry = {
          country: country.trim(),
          value: parseFloat(rawTable.rows[j].row[i].value.replaceAll(",", "")),
        };
        // Push the country entry into the data array for the year
        newTable.data.push(newEntry);
      }
    }
  }
  return co2Data;
}
