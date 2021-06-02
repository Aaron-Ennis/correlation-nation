import stringify from "csv-stringify";
import saveAs from "file-saver";

export function exportData(statOne, statTwo, currentYear, graphData) {
  stringify(
    graphData.graphData,
    {
      header: true,
      columns: [
        { key: "country", header: "country" },
        { key: "x", header: statOne + " (" + graphData.units.x + ")" },
        { key: "y", header: statTwo + " (" + graphData.units.y + ")" },
      ],
    },
    function(err, output) {
      let filename = statOne + "_" + statTwo + "_" + currentYear + ".csv";
      let blob = new Blob([output], { type: "text/csv;charset=utf-8" });
      saveAs(blob, filename);
    }
  );
}
