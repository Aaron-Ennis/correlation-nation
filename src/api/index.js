import axios from "axios";
import { parse } from "node-html-parser";

export async function getPage() {
  try {
    const response = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "parse",
        page: "List_of_countries_by_GDP_(nominal)_per_capita",
        origin: "*",
        prop: "text",
        format: "json",
      },
    });
    return response.data.parse.text.["*"];
  } catch (error) {
    console.error(error);
  }
}

export async function extractText() {
  let pageTextHtml = await getPage();
  let parsedHtml = await parse(pageTextHtml);
/*  console.log(parsedHtml.querySelectorAll("table"));*/
  return pageTextHtml;
}
