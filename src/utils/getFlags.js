import axios from "axios";
import { parse } from "node-html-parser";
import { getFlagsPath} from "./paths";

export async function getFlags(data) {
  let flagSrc = [];
  let pageTextHtml;
  // Get the page data
  try {
    // Use the Wikipedia REST API to get the page
    const response = await axios.get(
      "https://en.wikipedia.org/api/rest_v1/page/html/Gallery_of_sovereign_state_flags"
    );
    pageTextHtml = response.data;
  } catch (error) {
    console.error(error);
    return error;
  }

  // Parse the page data
  let parsedHtml = await parse(pageTextHtml);
  let images = parsedHtml.querySelectorAll("img");
  data.forEach((element) => {
    images.forEach((image) => {
      let country = element.country.replace(" ", "_");
      let resource = image.attributes.resource;
      if (resource.endsWith(country, resource.length - 4)) {
        flagSrc.push({
          country: country,
          flagLink: "https:" + image.attributes.src,
        });
      }
    });
  });

  //axios.post("http://localhost:7777/get-flags", flagSrc);
}
