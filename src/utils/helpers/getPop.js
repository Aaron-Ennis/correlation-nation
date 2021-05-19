/*  This function gets the page content from a wikipedia article and returns
 *  certain table data from the page in a shape and format that the app
 *  can use.
 */
import axios from "axios";
import { apiPath, popPath } from "../paths";

export async function getPop() {
  let popData = { name: "Population", units: "people", tables: [] };
  let response = await axios.get(apiPath + popPath);
  let rawTable = response.data.tables[0];
  // First build a table for each year and push it into the tables array
  let yearRow = rawTable.rows[0].row;
  // The years represented in the table start in the 4th column (index 3),
  // and the last column is the percent change (which we want to exclude)
  for (let i = 3; i < yearRow.length - 1; i++) {
    let newTable = {
      // The regex below matches the four-digit year in the value field
      year: parseInt(yearRow[i].value.match(/\b\d{4}\b/)),
      data: [],
    };
    popData.tables.push(newTable);
    // Next, for each year table, get the country and pop value for the year
    for (let j = 1; j < rawTable.rows.length; j++) {
      // Only create an entry for the country if it has a GDP value for the
      // year we are working in
      if (rawTable.rows[j].row[i] !== "") {
        let country = rawTable.rows[j].row[0].value;
        let newEntry = {
          country: country.trim().replace(/ *\[[^\]]*]/g, ""),
          value: parseInt(rawTable.rows[j].row[i].value.replaceAll(",", "")),
        };
        // Push the country entry into the data array for the year
        newTable.data.push(newEntry);
      }
    }
  }
  return popData;
}
