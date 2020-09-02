const schemaName = "ans-feed";

const params = {
  contentAlias: "text",
  feedOffset: "number",
  feedSize: "number"
};

export const createContentSource = website => {
  const resolve = (key = {}) => {
    const site = key["arc-site"] || website;
    const { contentAlias, feedOffset, feedSize } = key;

    const path = "/content/v4/collections";

    const query = [
      `website=${site}`,
      `content_alias=${contentAlias}`,
      `size=${feedSize}`,
      `from=${feedOffset}`
    ].join("&");

    return `${path}?${query}`;
  };
  return {
    params,
    resolve,
    schemaName,
    ttl: 120
  };
};

export default createContentSource("Arc Site is not defined");
