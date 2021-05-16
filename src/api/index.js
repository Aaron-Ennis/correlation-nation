import axios from "axios";
import { parse } from "node-html-parser";

export async function parseWiki(url) {
  // Set up the shape of the response
  let structuredData = {
    headings: [],
    paragraphs: [],
    linksText: [],
    tables: [],
  };
  let pageTextHtml;
  // We only want the last part of the URL so that we can access it
  // using the Wikipedia REST API
  const page = url.substring(url.lastIndexOf("/"));

  // Get the page data
  try {
    // Use the Wikipedia REST API to get the page
    const response = await axios.get(
      "https://en.wikipedia.org/api/rest_v1/page/html" + page
    );
    pageTextHtml = response.data;
  } catch (error) {
    console.error(error);
    return error;
  }

  // Parse the page data
  let parsedHtml = await parse(pageTextHtml);

  // Get the paragraphs from the page
  let paragraphs = parsedHtml.querySelectorAll("p");
  // Map paragraphs into the shaped response
  paragraphs.forEach((paragraph) => {
    // Exclude any paragrpahs that are empty or only contain a newline
    if (paragraph.innerText !== "\n" && paragraph.innerText !== "") {
      // Push the paragraph, excluding any footnote brackets
      structuredData.paragraphs.push(
        paragraph.innerText.replace(/\[[^]]*\]+/g, "")
      );
    }
  });

  // Get the headings from the page
  let headings = parsedHtml.querySelectorAll("h1, h2, h3, h4, h5, h6");
  // Map headings into the shaped response
  headings.forEach((heading) => {
    // Exclude any headings that are empty or only contain a newline, as well
    // as common non-topic headings at bottom of pages
    if (
      heading.innerText !== "\n" &&
      heading.innerText !== "" &&
      heading.innerText !== "Sources" &&
      heading.innerText !== "References" &&
      heading.innerText !== "External links"
    ) {
      // Push the heading, excluding any footnote  or edit brackets
      structuredData.headings.push(
        heading.innerText.replace(/\[[^]]*\]+/g, "")
      );
    }
  });

  // Get the anchors from the page
  let anchors = parsedHtml.querySelectorAll("a");
  // Map anchors into the shaped response
  anchors.forEach((anchor) => {
    // Exclude any anchors that are empty or only contain a newline, as well
    // as common non-topic anchors at bottom of pages
    if (anchor.innerText !== "\n" && anchor.innerText !== "") {
      // Push the anchor, excluding any footnote  or edit brackets
      structuredData.linksText.push(
        anchor.innerText.replace(/\[[^]]*\]+/g, "")
      );
    }
  });

  // Get sortable tables from the page
  let tables = parsedHtml.querySelectorAll("table.wikitable tbody");

  tables.forEach((table) => {
    // Create a new table object that will be an array of rows
    let newTable = { rows: [] };
    // Create the empty array for rows
    let rowsArray = [];
    // Get the rows from the current table
    let rows = table.querySelectorAll("tr");
    rows.forEach((row) => {
      // Create a new row object in the table that will be an array of cells
      let newRow = { row: [] };
      //Create the empty array for cells
      let rowArray = [];
      // Get the cells from the current row
      let cells = row.querySelectorAll("th, td");
      cells.forEach((cell) => {
        let newCell = { type: cell.rawTagName, value: cell.innerText };
        rowArray.push(newCell);
      });
      // Put the row in the new row object
      newRow.row = rowArray;
      // Push the new row onto the table's rows array
      rowsArray.push(newRow);
    });
    // Put the rows array into the new table object
    newTable.rows = rowsArray;
    // Push the new table into the data object to be returned
    structuredData.tables.push(newTable);
  });

  return structuredData;
}

async function getPage(url) {
  const grandPrix = "1976_Spanish_Grand_Prix";
  const countries =
    "List_of_countries_by_past_and_projected_GDP_(nominal)_per_capita";

  try {
    const response = await axios.get(
      "https://en.wikipedia.org/api/rest_v1/page/htm/" + grandPrix
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
