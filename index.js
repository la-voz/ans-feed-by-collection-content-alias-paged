const schemaName = "ans-feed";

const params = {
  _id: "text",
  feedOffset: "number",
  feedSize: "number"
};

export const createContentSource = website => {
  const resolve = (key = {}) => {
    const site = key["arc-site"] || website;
    const { _id, feedOffset, feedSize } = key;

    const path = "/content/v4/collections";

    const query = [
      `website=${site}`,
      `_id=${_id}`,
      `size=${feedSize}`,
      `from=${feedOffset}`
    ].join("&");

    return `${path}?${query}`;
  };
  return {
    params,
    resolve,
    schemaName
  };
};

export default createContentSource("Arc Site is not defined");
