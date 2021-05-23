/*  This function gets the page content from a wikipedia article and returns
 *  certain table data from the page in a shape and format that the app
 *  can use.
 */
import axios from "axios";
import { apiPath, gdpPath } from "../paths";

export async function getGdp() {
  let gdpData = { name: "GDP (per capita)", units: "$US", tables: [] };
  let response = await axios.get(apiPath + gdpPath);
  // The table of data we are going to use has 2010 - 2019, and is the
  // fourth table on the page
  let rawTable = response.data.tables[3];
  // First build a table for each year and push it into the tables array
  let yearRow = rawTable.rows[0].row;
  for (let i = 1; i < yearRow.length; i++) {
    let newTable = { year: parseInt(yearRow[i].value), data: [] };
    gdpData.tables.push(newTable);
    // Next, for each year table, get the country and GDP value for the year
    for (let j = 1; j < rawTable.rows.length; j++) {
      // Only create an entry for the country if it has a GDP value for the
      // year we are working in
      if (rawTable.rows[j].row[i] !== "") {
        let country = rawTable.rows[j].row[0].value;
        let newEntry = {
          country: country.replace(/[^\w\s]/gi, '').trim(),
          //country: country.substring(0, country.length - 1).trim(),
          value: parseInt(rawTable.rows[j].row[i].value.replaceAll(",", "")),
        };
        // Push the country entry into the data array for the year
        newTable.data.push(newEntry);
      }
    }
  }
  return gdpData;
}
