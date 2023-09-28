
/**
 * Converts an object into a query string representation.
 *
 * @param {Object} obj - The object to be converted.
 * @return {string} - The query string representation of the object.
 */
export const objectToQueryParams = (obj: { [key: string]: any }): string => {
  const queryParams = [];

  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
      queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    }
  }

  return queryParams.join("&");
}