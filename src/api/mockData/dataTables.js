export const gdp = {
  units: "$USD",
  data: [
    { country: "Luxembourg", value: 131782 },
    { country: "Switzerland", value: 94696 },
    { country: "Ireland", value: 94556 },
    { country: "Norway", value: 81995 },
    { country: "United States", value: 68309 },
    { country: "Denmark", value: 67218 },
    { country: "Iceland", value: 65273 },
    { country: "Singapore", value: 64103 },
    { country: "Australia", value: 62723 },
    { country: "Qatar", value: 59143 },
    { country: "Sweden", value: 58977 },
    { country: "Netherlands", value: 58003 },
    { country: "Finland", value: 54330 },
    { country: "Austria", value: 53859 },
    { country: "Germany", value: 51860 },
    { country: "Belgium", value: 50103 },
    { country: "San Marino", value: 49765 },
    { country: "Canada", value: 49222 },
    { country: "China", value: 11819 },
    { country: "Israel", value: 47602 },
    { country: "New Zealand", value: 47499 },
    { country: "United Kingdom", value: 46344 },
    { country: "France", value: 44995 },
  ],
};

export const pop = {
  units: "people",
  data: [
    { country: "Luxembourg", value: 615729 },
    { country: "Switzerland", value: 8591365 },
    { country: "Ireland", value: 4882495 },
    { country: "Norway", value: 5378857 },
    { country: "United States", value: 329064917 },
    { country: "Denmark", value: 5771876 },
    { country: "Iceland", value: 339031 },
    { country: "Singapore", value: 5804337 },
    { country: "Australia", value: 25203198 },
    { country: "Qatar", value: 2832067 },
    { country: "Sweden", value: 10036379 },
    { country: "Netherlands", value: 17097130 },
    { country: "Finland", value: 5532156 },
    { country: "Austria", value: 8955102 },
    { country: "Germany", value: 83517045 },
    { country: "Belgium", value: 11539328 },
    { country: "San Marino", value: 33860 },
    { country: "Canada", value: 37411047 },
    { country: "China", value: 1433783686 },
    { country: "Israel", value: 8519377 },
    { country: "New Zealand", value: 4783063 },
    { country: "United Kingdom", value: 67530172 },
    { country: "France", value: 65129728 },
  ],
};

export const co2 = {
  units: "tonnes/year",
  data: [
    { country: "Luxembourg", value: 9.54 },
    { country: "Switzerland", value: 39.738 },
    { country: "Ireland", value: 38.914 },
    { country: "Norway", value: 52.492 },
    { country: "United States", value: 5107.393 },
    { country: "Denmark", value: 33.573 },
    { country: "Iceland", value: 4.097 },
    { country: "Singapore", value: 55.018 },
    { country: "Australia", value: 402.253 },
    { country: "Qatar", value: 97.787 },
    { country: "Sweden", value: 50.874 },
    { country: "Netherlands", value: 174.77 },
    { country: "Finland", value: 46.846 },
    { country: "Austria", value: 72.249 },
    { country: "Germany", value: 796.529 },
    { country: "Belgium", value: 104.221 },
    { country: "Canada", value: 617.301 },
    { country: "China", value: 10877.218 },
    { country: "Israel", value: 66.916 },
    { country: "New Zealand", value: 36.795 },
    { country: "United Kingdom", value: 379.15 },
    { country: "France", value: 338.193 },
  ],
};

export const def = {
  units: "$USD (bn)",
  data: [
    { country: "United States", value: 778.0 },
    { country: "Australia", value: 27.5 },
    { country: "Germany", value: 52.8 },
    { country: "Canada", value: 22.8 },
    { country: "China", value: 252.0 },
    { country: "Israel", value: 21.7 },
    { country: "United Kingdom", value: 59.2 },
    { country: "France", value: 52.7 },
  ],
};

export const evs = {
  units: "Unit Sales",
  data: [
    { country: "United States", value: 297939 },
    { country: "Norway", value: 113588 },
    { country: "Germany", value: 394632 },
    { country: "Canada", value: 47000 },
    { country: "China", value: 1246000 },
    { country: "United Kingdom", value: 175082 },
    { country: "France", value: 194881 },
  ],
};

export function getStatTable(stat) {
  switch (stat) {
    case "gdp":
      return gdp;

    case "pop":
      return pop;

    case "co2":
      return co2;

    case "def":
      return def;

    case "evs":
      return evs;

    default:
      break;
  }
}
