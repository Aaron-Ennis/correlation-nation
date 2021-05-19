/*  This function gets the page content from a wikipedia article and returns
 *  certain table data from the page in a shape and format that the app
 *  can use.
 */
import axios from "axios";
import { apiPath, defPath } from "../paths";

export async function getDef() {
  let defData = { name: "Defense Spending", units: "US$ bn", tables: [] };
  let response = await axios.get(apiPath + defPath);
  let rawTable = response.data.tables[0];
  // There is only one year reported in this table right now.
  let newTable = { year: 2020, data: [] };
  defData.tables.push(newTable);
  for (let i = 2; i < rawTable.rows.length; i++) {
    let country = rawTable.rows[i].row[1].value;
    let newEntry = {
      country: country.trim().replace(/ *\[[^\]]*]/g, ""),
      value: parseFloat(rawTable.rows[i].row[2].value.replaceAll(",", "")),
    };
    newTable.data.push(newEntry);
  }
  return defData;
}
