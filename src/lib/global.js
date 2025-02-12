export function processCountryName(countryName) {
  if (!countryName) return "";
  const lowerCaseName = countryName.toLowerCase();
  const words = lowerCaseName.split(" ");
  if (words.length === 1) {
    return words[0].slice(0, 2);
  } else {
    return words[0][0] + words[1][0];
  }
}
